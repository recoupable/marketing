"use client";

import { useRef, useState } from "react";

export type Artist = { id: string; name: string; image?: string; followers?: number };
export type Band = { low: number; central: number; high: number };
export type StartedAlbum = {
  id: string;
  name: string | null;
  image: string | null;
  releaseDate: string | null;
};
export type MeasuredAlbum = {
  id: string;
  streams: number;
  tracks: Array<{ name: string | null; streams: number }>;
};
export type Result = {
  state: string;
  trackCount: number;
  albumCount: number;
  capturedAlbums: number;
  totalStreams: number;
  catalogAgeYears: number;
  valueBand: Band;
  annualNls: Band;
  assumptions: { runRateBasis: string; multiple: Band };
  albums: MeasuredAlbum[];
};

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
 * All state + flow for the one-click catalog valuation: debounced artist
 * search, the start → probe-poll → full-read run, and the captured album
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
    setProgress("Finding your releases…");
    try {
      const startRes = await fetch("/api/valuation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: picked.id }),
      });
      const started = await startRes.json();
      if (!startRes.ok) throw new Error(started.error ?? "start failed");
      setCatalogAlbums(started.albums ?? []);

      setProgress(`Measuring play counts across ${started.albumCount} releases…`);

      // cheap probe (first 2 albums) until anything lands — bounded at ~90s;
      // some albums never produce playcounts (no ISRCs / hidden counts), so
      // we value what's measured rather than waiting for 100% coverage
      const probeIds = started.albumIds.slice(0, 2);
      for (let attempt = 0; attempt < 15; attempt++) {
        await new Promise(r => setTimeout(r, 6000));
        const probe = await fetch("/api/valuation/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ albumIds: probeIds, probe: true }),
        }).then(r => r.json());
        if (probe.state === "captured") break;
        setProgress(
          `Measuring play counts across ${started.albumCount} releases… (still capturing)`,
        );
      }

      setProgress("Computing your valuation…");
      const final = await fetch("/api/valuation/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albumIds: started.albumIds,
          earliestReleaseDate: started.earliestReleaseDate,
        }),
      }).then(r => r.json());
      if (final.state !== "done") {
        // nothing measured yet — one more patient read before giving up
        await new Promise(r => setTimeout(r, 20000));
        const retry = await fetch("/api/valuation/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            albumIds: started.albumIds,
            earliestReleaseDate: started.earliestReleaseDate,
          }),
        }).then(r => r.json());
        if (retry.state !== "done")
          throw new Error("we couldn't measure this catalog yet — try again in a few minutes");
        setResult(retry);
        setPhase("done");
        return;
      }

      setResult(final);
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
