import assert from "node:assert/strict";
import test from "node:test";
import {
  captureReferralAttribution, currentReferralAttribution, effectiveAcquisitionTags,
  inquiryMessageWithContext, parseAcquisitionTags, readReferralAttribution,
  sanitizeAcquisitionTags,
} from "../lib/referral-attribution.ts";
import { subscribeToRecoup } from "../lib/marketing-subscribe.ts";
const { validateInquiry }: typeof import("../lib/inquiries") = await import(new URL("../lib/inquiries.ts", import.meta.url).href);

function session() {
  const values = new Map<string, string>();
  return { values, getItem: (key: string) => values.get(key) || null, setItem: (key: string, value: string) => { values.set(key, value); } };
}

test("only explicit short acquisition labels are retained, including ChatGPT referrals", () => {
  assert.deepEqual(parseAcquisitionTags("?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=september-guide&email=private%40example.com&gclid=private-id&redirect=https%3A%2F%2Fprivate.test"), {
    utm_source: "chatgpt.com", utm_medium: "referral", utm_campaign: "september-guide",
  });
  assert.equal(parseAcquisitionTags("?email=private%40example.com&gclid=private-id"), undefined);
  assert.equal(parseAcquisitionTags("?utm_source=person%40example.com&utm_medium=https%3A%2F%2Fprivate.test&utm_campaign=line%0Abreak"), undefined);
  assert.equal(sanitizeAcquisitionTags({ utm_source: "x".repeat(65), other: "private" }), undefined);
  assert.equal(sanitizeAcquisitionTags(["chatgpt.com"]), undefined);
});

test("internal navigation preserves first/latest acquisition and later explicit campaigns update only latest", () => {
  const store = session();
  const first = captureReferralAttribution("?utm_source=chatgpt.com", store);
  assert.deepEqual(first, { first: { utm_source: "chatgpt.com" }, current: { utm_source: "chatgpt.com" } });
  assert.deepEqual(captureReferralAttribution("?workflow=AI%20strategy", store), first);
  const next = captureReferralAttribution("?utm_source=partner&utm_medium=email&utm_campaign=catalog", store);
  assert.deepEqual(next.first, first.first);
  assert.deepEqual(next.current, { utm_source: "partner", utm_medium: "email", utm_campaign: "catalog" });
  assert.deepEqual(readReferralAttribution(store), next);
  assert.equal(store.values.size, 1);
  const saved = [...store.values.values()][0];
  assert.doesNotMatch(saved, /workflow|AI strategy|url|email_address|timestamp|referrer|click_id/);
});

test("invalid saved state, blocked storage, and server rendering cannot break forms", () => {
  const malformed = { getItem: () => "{malformed", setItem: () => {} };
  assert.deepEqual(readReferralAttribution(malformed), {});
  const unavailable = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.deepEqual(readReferralAttribution(unavailable), {});
  assert.deepEqual(captureReferralAttribution("?utm_source=chatgpt.com", unavailable).current, { utm_source: "chatgpt.com" });
  assert.deepEqual(currentReferralAttribution(), {});
  assert.deepEqual(effectiveAcquisitionTags({ first: { utm_source: "chatgpt.com" } }), { utm_source: "chatgpt.com" });
});

test("partial new acquisition tags do not mix with an older campaign", () => {
  const store = session();
  captureReferralAttribution("?utm_source=partner&utm_medium=email&utm_campaign=old-campaign", store);
  const state = captureReferralAttribution("?utm_source=chatgpt.com", store);
  assert.deepEqual(effectiveAcquisitionTags(state), { utm_source: "chatgpt.com" });
  assert.equal(state.first?.utm_campaign, "old-campaign");
});

test("inquiry attribution preserves a maximum-length brief within the existing server limit", () => {
  const brief = "We need better catalog reporting. " + "x".repeat(4966);
  assert.equal(brief.length, 5000);
  const attribution = {
    first: { utm_source: "a".repeat(64), utm_medium: "b".repeat(64), utm_campaign: "c".repeat(64) },
    current: { utm_source: "d".repeat(64), utm_medium: "e".repeat(64), utm_campaign: "f".repeat(64) },
  };
  const message = inquiryMessageWithContext(brief, "Catalog operations", attribution);
  assert.ok(message.includes(brief));
  assert.ok(message.length < 6000);
  assert.match(message, /First visit source:/);
  assert.match(message, /Latest visit source:/);
  const now = 1_800_000_000_000;
  assert.equal(validateInquiry({ name: "Test Reader", email: "test@example.com", company: "Test Music", interest: "Catalog operations", message, website: "", startedAt: now - 5000 }, now).message, message);
  const single = inquiryMessageWithContext("A useful brief for the team.", "AI transformation", { first: { utm_source: "chatgpt.com" }, current: { utm_source: "chatgpt.com" } });
  assert.match(single, /First visit source: utm_source=chatgpt.com/);
  assert.doesNotMatch(single, /Latest visit source:/);
});

test("newsletter keeps the conversion page and sends explicit acquisition in existing UTM fields", async () => {
  const store = session();
  captureReferralAttribution("?utm_source=chatgpt.com", store);
  const attribution = captureReferralAttribution("", store);
  let calls = 0;
  const fetcher: typeof fetch = async (_url, init) => {
    calls++;
    assert.deepEqual(JSON.parse(String(init?.body)), {
      kind: "subscribe", source: "/resources", email: "test@example.com", utm_source: "chatgpt.com",
    });
    return Response.json({ status: "success" });
  };
  assert.deepEqual(await subscribeToRecoup({ source: "/resources", email: "test@example.com", attribution }, fetcher), { ok: true });
  assert.equal(calls, 1);
});

test("attribution cannot change the signup confirmation contract or cause extra requests", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => { calls++; return Response.json({ status: "success" }, { status: 202 }); };
  const result = await subscribeToRecoup({ source: "/blog", email: "test@example.com", attribution: { current: { utm_source: "chatgpt.com" } } }, fetcher);
  assert.equal(result.ok, false);
  assert.equal(calls, 1);
});
