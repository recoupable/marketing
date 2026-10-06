import { runInNewContext } from "node:vm";
import { afterEach, describe, expect, it, vi } from "vitest";
import { openAiPixelScript } from "../openAiPixelScript";
import { trackInquiryConversion } from "../trackInquiryConversion";

afterEach(() => vi.unstubAllGlobals());

function boot(hostname = "recoupable.dev", navigator = {}) {
  const insertBefore = vi.fn();
  const window = { location: { hostname }, navigator } as { location: { hostname: string }; navigator: object; oaiq?: { q: Array<IArguments> } };
  const document = {
    createElement: () => ({}),
    getElementsByTagName: () => [{ parentNode: { insertBefore } }],
  };
  const context = { window, document };
  runInNewContext(openAiPixelScript, context);
  return { window, insertBefore, context };
}

describe("OpenAI pixel", () => {
  it("initializes once and queues confirmed conversions before the SDK loads", () => {
    const { window, insertBefore, context } = boot();
    runInNewContext(openAiPixelScript, context);
    vi.stubGlobal("window", window);
    trackInquiryConversion("a".repeat(64));
    expect(insertBefore).toHaveBeenCalledTimes(1);
    expect(insertBefore.mock.calls[0][0]).toEqual({ async: true, src: "https://bzrcdn.openai.com/sdk/oaiq.min.js" });
    expect(Array.from(window.oaiq!.q[0])).toEqual(["init", { pixelId: "TqnT6JtP1DyuB7C7H96pYP" }]);
    expect(Array.from(window.oaiq!.q[1])).toEqual([
      "measure", "lead_created", { type: "customer_action" },
      { event_id: `inquiry_${"a".repeat(64)}`, opt_out: true },
    ]);
  });

  it.each(["localhost", "marketing-preview.vercel.app", "recoupable.dev.example.com"])("does not load on %s", (hostname) => {
    expect(boot(hostname).insertBefore).not.toHaveBeenCalled();
  });

  it.each([{ globalPrivacyControl: true }, { doNotTrack: "1" }])("honors browser privacy preference %j", (navigator) => {
    expect(boot("recoupable.dev", navigator).insertBefore).not.toHaveBeenCalled();
  });

  it("reuses the event ID for retries and omits inquiry details", () => {
    const oaiq = vi.fn();
    vi.stubGlobal("window", { oaiq });
    trackInquiryConversion("b".repeat(64));
    trackInquiryConversion("b".repeat(64));
    expect(oaiq.mock.calls[0]).toEqual(oaiq.mock.calls[1]);
    expect(oaiq.mock.calls[0][2]).toEqual({ type: "customer_action" });
  });

  it("ignores invalid receipts and survives missing or blocked SDKs", () => {
    const oaiq = vi.fn(() => { throw new Error("blocked"); });
    vi.stubGlobal("window", { oaiq });
    trackInquiryConversion("someone@example.com");
    expect(oaiq).not.toHaveBeenCalled();
    expect(() => trackInquiryConversion("c".repeat(64))).not.toThrow();
    vi.stubGlobal("window", {});
    expect(() => trackInquiryConversion("c".repeat(64))).not.toThrow();
    vi.unstubAllGlobals();
    expect(() => trackInquiryConversion("c".repeat(64))).not.toThrow();
  });
});
