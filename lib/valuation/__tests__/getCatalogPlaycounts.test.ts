import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCatalogPlaycounts } from "../getCatalogPlaycounts";

const mockFetch = vi.fn();
global.fetch = mockFetch as never;

describe("getCatalogPlaycounts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RECOUP_API_KEY = "k";
  });

  it("aggregates streams + track count across albums; 404s count as uncaptured", async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url.includes("a1"))
        return {
          ok: true,
          json: async () => ({
            playcounts: [
              { platform_displayed_play_count: 100 },
              { platform_displayed_play_count: 50 },
            ],
          }),
        };
      return { ok: false, status: 404, json: async () => ({}) };
    });

    const r = await getCatalogPlaycounts(["a1", "a2"]);

    expect(r).toEqual({ captured: 1, total: 2, totalStreams: 150, trackCount: 2 });
  });
});
