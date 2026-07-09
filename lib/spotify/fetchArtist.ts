import type { SpotifyArtist } from "@/lib/spotify/types";

/**
 * Fetch a single Spotify artist by ID via the internal API proxy.
 * Returns null if not found or on error.
 */
export async function fetchSpotifyArtist(
  id: string,
): Promise<SpotifyArtist | null> {
  try {
    const res = await fetch(`/api/spotify/artist/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as SpotifyArtist;
  } catch {
    return null;
  }
}
