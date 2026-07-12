import { searchCache } from "@/lib/spotify/searchCache";
import { filterArtistsByName } from "@/lib/spotify/filterArtistsByName";
import type { SpotifyArtist } from "@/lib/spotify/types";

/**
 * Approximate a query's results from the cache without a network call: an exact
 * cache hit wins; otherwise narrow the longest cached prefix's results by name.
 * Returns [] when nothing relevant is cached.
 */
export function getCachedApprox(query: string): SpotifyArtist[] {
  const q = query.toLowerCase();
  const exact = searchCache.get(q);
  if (exact) return exact;
  for (let len = q.length - 1; len >= 1; len--) {
    const cached = searchCache.get(q.slice(0, len));
    if (cached) return filterArtistsByName(cached, q);
  }
  return [];
}
