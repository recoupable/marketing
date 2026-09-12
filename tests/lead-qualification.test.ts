import assert from "node:assert/strict";
import { test } from "node:test";
import { companyTypes, projectBudgets, projectTimelines, validateLeadQualification, leadQualificationEntries } from "../lib/lead-qualification.ts";
import { createInquiryHandler, validateInquiry } from "../lib/inquiries.ts";
import { prepareInquiryEmail, hasInquiryReceipt } from "../lib/inquiry-client.ts";

const now = 1_800_000_000_000;
const minimal = { companyType: "Music fund", budget: "$25,000–$50,000", timeline: "Within 1–3 months" };
const full = {
  ...minimal,
  role: " Head of catalog operations ",
  companyWebsite: "Music.Example.com/team",
  phone: " +1 (212) 555-0100 ext. 4 ",
  tools: "DISCO, Airtable & Drive\nQuarterly royalty files",
};
const inquiry = {
  name: "Taylor Example", email: "taylor@example.com", company: "Example Music",
  interest: "Custom systems", message: "We want to connect our catalog and reporting workflows.",
  website: "", startedAt: now - 5000,
};
const request = (qualification?: unknown) => new Request("https://recoup.test/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
  body: JSON.stringify({ ...inquiry, ...(qualification === undefined ? {} : { qualification }) }),
});

function offlineHandler() {
  const calls: { method: string; url: string; body?: Record<string, unknown> }[] = [];
  const handle = createInquiryHandler({
    getApiUrl: () => "https://api.recoup.test/api", now: () => now,
    fetch: async (input, init) => {
      calls.push({ method: init?.method ?? "GET", url: String(input), body: init?.body ? JSON.parse(String(init.body)) : undefined });
                  return Response.json({ status: "success" });
    },
  });
  return { handle, calls };
}

test("normalizes optional details, preserves multiline tools, and accepts every defined option", () => {
  assert.deepEqual(validateLeadQualification(minimal), { ...minimal, role: "", companyWebsite: "", phone: "", tools: "" });
  const result = validateLeadQualification(full);
  assert.equal(result.role, "Head of catalog operations");
  assert.equal(result.companyWebsite, "https://music.example.com/team");
  assert.equal(result.phone, "+1 (212) 555-0100 ext. 4");
  assert.equal(result.tools, full.tools);
  for (const companyType of companyTypes) assert.equal(validateLeadQualification({ ...minimal, companyType }).companyType, companyType);
  for (const budget of projectBudgets) assert.equal(validateLeadQualification({ ...minimal, budget }).budget, budget);
  for (const timeline of projectTimelines) assert.equal(validateLeadQualification({ ...minimal, timeline }).timeline, timeline);
  assert.equal(validateLeadQualification({ ...minimal, budget: `  ${minimal.budget} ` }).budget, minimal.budget);
});

test("rejects missing or invented required selections, non-objects, unexpected fields and malformed optional values", () => {
  for (const value of [null, undefined, [], "Music fund", {}, { ...minimal, companyType: "Bank" }, { ...minimal, budget: "Whatever" }, { ...minimal, timeline: "Tomorrow" }, { ...minimal, companyType: "" }, { ...minimal, internalNotes: "hidden" }]) assert.throws(() => validateLeadQualification(value));
  for (const [field, limit] of [["role", 120], ["companyWebsite", 2048], ["phone", 40], ["tools", 1200]] as const) {
    for (const value of [null, 123, [], "x".repeat(limit + 1), "a\u0000b"])
      assert.throws(() => validateLeadQualification({ ...minimal, [field]: value }), `${field} ${typeof value}`);
  }
  assert.throws(() => validateLeadQualification({ ...minimal, role: "Director\nFake field: text" }));
  assert.throws(() => validateLeadQualification({ ...minimal, phone: "+1\r\nFake field: text" }));
});

test("normalizes company domains without fetching and rejects malicious schemes, credentials and malformed hosts", () => {
  for (const [input, expected] of [
    ["example.com", "https://example.com/"],
    ["www.example.com/catalog", "https://www.example.com/catalog"],
    ["https://MUSIC.EXAMPLE.com/Team", "https://music.example.com/Team"],
    ["http://example.com/", "http://example.com/"],
    ["bücher.example", "https://xn--bcher-kva.example/"],
    ["   ", ""],
  ]) assert.equal(validateLeadQualification({ ...minimal, companyWebsite: input }).companyWebsite, expected);
  for (const companyWebsite of [
    "javascript:alert(1)", "data:text/html,test", "ftp://example.com", "file:///etc/passwd", "mailto:user@example.com",
    "https://user:secret@example.com", "https://-invalid.example.com", "https://example..com", "https://localhost",
    "not a domain", "https://example.com\n.evil.test", "https://example.com\\@evil.test", "https://example.com:99999", "https://[::1]",
  ]) assert.throws(() => validateLeadQualification({ ...minimal, companyWebsite }), companyWebsite);
});

test("CRM note and copied/email inquiry contain the same normalized qualification entries", async () => {
  const qualification = validateLeadQualification(full);
  const { handle, calls } = offlineHandler();
  assert.equal(await hasInquiryReceipt(await handle(request(full))), true);
  const note = calls.find(call => call.method === "POST")!.body as { message: string };
  const plain = note.message.replace(/\\([\\`*_{}[\]<>()#+.!|~=-])/g, "$1");
  const prepared = prepareInquiryEmail("hi@recoupable.dev", { ...inquiry, qualification });
  const email = new URL(prepared.href).searchParams.get("body")!;
  const entries = leadQualificationEntries(qualification);
  assert.deepEqual(entries.slice(0, 3).map(([label]) => label), ["Initial budget (USD)", "Timeline", "Company type"]);
  for (const [label, value] of entries) {
    assert.ok(plain.includes(`${label}: ${value}`), label);
    assert.ok(prepared.text.includes(`${label}: ${value}`), label);
    assert.ok(email.includes(`${label}: ${value}`), label);
  }
  assert.ok(prepared.text.endsWith(inquiry.message));
  assert.equal(calls[0].body?.email, inquiry.email);
  assert.ok(calls.every(call => call.url.startsWith("https://api.recoup.test/api/")));
});

test("invalid supplied qualification returns 400 without calling the CRM, while legacy requests still work", async () => {
  const { handle, calls } = offlineHandler();
  for (const qualification of [null, "invalid", [], {}, { ...full, budget: "invalid" }, { ...full, role: "x".repeat(121) }, { ...full, companyWebsite: "javascript:alert(1)" }]) {
    const response = await handle(request(qualification));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
  }
  assert.equal(calls.length, 0);
  assert.ok(!Object.hasOwn(validateInquiry(inquiry, now), "qualification"));
  assert.equal(await hasInquiryReceipt(await handle(request())), true);
});

test("qualification is preserved in the API message and participates in the inquiry fingerprint", async () => {
  const { handle, calls } = offlineHandler();
  const qualification = { ...full, role: "[Owner](https://example.com)", tools: "# Scope\n@[name](person:fake)" };
  await handle(request(qualification));
  await handle(request({ ...qualification, budget: "$100,000+" }));
  const notes = calls.filter(call => call.method === "POST").map(call => (call.body as { message: string }).message);
  assert.equal(notes.length, 2);
  assert.ok(notes[0].includes(qualification.role));
  assert.ok(notes[0].includes(qualification.tools));
  const markers = notes.map(note => note.match(/Submission ID: ([a-f\d]{64})/)?.[1]);
  assert.ok(markers[0]);
  assert.notEqual(markers[0], markers[1]);
});
