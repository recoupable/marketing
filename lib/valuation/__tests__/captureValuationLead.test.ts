import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { captureValuationLead } from "@/lib/valuation/captureValuationLead";

const lead = {
  email: "artist@example.com",
  artistName: "Mac Miller",
  artistId: "abc123",
  valueBand: { low: 1_000_000, central: 2_000_000, high: 3_000_000 },
};

describe("captureValuationLead", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("POSTs the lead to the marketing capture route as JSON", () => {
    captureValuationLead(lead);

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/valuation/lead");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toEqual(lead);
  });

  it("swallows network errors so a failed ping never breaks the run", () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network down"));
    expect(() => captureValuationLead(lead)).not.toThrow();
  });
});
