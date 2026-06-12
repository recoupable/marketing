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

  it("paginates past the Spotify 50-per-page limit until a short page", async () => {
    const page = (start: number, count: number) => ({
      ok: true,
      json: async () => ({
        items: Array.from({ length: count }, (_, i) => ({
          id: `a${start + i}`,
          release_date: "2020-01-01",
          name: `Album ${start + i}`,
          images: [],
        })),
      }),
    });
    mockFetch
      .mockResolvedValueOnce(page(0, 50) as never)
      .mockResolvedValueOnce(page(50, 3) as never)
      .mockResolvedValueOnce({
        ok: true,
        status: 202,
        json: async () => ({ snapshot_id: "snap_2" }),
      } as never);

    const r = await startCatalogSnapshot("artist_big");

    expect(mockFetch.mock.calls[0][0]).toContain("offset=0");
    expect(mockFetch.mock.calls[1][0]).toContain("offset=50");
    expect(mockFetch.mock.calls[2][0]).toContain("/research/snapshots");
    expect(r.albumCount).toBe(53);
  });

  it("stops paginating at the 200-album cap", async () => {
    const fullPage = (start: number) => ({
      ok: true,
      json: async () => ({
        items: Array.from({ length: 50 }, (_, i) => ({
          id: `a${start + i}`,
          release_date: "2020-01-01",
          name: `Album ${start + i}`,
          images: [],
        })),
      }),
    });
    mockFetch
      .mockResolvedValueOnce(fullPage(0) as never)
      .mockResolvedValueOnce(fullPage(50) as never)
      .mockResolvedValueOnce(fullPage(100) as never)
      .mockResolvedValueOnce(fullPage(150) as never)
      .mockResolvedValueOnce({
        ok: true,
        status: 202,
        json: async () => ({ snapshot_id: "snap_3" }),
      } as never);

    const r = await startCatalogSnapshot("artist_huge");

    expect(r.albumCount).toBe(200);
    // 4 album pages + 1 snapshot POST — no fifth page fetch past the cap
    expect(mockFetch).toHaveBeenCalledTimes(5);
  });
});
