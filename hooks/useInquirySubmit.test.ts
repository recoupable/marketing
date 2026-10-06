import { afterEach, expect, it, vi } from "vitest";
import type { FormEvent } from "react";
import { useInquirySubmit } from "./useInquirySubmit";
import { trackInquiryConversion } from "@/lib/analytics/trackInquiryConversion";

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
