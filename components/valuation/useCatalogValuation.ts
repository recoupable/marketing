"use client";

import { useRef, useState } from "react";
import type { Artist, Result, StartedAlbum } from "@/components/valuation/types";
import { runValuationFlow } from "@/components/valuation/runValuationFlow";

export type { Artist, Result, StartedAlbum, MeasuredAlbum } from "@/components/valuation/types";

export type CatalogValuationState = {
  query: string;
  artists: Artist[];
  picked: Artist | null;
  catalogAlbums: StartedAlbum[];
  phase: "idle" | "running" | "done" | "error";
  progress: string;
  result: Result | null;
  error: string;
  onQueryChange: (q: string) => void;
  pick: (artist: Artist) => void;
  run: () => Promise<void>;
};

/**
 * All state for the one-click catalog valuation: debounced artist search,
 * the run flow (delegated to runValuationFlow), and the captured album
 * metadata the results breakdown renders against.
 */
export function useCatalogValuation(): CatalogValuationState {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [picked, setPicked] = useState<Artist | null>(null);
  const [catalogAlbums, setCatalogAlbums] = useState<StartedAlbum[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
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

  async function run() {
    if (!picked) return;
    setPhase("running");
    setError("");
    try {
      const outcome = await runValuationFlow(picked.id, setProgress);
      setCatalogAlbums(outcome.catalogAlbums);
      setResult(outcome.result);
      setPhase("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
    }
  }

  return {
    query,
    artists,
    picked,
    catalogAlbums,
    phase,
    progress,
    result,
    error,
    onQueryChange,
    pick,
    run,
  };
}
