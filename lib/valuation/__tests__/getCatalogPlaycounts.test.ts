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
              { isrc: "I1", name: "Track One", platform_displayed_play_count: 100 },
              { isrc: "I2", name: "Track Two", platform_displayed_play_count: 50 },
            ],
          }),
        };
      return { ok: false, status: 404, json: async () => ({}) };
    });

    const r = await getCatalogPlaycounts(["a1", "a2"]);

    expect(r).toEqual({
      captured: 1,
      total: 2,
      totalStreams: 150,
      trackCount: 2,
      albums: [
        {
          id: "a1",
          streams: 150,
          tracks: [
            { name: "Track One", streams: 100 },
            { name: "Track Two", streams: 50 },
          ],
        },
      ],
    });
  });

  it("dedupes tracks that appear on multiple releases by ISRC — larger release claims the track", async () => {
    mockFetch.mockImplementation(async (url: string) => {
      // "single1" re-releases Track One, which is already on album a1
      if (url.includes("single1"))
        return {
          ok: true,
          json: async () => ({
            playcounts: [{ isrc: "I1", name: "Track One", platform_displayed_play_count: 100 }],
          }),
        };
      return {
        ok: true,
        json: async () => ({
          playcounts: [
            { isrc: "I1", name: "Track One", platform_displayed_play_count: 100 },
            { isrc: "I2", name: "Track Two", platform_displayed_play_count: 50 },
          ],
        }),
      };
    });

    const r = await getCatalogPlaycounts(["single1", "a1"]);

    // Track One counted once; the empty single drops out of the breakdown but
    // still counts as captured
    expect(r.totalStreams).toBe(150);
    expect(r.trackCount).toBe(2);
    expect(r.captured).toBe(2);
    expect(r.albums).toEqual([
      {
        id: "a1",
        streams: 150,
        tracks: [
          { name: "Track One", streams: 100 },
          { name: "Track Two", streams: 50 },
        ],
      },
    ]);
  });
});
