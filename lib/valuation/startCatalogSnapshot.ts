import { siteConfig } from "@/lib/config";

const MAX_ALBUMS = 50;

export type StartedAlbum = {
  id: string;
  name: string | null;
  image: string | null;
  releaseDate: string | null;
};

export type StartedSnapshot = {
  snapshotId: string;
  albumIds: string[];
  earliestReleaseDate: string | null;
  albumCount: number;
  albums: StartedAlbum[];
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
  const items: Array<{
    id: string;
    name?: string;
    release_date?: string;
    images?: Array<{ url: string }>;
  }> = albumsData.items ?? albumsData.albums?.items ?? [];
  if (items.length === 0) throw new Error("artist has no albums on Spotify");

  const albumById = new Map(
    items.map(a => [
      a.id,
      {
        id: a.id,
        name: a.name ?? null,
        // images are largest-first; the mid size is plenty for a list thumbnail
        image: a.images?.[1]?.url ?? a.images?.[0]?.url ?? null,
        releaseDate: a.release_date ?? null,
      },
    ]),
  );
  const albums = [...albumById.values()];
  const albumIds = albums.map(a => a.id);
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
    albums,
  };
}
