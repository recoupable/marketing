import type { Artist } from "@/components/valuation/types";
import type { SpotifyArtist } from "@/lib/spotify/types";

/** Map a Spotify search result to the valuation `Artist` shape. */
export function toArtist(a: SpotifyArtist): Artist {
  return {
    id: a.id,
    name: a.name,
    image: a.image ?? undefined,
    followers: a.followers,
  };
}
