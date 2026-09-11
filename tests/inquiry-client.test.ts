import assert from "node:assert/strict";
import { test } from "node:test";

const { prepareInquiryEmail, hasInquiryReceipt, copyInquiryText }: typeof import("../lib/inquiry-client") =
  await import(new URL("../lib/inquiry-client.ts", import.meta.url).href);
const { createInquiryHandler }: typeof import("../lib/inquiries") =
  await import(new URL("../lib/inquiries.ts", import.meta.url).href);

const fields = {
  name: "Taylor Example",
  email: "taylor+catalog@example.com",
  company: "Notes & Co. #2",
  interest: "Custom systems",
  message: "Please review ‘Night & Day’.\nKeep the sources, amounts, and questions together.",
};

test("email and copy handoffs preserve the same complete inquiry, including special characters", () => {
  const prepared = prepareInquiryEmail("hi@recoupable.dev", fields);
  const draft = new URL(prepared.href);
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "hi@recoupable.dev");
  assert.equal(draft.searchParams.get("subject"), "Let’s build: Notes & Co. #2");
  assert.ok(draft.searchParams.get("body")?.endsWith(fields.message));
  assert.ok(prepared.text.endsWith(draft.searchParams.get("body")!));
  for (const value of Object.values(fields)) assert.ok(prepared.text.includes(value));
  assert.ok(prepared.text.startsWith("To: hi@recoupable.dev\nSubject:"));
});

test("only the saved-inquiry receipt is accepted; unrelated 2xx responses never mean delivery", async () => {
  assert.equal(await hasInquiryReceipt(Response.json({ ok: true })), true);
  for (const response of [
    Response.json({ ok: true }, { status: 202 }),
    Response.json({ ok: false }),
    Response.json({ ok: "true" }),
    Response.json({ ok: true, ignored: true }),
    Response.json({ ok: true, error: "Not saved" }),
    Response.json({ success: true }),
    Response.json(null),
    Response.json([{ ok: true }]),
    new Response(null, { status: 204 }),
    new Response("<html>Gateway page</html>", { headers: { "Content-Type": "text/html" } }),
    new Response('{"ok":', { headers: { "Content-Type": "application/json" } }),
    Response.json({ ok: true }, { status: 503 }),
  ]) assert.equal(await hasInquiryReceipt(response), false);
});

test("an actual offline handler receipt is recognized only after the CRM note is saved", async () => {
  const now = 1_800_000_000_000;
  const calls: string[] = [];
  const handler = createInquiryHandler({
    getApiUrl: () => "https://api.recoup.test/api",
    now: () => now,
    fetch: async (_url, init) => {
      calls.push(init?.method ?? "GET");
                  return Response.json({ status: "success" });
    },
  });
  const request = (website: string) => new Request("https://recoup.test/api/inquiries", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
    body: JSON.stringify({ ...fields, website, startedAt: now - 5000 }),
  });
  assert.equal(await hasInquiryReceipt(await handler(request(""))), true);
  assert.deepEqual(calls, ["POST"]);
  calls.length = 0;
  assert.equal(await hasInquiryReceipt(await handler(request("https://bot.test"))), false);
  assert.deepEqual(calls, []);
});

test("copy succeeds with the exact prepared text and falls back when permission is denied or unavailable", async () => {
  const { text } = prepareInquiryEmail("hi@recoupable.dev", fields);
  let copied = "";
  assert.equal(await copyInquiryText(text, async value => { copied = value; }), "copied");
  assert.equal(copied, text);
  assert.equal(await copyInquiryText(text, async () => { throw new DOMException("Denied", "NotAllowedError"); }), "manual");
  assert.equal(await copyInquiryText(text), "manual");
});
