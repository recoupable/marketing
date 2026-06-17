"use client";

import { useEffect, useRef, useState } from "react";
import type { Artist, Result, StartedAlbum } from "@/components/valuation/types";
import { runValuationFlow } from "@/components/valuation/runValuationFlow";

export type { Artist, Result, StartedAlbum, MeasuredAlbum } from "@/components/valuation/types";

/**
 * Auth gate injected by the Privy boundary (chat#1798). Absent when Privy isn't
 * configured (`NEXT_PUBLIC_PRIVY_APP_ID` unset) — the flow then runs un-gated.
 */
export type ValuationGate = {
  authed: boolean;
  login: () => void;
  getToken: () => Promise<string | null>;
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
  /** True when a pick is made but the user must sign in before the run fires. */
  needsAuth: boolean;
  onQueryChange: (q: string) => void;
  pick: (artist: Artist) => void;
  run: () => Promise<void>;
};

/**
 * All state for the one-click catalog valuation: debounced artist search, the
 * run flow (delegated to runValuationFlow), and the captured album metadata the
 * results breakdown renders against.
 *
 * When a `gate` is provided (Privy configured), the run is held behind sign-in:
 * "Value my catalog" opens the Privy modal, and on a successful login the run
 * auto-fires for the already-selected artist (chat#1798).
 */
export function useCatalogValuation(gate?: ValuationGate): CatalogValuationState {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [picked, setPicked] = useState<Artist | null>(null);
  const [catalogAlbums, setCatalogAlbums] = useState<StartedAlbum[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingRun = useRef(false);

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

  async function doRun(artist: Artist) {
    setPhase("running");
    setError("");
    try {
      const outcome = await runValuationFlow(artist.id, setProgress, gate?.getToken);
      setCatalogAlbums(outcome.catalogAlbums);
      setResult(outcome.result);
      setPhase("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
    }
  }

  async function run() {
    if (!picked) return;
    // Gate: un-authenticated → open Privy and defer the run to a successful login.
    if (gate && !gate.authed) {
      pendingRun.current = true;
      gate.login();
      return;
    }
    await doRun(picked);
  }

  // Auto-fire the deferred run once the user signs in (chat#1798).
  useEffect(() => {
    if (gate?.authed && pendingRun.current && picked) {
      pendingRun.current = false;
      void doRun(picked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate?.authed]);

  return {
    query,
    artists,
    picked,
    catalogAlbums,
    phase,
    progress,
    result,
    error,
    needsAuth: Boolean(gate) && !gate?.authed && Boolean(picked),
    onQueryChange,
    pick,
    run,
  };
}
