import { siteConfig } from "@/lib/config";

export type CatalogTrack = { name: string | null; streams: number };

export type CatalogAlbumPlaycounts = {
  id: string;
  streams: number;
  tracks: CatalogTrack[];
};

export type CatalogPlaycounts = {
  captured: number;
  total: number;
  totalStreams: number;
  trackCount: number;
  albums: CatalogAlbumPlaycounts[];
};

/**
 * Server-only: read the latest captured play counts for a set of albums and
 * aggregate, keeping the per-album track detail for the results breakdown. A
 * 404 means that album's capture hasn't landed yet (the caller polls until
 * captured === total or progress stalls). NOTE: each album read charges 5
 * credits to the marketing org — the page caches and rate-limits accordingly.
 *
 * @param albumIds - Spotify album ids from the started snapshot
 */
export async function getCatalogPlaycounts(albumIds: string[]): Promise<CatalogPlaycounts> {
  const results = await Promise.all(
    albumIds.map(async id => {
      const res = await fetch(
        `${siteConfig.apiUrl}/research/playcounts?spotify_album_id=${encodeURIComponent(id)}`,
        { headers: { "x-api-key": process.env.RECOUP_API_KEY ?? "" } },
      );
      if (!res.ok) return null;
      const data = await res.json();
      const playcounts = data.playcounts as Array<{
        name?: string | null;
        platform_displayed_play_count: number;
      }>;
      return { id, playcounts };
    }),
  );

  let totalStreams = 0;
  let trackCount = 0;
  const albums: CatalogAlbumPlaycounts[] = [];

  for (const result of results) {
    if (!result) continue;
    const tracks = result.playcounts.map(p => ({
      name: p.name ?? null,
      streams: p.platform_displayed_play_count ?? 0,
    }));
    const streams = tracks.reduce((sum, t) => sum + t.streams, 0);
    albums.push({ id: result.id, streams, tracks });
    trackCount += tracks.length;
    totalStreams += streams;
  }

  return { captured: albums.length, total: albumIds.length, totalStreams, trackCount, albums };
}
