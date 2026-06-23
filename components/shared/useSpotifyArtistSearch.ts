"use client";

import { useEffect, useRef, useState } from "react";
import { filterArtistsByName } from "@/lib/spotify/filterArtistsByName";
import type { SpotifyArtist } from "@/lib/spotify/types";

export type { SpotifyArtist } from "@/lib/spotify/types";

// Module-level cache shared across every mount so the dropdown feels instant
// after the first keystrokes — prefetched single letters seed it, and each live
// query result is memoized by its lowercased string.
const searchCache = new Map<string, SpotifyArtist[]>();
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

function prefetchLetters() {
  if (searchCache.size > 0) return;
  LETTERS.forEach(letter => {
    fetch(`/api/spotify/search?q=${letter}&limit=10`)
      .then(r => r.json())
      .then(data => {
        searchCache.set(letter, data.artists ?? []);
      })
      .catch(() => {});
  });
}

function getCachedApprox(query: string): SpotifyArtist[] {
  const q = query.toLowerCase();
  const exact = searchCache.get(q);
  if (exact) return exact;
  for (let len = q.length - 1; len >= 1; len--) {
    const cached = searchCache.get(q.slice(0, len));
    if (cached) return filterArtistsByName(cached, q);
  }
  return [];
}

export type SpotifyArtistSearch = {
  query: string;
  setQuery: (q: string) => void;
  results: SpotifyArtist[];
  loading: boolean;
};

/**
 * Debounced, cached Spotify artist search powering the shared ArtistSearchBox.
 * Extracted from the home hero so the home page and the valuation page share one
 * search implementation (DRY, recoupable/chat#1814).
 */
export function useSpotifyArtistSearch(): SpotifyArtistSearch {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    prefetchLetters();
  }, []);

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
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&limit=10`, {
          signal: controller.signal,
        });
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
