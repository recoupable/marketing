"use client";

import { useRef, useState } from "react";
import type { Artist } from "@/components/valuation/types";

export type ArtistSearchState = {
  query: string;
  artists: Artist[];
  picked: Artist | null;
  onQueryChange: (q: string) => void;
  pick: (artist: Artist) => void;
};

/**
 * Debounced artist search + selection state for the valuation flow. Split out
 * of useCatalogValuation so each hook owns one concern (chat#1798).
 */
export function useArtistSearch(): ArtistSearchState {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [picked, setPicked] = useState<Artist | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function onQueryChange(q: string) {
    setQuery(q);
    setPicked(null);
    clearTimeout(searchTimer.current);
    if (q.length < 2) return setArtists([]);
    searchTimer.current = setTimeout(async () => {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json().catch(() => ({ artists: [] }));
      setArtists(data.artists ?? []);
    }, 300);
  }

  function pick(artist: Artist) {
    setPicked(artist);
    setQuery(artist.name);
    setArtists([]);
  }

  return { query, artists, picked, onQueryChange, pick };
}
