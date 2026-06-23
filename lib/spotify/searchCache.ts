import type { SpotifyArtist } from "@/lib/spotify/types";

/**
 * Module-level cache of Spotify search results, keyed by lowercased query and
 * shared across every mount so the dropdown feels instant after the first few
 * keystrokes. Seeded by prefetchLetters and read via getCachedApprox.
 */
export const searchCache = new Map<string, SpotifyArtist[]>();
