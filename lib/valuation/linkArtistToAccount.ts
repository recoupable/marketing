import { siteConfig } from "@/lib/config";

/** The looked-up artist: a Spotify id + display name. */
type LinkableArtist = { id: string; name: string };

/**
 * Fire-and-forget: add the looked-up artist to the signed-in account's roster on
 * run success (recoupable/chat#1814). Reuses the same api endpoints the chat
 * artist-settings popup uses — no bespoke endpoint:
 *   1. POST  /api/artists       → create the artist + link it to the bearer's
 *      account (via account_artist_ids).
 *   2. PATCH /api/artists/{id}  → attach its Spotify social (profileUrls).
 * Best-effort: never throws. No token → nothing to link. Note: POST /api/artists
 * has no dedup, so repeat runs may create duplicate artist accounts — accepted
 * for now (top-of-funnel lead flow).
 */
export async function linkArtistToAccount(
  artist: LinkableArtist,
  token: string | null,
): Promise<void> {
  if (!token) return;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await fetch(`${siteConfig.apiUrl}/artists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: artist.name }),
    });
    if (!res.ok) return;
    const { artist: created } = await res.json();
    const id = created?.account_id;
    if (!id) return;
    await fetch(`${siteConfig.apiUrl}/artists/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        profileUrls: {
          SPOTIFY: `https://open.spotify.com/artist/${artist.id}`,
        },
      }),
    });
  } catch {
    // best-effort — a failed link must never affect the rendered valuation
  }
}
