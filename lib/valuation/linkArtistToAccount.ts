import { siteConfig } from "@/lib/config";

export type LinkArtistInput = {
  /** Spotify artist id of the looked-up artist. */
  artistId: string;
  artistName: string;
  /** Privy access token — the account to link to is derived from it server-side. */
  token: string | null;
};

/**
 * Fire-and-forget: link the looked-up artist to the signed-in account on run
 * success (recoupable/chat#1814). POSTs the Spotify id to the api
 * `POST /api/artists/spotify-link` route, which resolve-or-creates the artist
 * account and links it to the bearer's account via `account_artist_ids`
 * (idempotent). Best-effort — a link failure must never affect the rendered
 * valuation, so this never awaits or throws. No token → nothing to link.
 */
export function linkArtistToAccount({ artistId, artistName, token }: LinkArtistInput): void {
  if (!token) return;
  void fetch(`${siteConfig.apiUrl}/artists/spotify-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ spotify_id: artistId, name: artistName }),
  }).catch(() => {});
}
