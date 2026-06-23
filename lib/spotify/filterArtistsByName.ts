import type { SpotifyArtist } from "@/lib/spotify/types";

/**
 * Case-insensitive substring match on artist name. Used to narrow a cached
 * result set to a longer query without re-hitting the network (the prefix-cache
 * approximation behind the shared artist search).
 */
export function filterArtistsByName(
  artists: SpotifyArtist[],
  query: string,
): SpotifyArtist[] {
  const q = query.toLowerCase();
  return artists.filter((a) => a.name.toLowerCase().includes(q));
}
