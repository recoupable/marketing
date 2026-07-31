"use client";

import { useEffect, useRef, useState } from "react";
import { searchCache } from "@/lib/spotify/searchCache";
import { getCachedApprox } from "@/lib/spotify/getCachedApprox";
import type { SpotifyArtist } from "@/lib/spotify/types";

export type SpotifyArtistSearch = {
  query: string;
  setQuery: (q: string) => void;
  results: SpotifyArtist[];
  loading: boolean;
};

/**
 * Debounced, cached Spotify artist search powering the shared ArtistSearchBox.
 * Cache + approximation live in lib/spotify; this hook owns only the
 * query/results state and the debounced network fetch (recoupable/chat#1814).
 * Fetches are lazy: nothing hits /api/spotify/search until the first keystroke
 * (recoupable/chat#1902 removed the a-z alphabet prefetch).
 */
export function useSpotifyArtistSearch(): SpotifyArtistSearch {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    const q = query.toLowerCase();
    const exact = searchCache.get(q);
    if (exact) {
      setResults(exact);
      setLoading(false);
      return;
    }

    const approx = getCachedApprox(q);
    if (approx.length > 0) setResults(approx);
    setLoading(true);

    const timeout = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/spotify/search?q=${encodeURIComponent(query)}&limit=10`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        if (!controller.signal.aborted) {
          const artists: SpotifyArtist[] = data.artists ?? [];
          searchCache.set(q, artists);
          setResults(artists);
        }
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 80);

    return () => {
      clearTimeout(timeout);
      abortRef.current?.abort();
    };
  }, [query]);

  return { query, setQuery, results, loading };
}
