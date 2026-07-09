import { siteConfig } from "@/lib/config";

type ArtistInfo = { name: string; image: string | null };

/**
 * Server-side fetch of a Spotify artist for metadata generation.
 * Calls the Recoup API directly (no internal proxy needed at build time).
 */
export async function fetchArtistServer(
  id: string,
): Promise<ArtistInfo | null> {
  try {
    const res = await fetch(`${siteConfig.apiUrl}/spotify/artist/${id}`, {
      next: { revalidate: 86400 }, // cache 24h
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      name: data.name ?? "Unknown Artist",
      image: data.images?.[0]?.url ?? null,
    };
  } catch {
    return null;
  }
}
