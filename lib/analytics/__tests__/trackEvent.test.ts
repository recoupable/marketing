import { describe, it, expect, vi, beforeEach } from "vitest";
import { track } from "@vercel/analytics";
import { trackEvent } from "../trackEvent";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const mockedTrack = vi.mocked(track);

beforeEach(() => {
  mockedTrack.mockReset();
});

describe("trackEvent", () => {
  it("forwards the event name and props to @vercel/analytics track", () => {
    trackEvent("pricing_cta_clicked", { plan: "pro" });
    expect(mockedTrack).toHaveBeenCalledExactlyOnceWith("pricing_cta_clicked", {
      plan: "pro",
    });
  });

  it("forwards a bare event name without props", () => {
    trackEvent("valuation_run");
    expect(mockedTrack).toHaveBeenCalledExactlyOnceWith(
      "valuation_run",
      undefined,
    );
  });

  it("swallows errors thrown by track", () => {
    mockedTrack.mockImplementation(() => {
      throw new Error("analytics blocked");
    });
    expect(() => trackEvent("valuation_run")).not.toThrow();
  });
});
