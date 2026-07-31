import type { SpotifyArtist } from "@/lib/spotify/types";

/**
 * Module-level cache of Spotify search results, keyed by lowercased query and
 * shared across every mount so the dropdown feels instant after the first few
 * keystrokes. Seeded lazily by real searches and read via getCachedApprox; no
 * request fires until the user types (recoupable/chat#1902).
 */
export const searchCache = new Map<string, SpotifyArtist[]>();
