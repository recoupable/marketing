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

type PlaycountRow = {
  isrc?: string | null;
  spotify_track_id?: string | null;
  name?: string | null;
  platform_displayed_play_count: number;
};

/**
 * Server-only: read the latest captured play counts for a set of albums and
 * aggregate, keeping the per-album track detail for the results breakdown.
 * The same recording often appears on several releases (album + single +
 * reissue); each ISRC is counted once, claimed by its largest release, so
 * lifetime streams aren't inflated by the overlap. Releases whose tracks are
 * all claimed elsewhere still count as captured but drop out of the
 * breakdown. A 404 means that album's capture hasn't landed yet (the caller
 * polls until captured === total or progress stalls). NOTE: each album read
 * charges 5 credits to the marketing org — the page caches and rate-limits
 * accordingly.
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
      return { id, playcounts: data.playcounts as PlaycountRow[] };
    }),
  );
  const readable = results.filter(r => r !== null);

  // larger releases claim shared recordings first, so canonical albums keep
  // their tracklists and one-off re-releases drop out
  const claimed = new Set<string>();
  const tracksByAlbum = new Map<string, CatalogTrack[]>();
  for (const album of [...readable].sort((a, b) => b.playcounts.length - a.playcounts.length)) {
    const tracks: CatalogTrack[] = [];
    for (const p of album.playcounts) {
      const key = p.isrc ?? p.spotify_track_id ?? `${album.id}:${p.name}`;
      if (claimed.has(key)) continue;
      claimed.add(key);
      tracks.push({ name: p.name ?? null, streams: p.platform_displayed_play_count ?? 0 });
    }
    tracksByAlbum.set(album.id, tracks);
  }

  let totalStreams = 0;
  let trackCount = 0;
  const albums: CatalogAlbumPlaycounts[] = [];
  for (const { id } of readable) {
    const tracks = tracksByAlbum.get(id) ?? [];
    if (tracks.length === 0) continue;
    const streams = tracks.reduce((sum, t) => sum + t.streams, 0);
    albums.push({ id, streams, tracks });
    trackCount += tracks.length;
    totalStreams += streams;
  }

  return { captured: readable.length, total: albumIds.length, totalStreams, trackCount, albums };
}
