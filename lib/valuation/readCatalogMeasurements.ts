import { siteConfig } from "@/lib/config";

export type CatalogTrack = { name: string | null; streams: number };
export type CatalogAlbumPlaycounts = { id: string; streams: number; tracks: CatalogTrack[] };

export type CatalogMeasurements = {
  captured: number;
  total: number;
  totalStreams: number;
  trackCount: number;
  albums: CatalogAlbumPlaycounts[];
  /** True when a read short-circuited on insufficient credits — value what landed. */
  creditsExhausted: boolean;
};

type MeasurementRow = {
  isrc?: string | null;
  spotify_track_id?: string | null;
  name?: string | null;
  value: number;
};

/**
 * Read latest play counts for a set of albums directly from the consolidated,
 * bearer-authed recoup-api endpoint (`GET /research/albums/{id}/measurements`,
 * which consolidates `/research/playcounts`) and aggregate (Option B,
 * chat#1798). Runs under the signed-in account's credits (5/album).
 *
 * **Sequential on purpose:** a `402` (insufficient credits) stops the fan-out so
 * we don't keep spending, and we value what already landed — partial result on
 * credit exhaustion. A `404` means that album's capture hasn't landed yet.
 *
 * The same recording often appears on several releases; each ISRC is counted
 * once, claimed by its largest release, so lifetime streams aren't inflated.
 *
 * @param albumIds - Spotify album ids from the resolved catalog
 * @param token - Privy access token (the bearer)
 */
export async function readCatalogMeasurements(
  albumIds: string[],
  token?: string | null,
): Promise<CatalogMeasurements> {
  const auth: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  const readable: Array<{ id: string; rows: MeasurementRow[] }> = [];
  let creditsExhausted = false;

  for (const id of albumIds) {
    const res = await fetch(
      `${siteConfig.apiUrl}/research/albums/${encodeURIComponent(id)}/measurements`,
      { headers: auth },
    );
    if (res.status === 402) {
      creditsExhausted = true;
      break;
    }
    if (!res.ok) continue; // 404 = not captured yet; other errors = skip
    const data = await res.json().catch(() => null);
    if (data?.measurements) readable.push({ id, rows: data.measurements as MeasurementRow[] });
  }

  // larger releases claim shared recordings first, so canonical albums keep
  // their tracklists and one-off re-releases drop out
  const claimed = new Set<string>();
  const tracksByAlbum = new Map<string, CatalogTrack[]>();
  for (const album of [...readable].sort((a, b) => b.rows.length - a.rows.length)) {
    const tracks: CatalogTrack[] = [];
    for (const r of album.rows) {
      const key = r.isrc ?? r.spotify_track_id ?? `${album.id}:${r.name}`;
      if (claimed.has(key)) continue;
      claimed.add(key);
      tracks.push({ name: r.name ?? null, streams: r.value ?? 0 });
    }
    tracksByAlbum.set(album.id, tracks);
  }

  let totalStreams = 0;
  let trackCount = 0;
  const albums: CatalogAlbumPlaycounts[] = readable.map(a => {
    const tracks = tracksByAlbum.get(a.id) ?? [];
    const streams = tracks.reduce((sum, t) => sum + t.streams, 0);
    totalStreams += streams;
    trackCount += tracks.length;
    return { id: a.id, streams, tracks };
  });

  return {
    captured: readable.length,
    total: albumIds.length,
    totalStreams,
    trackCount,
    albums,
    creditsExhausted,
  };
}
