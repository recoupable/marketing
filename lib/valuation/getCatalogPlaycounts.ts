import { siteConfig } from "@/lib/config";

export type CatalogPlaycounts = {
  captured: number;
  total: number;
  totalStreams: number;
  trackCount: number;
};

/**
 * Server-only: read the latest captured play counts for a set of albums and
 * aggregate. A 404 means that album's capture hasn't landed yet (the caller
 * polls until captured === total or progress stalls). NOTE: each album read
 * charges 5 credits to the marketing org — the page caches and rate-limits
 * accordingly.
 *
 * @param albumIds - Spotify album ids from the started snapshot
 */
export async function getCatalogPlaycounts(albumIds: string[]): Promise<CatalogPlaycounts> {
  let captured = 0;
  let totalStreams = 0;
  let trackCount = 0;

  const results = await Promise.all(
    albumIds.map(async id => {
      const res = await fetch(
        `${siteConfig.apiUrl}/research/playcounts?spotify_album_id=${encodeURIComponent(id)}`,
        { headers: { "x-api-key": process.env.RECOUP_API_KEY ?? "" } },
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.playcounts as Array<{ platform_displayed_play_count: number }>;
    }),
  );

  for (const playcounts of results) {
    if (!playcounts) continue;
    captured += 1;
    trackCount += playcounts.length;
    for (const p of playcounts) totalStreams += p.platform_displayed_play_count ?? 0;
  }

  return { captured, total: albumIds.length, totalStreams, trackCount };
}
