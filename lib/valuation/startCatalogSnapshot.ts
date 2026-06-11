import { siteConfig } from "@/lib/config";

const MAX_ALBUMS = 50;

export type StartedSnapshot = {
  snapshotId: string;
  albumIds: string[];
  earliestReleaseDate: string | null;
  albumCount: number;
};

/**
 * Server-only: resolve an artist's releases (albums + singles, capped at 50)
 * via the auth-free Spotify proxy on the Recoup api, then fire a play-count
 * snapshot for all of them. The snapshot self-maps every track (chat#1794),
 * which is what makes a one-click flow possible. RECOUP_API_KEY never leaves
 * the server.
 *
 * @param artistId - Spotify artist id
 * @returns snapshot id + album ids + earliest release date (for catalog age)
 */
export async function startCatalogSnapshot(artistId: string): Promise<StartedSnapshot> {
  const params = new URLSearchParams({
    id: artistId,
    include_groups: "album,single",
    limit: String(MAX_ALBUMS),
  });
  const albumsRes = await fetch(`${siteConfig.apiUrl}/spotify/artist/albums?${params}`);
  if (!albumsRes.ok) throw new Error(`albums lookup failed: ${albumsRes.status}`);
  const albumsData = await albumsRes.json();
  const items: Array<{ id: string; release_date?: string }> =
    albumsData.items ?? albumsData.albums?.items ?? [];
  if (items.length === 0) throw new Error("artist has no albums on Spotify");

  const albumIds = [...new Set(items.map(a => a.id))];
  const releaseDates = items.map(a => a.release_date).filter(Boolean) as string[];
  const earliestReleaseDate = releaseDates.length ? releaseDates.sort()[0] : null;

  const snapRes = await fetch(`${siteConfig.apiUrl}/research/snapshots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.RECOUP_API_KEY ?? "",
    },
    body: JSON.stringify({ album_ids: albumIds }),
  });
  if (!snapRes.ok) throw new Error(`snapshot create failed: ${snapRes.status}`);
  const snap = await snapRes.json();

  return {
    snapshotId: snap.snapshot_id,
    albumIds,
    earliestReleaseDate,
    albumCount: albumIds.length,
  };
}
