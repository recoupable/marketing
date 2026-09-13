import { test, expect } from "vitest";
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
  expect(parseAcquisitionTags("?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=september-guide&email=private%40example.com&gclid=private-id&redirect=https%3A%2F%2Fprivate.test")).toStrictEqual({
    utm_source: "chatgpt.com", utm_medium: "referral", utm_campaign: "september-guide",
  });
  expect(parseAcquisitionTags("?email=private%40example.com&gclid=private-id")).toBe(undefined);
  expect(parseAcquisitionTags("?utm_source=person%40example.com&utm_medium=https%3A%2F%2Fprivate.test&utm_campaign=line%0Abreak")).toBe(undefined);
  expect(sanitizeAcquisitionTags({ utm_source: "x".repeat(65), other: "private" })).toBe(undefined);
  expect(sanitizeAcquisitionTags(["chatgpt.com"])).toBe(undefined);
});

test("internal navigation preserves first/latest acquisition and later explicit campaigns update only latest", () => {
  const store = session();
  const first = captureReferralAttribution("?utm_source=chatgpt.com", store);
  expect(first).toStrictEqual({ first: { utm_source: "chatgpt.com" }, current: { utm_source: "chatgpt.com" } });
  expect(captureReferralAttribution("?workflow=AI%20strategy", store)).toStrictEqual(first);
  const next = captureReferralAttribution("?utm_source=partner&utm_medium=email&utm_campaign=catalog", store);
  expect(next.first).toStrictEqual(first.first);
  expect(next.current).toStrictEqual({ utm_source: "partner", utm_medium: "email", utm_campaign: "catalog" });
  expect(readReferralAttribution(store)).toStrictEqual(next);
  expect(store.values.size).toBe(1);
  const saved = [...store.values.values()][0];
  expect(saved).not.toMatch(/workflow|AI strategy|url|email_address|timestamp|referrer|click_id/);
});

test("invalid saved state, blocked storage, and server rendering cannot break forms", () => {
  const malformed = { getItem: () => "{malformed", setItem: () => {} };
  expect(readReferralAttribution(malformed)).toStrictEqual({});
  const unavailable = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  expect(readReferralAttribution(unavailable)).toStrictEqual({});
  expect(captureReferralAttribution("?utm_source=chatgpt.com", unavailable).current).toStrictEqual({ utm_source: "chatgpt.com" });
  expect(currentReferralAttribution()).toStrictEqual({});
  expect(effectiveAcquisitionTags({ first: { utm_source: "chatgpt.com" } })).toStrictEqual({ utm_source: "chatgpt.com" });
});

test("partial new acquisition tags do not mix with an older campaign", () => {
  const store = session();
  captureReferralAttribution("?utm_source=partner&utm_medium=email&utm_campaign=old-campaign", store);
  const state = captureReferralAttribution("?utm_source=chatgpt.com", store);
  expect(effectiveAcquisitionTags(state)).toStrictEqual({ utm_source: "chatgpt.com" });
  expect(state.first?.utm_campaign).toBe("old-campaign");
});

test("inquiry attribution preserves a maximum-length brief within the existing server limit", () => {
  const brief = "We need better catalog reporting. " + "x".repeat(4966);
  expect(brief.length).toBe(5000);
  const attribution = {
    first: { utm_source: "a".repeat(64), utm_medium: "b".repeat(64), utm_campaign: "c".repeat(64) },
    current: { utm_source: "d".repeat(64), utm_medium: "e".repeat(64), utm_campaign: "f".repeat(64) },
  };
  const message = inquiryMessageWithContext(brief, "Catalog operations", attribution);
  expect(message.includes(brief)).toBeTruthy();
  expect(message.length < 6000).toBeTruthy();
  expect(message).toMatch(/First visit source:/);
  expect(message).toMatch(/Latest visit source:/);
  const now = 1_800_000_000_000;
  expect(validateInquiry({ name: "Test Reader", email: "test@example.com", company: "Test Music", interest: "Catalog operations", message, website: "", startedAt: now - 5000 }, now).message).toBe(message);
  const single = inquiryMessageWithContext("A useful brief for the team.", "AI transformation", { first: { utm_source: "chatgpt.com" }, current: { utm_source: "chatgpt.com" } });
  expect(single).toMatch(/First visit source: utm_source=chatgpt.com/);
  expect(single).not.toMatch(/Latest visit source:/);
});

test("newsletter keeps the conversion page and sends explicit acquisition in existing UTM fields", async () => {
  const store = session();
  captureReferralAttribution("?utm_source=chatgpt.com", store);
  const attribution = captureReferralAttribution("", store);
  let calls = 0;
  const fetcher: typeof fetch = async (_url, init) => {
    calls++;
    expect(JSON.parse(String(init?.body))).toStrictEqual({
      kind: "subscribe", source: "/resources", email: "test@example.com", utm_source: "chatgpt.com",
    });
    return Response.json({ status: "success" });
  };
  expect(await subscribeToRecoup({ source: "/resources", email: "test@example.com", attribution }, fetcher)).toStrictEqual({ ok: true });
  expect(calls).toBe(1);
});

test("attribution cannot change the signup confirmation contract or cause extra requests", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => { calls++; return Response.json({ status: "success" }, { status: 202 }); };
  const result = await subscribeToRecoup({ source: "/blog", email: "test@example.com", attribution: { current: { utm_source: "chatgpt.com" } } }, fetcher);
  expect(result.ok).toBe(false);
  expect(calls).toBe(1);
});
