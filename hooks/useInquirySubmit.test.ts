import { afterEach, expect, it, vi } from "vitest";
import type { FormEvent } from "react";
import { useInquirySubmit } from "./useInquirySubmit";
import { trackInquiryConversion } from "@/lib/analytics/trackInquiryConversion";
import { trackEvent } from "@/lib/analytics/trackEvent";

vi.mock("react", () => ({ useRef: (current: unknown) => ({ current }), useState: (value: unknown) => [value, vi.fn()] }));
vi.mock("@/lib/analytics/trackEvent", () => ({ trackEvent: vi.fn() }));
vi.mock("@/lib/analytics/trackInquiryConversion", () => ({ trackInquiryConversion: vi.fn() }));
vi.mock("@/lib/attribution/currentReferralAttribution", () => ({ currentReferralAttribution: () => ({}) }));
vi.mock("@/lib/attribution/inquiryMessageWithContext", () => ({ inquiryMessageWithContext: () => "test inquiry" }));

afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });

async function submit(response: Response | Error, connected = true) {
  vi.stubGlobal("FormData", class { entries() { return Object.entries({ name: "Test", email: "test@example.com", message: "test" }); } });
  vi.stubGlobal("fetch", vi.fn(async () => { if (response instanceof Error) throw response; return response; }));
  // Hooks are mocked above to exercise submission branches without a browser.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useInquirySubmit({ source: "/contact", connected, qualified: false, websitePath: "/contact" });
  await form.submit({ preventDefault: vi.fn(), currentTarget: {} } as unknown as FormEvent<HTMLFormElement>);
}

it("reports a lead only after the server confirms a saved inquiry", async () => {
  await submit(Response.json({ ok: true, submission_id: "a".repeat(64) }));
  expect(trackInquiryConversion).toHaveBeenCalledExactlyOnceWith("a".repeat(64));
});

it.each([
  Response.json({ ok: false }, { status: 400 }),
  Response.json({ ok: true }),
  new Response("Error", { status: 500 }),
  new Error("network failed"),
])("does not report rejected, invalid, or failed submissions", async (response) => {
  await submit(response);
  expect(trackInquiryConversion).not.toHaveBeenCalled();
});

it("does not report email fallback as a delivered inquiry", async () => {
  await submit(Response.json({ ok: true, submission_id: "a".repeat(64) }), false);
  expect(fetch).not.toHaveBeenCalled();
  expect(trackInquiryConversion).not.toHaveBeenCalled();
});

it.each([
  [400, { ok: false, code: "validation" }, "inquiry_rejected", "validation"],
  [400, { ok: false, code: "blocked" }, "inquiry_rejected", "blocked"],
  [403, { ok: false }, "inquiry_rejected", "blocked"],
  [503, { ok: false, code: "unavailable" }, "inquiry_failed", "unavailable"],
  [503, { ok: false, code: "timeout" }, "inquiry_failed", "timeout"],
  [200, { ok: true }, "inquiry_failed", "invalid_receipt"],
] as const)("classifies HTTP %s separately from confirmed delivery", async (status, body, event, reason) => {
  await submit(Response.json(body, { status }));
  expect(trackEvent).toHaveBeenCalledWith(event, { source: "/contact", reason, http_status: status });
  expect(trackEvent).not.toHaveBeenCalledWith("inquiry_submitted", expect.anything());
});

it("locks concurrent submissions before React rerenders, then permits an explicit retry", async () => {
  vi.stubGlobal("FormData", class { entries() { return Object.entries({ name: "Test", email: "test@example.com", message: "test" }); } });
  let finish!: (response: Response) => void;
  const transport = vi.fn().mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve; }))
    .mockResolvedValueOnce(Response.json({ ok: true, submission_id: "b".repeat(64) }));
  vi.stubGlobal("fetch", transport);
  const form = useInquirySubmit({ source: "/contact", connected: true, qualified: false, websitePath: "/contact" });
  const event = { preventDefault: vi.fn(), currentTarget: {} } as unknown as FormEvent<HTMLFormElement>;
  const first = form.submit(event);
  const second = form.submit(event);
  expect(transport).toHaveBeenCalledTimes(1);
  finish(Response.json({ ok: false }, { status: 503 }));
  await Promise.all([first, second]);
  await form.submit(event);
  expect(transport).toHaveBeenCalledTimes(2);
  expect(trackInquiryConversion).toHaveBeenCalledExactlyOnceWith("b".repeat(64));
});
