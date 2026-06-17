import { siteConfig } from "@/lib/config";
import type { StartedAlbum } from "@/components/valuation/types";

// Spotify caps the artist-albums endpoint at 50 per page; paginate up to 200
// releases — full coverage for virtually every artist, bounded against
// compilation-heavy catalogs (each album costs actor spend + 5 credits/read).
const PAGE_SIZE = 50;
const MAX_ALBUMS = 200;

type SpotifyAlbumItem = {
  id: string;
  name?: string;
  release_date?: string;
  images?: Array<{ url: string }>;
};

export type ResolvedCatalog = {
  albums: StartedAlbum[];
  albumIds: string[];
  earliestReleaseDate: string | null;
};

/**
 * Resolve an artist's releases (albums + singles, deduped, capped at 200) via
 * the auth-free Spotify proxy on the Recoup api. Runs in the browser (Option B,
 * chat#1798) — the proxy needs no key, so no token is required here; the token
 * gates the measurement calls, not album resolution.
 *
 * @param artistId - Spotify artist id
 */
export async function resolveArtistAlbums(artistId: string): Promise<ResolvedCatalog> {
  const items: SpotifyAlbumItem[] = [];
  for (let offset = 0; offset < MAX_ALBUMS; offset += PAGE_SIZE) {
    const params = new URLSearchParams({
      id: artistId,
      include_groups: "album,single",
      limit: String(PAGE_SIZE),
      offset: String(offset),
    });
    const res = await fetch(`${siteConfig.apiUrl}/spotify/artist/albums?${params}`);
    if (!res.ok) throw new Error(`albums lookup failed: ${res.status}`);
    const data = await res.json();
    const page: SpotifyAlbumItem[] = data.items ?? data.albums?.items ?? [];
    items.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  if (items.length === 0) throw new Error("artist has no albums on Spotify");

  const albumById = new Map<string, StartedAlbum>(
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
  const releaseDates = items.map(a => a.release_date).filter(Boolean) as string[];
  const earliestReleaseDate = releaseDates.length ? releaseDates.sort()[0] : null;

  return { albums, albumIds: albums.map(a => a.id), earliestReleaseDate };
}
