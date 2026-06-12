import { describe, it, expect, vi, beforeEach } from "vitest";
import { startCatalogSnapshot } from "../startCatalogSnapshot";

const mockFetch = vi.fn();
global.fetch = mockFetch as never;

describe("startCatalogSnapshot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RECOUP_API_KEY = "k";
  });

  it("resolves albums, fires the snapshot, returns ids + earliest release + album metadata", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: "a1",
              release_date: "2016-06-12",
              name: "Old",
              images: [{ url: "old-640.jpg" }, { url: "old-300.jpg" }],
            },
            { id: "a2", release_date: "2021-01-01", name: "New", images: [] },
          ],
        }),
      } as never)
      .mockResolvedValueOnce({
        ok: true,
        status: 202,
        json: async () => ({ snapshot_id: "snap_1", album_count: 2, estimated_cost_usd: 0.006 }),
      } as never);

    const r = await startCatalogSnapshot("artist_1");

    expect(mockFetch.mock.calls[0][0]).toContain("/spotify/artist/albums?");
    expect(mockFetch.mock.calls[1][0]).toContain("/research/snapshots");
    expect(mockFetch.mock.calls[1][1].headers["x-api-key"]).toBe("k");
    expect(r).toEqual({
      snapshotId: "snap_1",
      albumIds: ["a1", "a2"],
      earliestReleaseDate: "2016-06-12",
      albumCount: 2,
      albums: [
        { id: "a1", name: "Old", image: "old-300.jpg", releaseDate: "2016-06-12" },
        { id: "a2", name: "New", image: null, releaseDate: "2021-01-01" },
      ],
    });
  });

  it("throws a labeled error when the artist has no albums", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) } as never);

    await expect(startCatalogSnapshot("artist_x")).rejects.toThrow("no albums");
  });
});
