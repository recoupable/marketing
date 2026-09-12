import { test, expect } from "vitest";

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
  expect(draft.protocol).toBe("mailto:");
  expect(draft.pathname).toBe("hi@recoupable.dev");
  expect(draft.searchParams.get("subject")).toBe("Let’s build: Notes & Co. #2");
  expect(draft.searchParams.get("body")?.endsWith(fields.message)).toBeTruthy();
  expect(prepared.text.endsWith(draft.searchParams.get("body")!)).toBeTruthy();
  for (const value of Object.values(fields)) expect(prepared.text.includes(value)).toBeTruthy();
  expect(prepared.text.startsWith("To: hi@recoupable.dev\nSubject:")).toBeTruthy();
});

test("only the saved-inquiry receipt is accepted; unrelated 2xx responses never mean delivery", async () => {
  expect(await hasInquiryReceipt(Response.json({ ok: true }))).toBe(true);
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
  ]) expect(await hasInquiryReceipt(response)).toBe(false);
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
  expect(await hasInquiryReceipt(await handler(request("")))).toBe(true);
  expect(calls).toStrictEqual(["POST"]);
  calls.length = 0;
  expect(await hasInquiryReceipt(await handler(request("https://bot.test")))).toBe(false);
  expect(calls).toStrictEqual([]);
});

test("copy succeeds with the exact prepared text and falls back when permission is denied or unavailable", async () => {
  const { text } = prepareInquiryEmail("hi@recoupable.dev", fields);
  let copied = "";
  expect(await copyInquiryText(text, async value => { copied = value; })).toBe("copied");
  expect(copied).toBe(text);
  expect(await copyInquiryText(text, async () => { throw new DOMException("Denied", "NotAllowedError"); })).toBe("manual");
  expect(await copyInquiryText(text)).toBe("manual");
});
