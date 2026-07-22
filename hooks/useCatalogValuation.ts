"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import type { Artist, Result } from "@/components/valuation/types";
import { runValuation } from "@/lib/valuation/runValuation";
import { captureRunLead } from "@/lib/valuation/captureRunLead";

type Phase = "idle" | "running" | "done" | "error";

export type CatalogValuationState = {
  picked: Artist | null;
  phase: Phase;
  progress: string;
  result: Result | null;
  error: string;
  pick: (artist: Artist) => void;
  clearPick: () => void;
  run: () => Promise<void>;
};

// `POST /api/valuation` is one synchronous call (resolve → measure → materialize
// → value, typically under two minutes), so it can't stream per-step progress.
// Advance this staged copy on a timer to keep the run button alive; it stalls on
// the last line until the call resolves.
const PROGRESS_STAGES = [
  "Finding your releases…",
  "Measuring play counts…",
  "Computing your valuation…",
];
const PROGRESS_INTERVAL_MS = 9000;

/**
 * Drives the catalog valuation behind the Privy sign-in gate (chat#1798). The
 * run trigger opens Privy when signed out and, on login, auto-fires the run for
 * the **originally** selected artist. Render inside `PrivyProvider`.
 */
export function useCatalogValuation(): CatalogValuationState {
  const { authenticated, login, getAccessToken, user } = usePrivy();
  const [picked, setPicked] = useState<Artist | null>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  // The *selected-at-click* artist to run once login completes (so a selection
  // change while the modal is open can't retarget the run).
  const pendingRun = useRef<Artist | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopProgress() {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }

  function startProgress() {
    let stage = 0;
    setProgress(PROGRESS_STAGES[0]);
    stopProgress();
    progressTimer.current = setInterval(() => {
      stage = Math.min(stage + 1, PROGRESS_STAGES.length - 1);
      setProgress(PROGRESS_STAGES[stage]);
    }, PROGRESS_INTERVAL_MS);
  }

  async function doRun(artist: Artist) {
    setPhase("running");
    setError("");
    startProgress();
    try {
      const token = await getAccessToken();
      // One bearer-authed call materializes the catalog, links the artist to the
      // roster, and returns the value band (docs#272) — the browser no longer
      // orchestrates, links, or claims.
      const runResult = await runValuation(artist.id, token);
      setResult(runResult);
      setPhase("done");
      captureRunLead(user, artist, runResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
    } finally {
      stopProgress();
    }
  }

  async function run() {
    if (!picked) return;
    // Gate: signed out → open Privy and defer the run to a successful login.
    if (!authenticated) {
      pendingRun.current = picked;
      login();
      return;
    }
    await doRun(picked);
  }

  // Auto-fire the deferred run once the user signs in, for the stored artist.
  useEffect(() => {
    if (authenticated && pendingRun.current) {
      const artist = pendingRun.current;
      pendingRun.current = null;
      void doRun(artist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  // Clear the progress ticker if the component unmounts mid-run.
  useEffect(() => stopProgress, []);

  return {
    picked,
    phase,
    progress,
    result,
    error,
    pick: setPicked,
    clearPick: () => {
      pendingRun.current = null; // also drop a deferred signed-out run
      setPicked(null);
    },
    run,
  };
}
