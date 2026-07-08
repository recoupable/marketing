"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import type {
  Artist,
  Result,
  StartedAlbum,
} from "@/components/valuation/types";
import { runValuationFlow } from "@/lib/valuation/runValuationFlow";
import { captureRunLead } from "@/lib/valuation/captureRunLead";
import { linkArtistToAccount } from "@/lib/valuation/linkArtistToAccount";
import { savePendingIntent } from "@/lib/valuation/savePendingIntent";
import { readPendingIntent } from "@/lib/valuation/readPendingIntent";
import { clearPendingIntent } from "@/lib/valuation/clearPendingIntent";

type Phase = "idle" | "running" | "done" | "error";

export type CatalogValuationState = {
  picked: Artist | null;
  catalogAlbums: StartedAlbum[];
  phase: Phase;
  progress: string;
  result: Result | null;
  error: string;
  pick: (artist: Artist) => void;
  clearPick: () => void;
  run: () => Promise<void>;
};

/**
 * Drives the catalog valuation behind the Privy sign-in gate (chat#1798). The
 * run trigger opens Privy when signed out and, on login, auto-fires the run for
 * the **originally** selected artist. The deferred intent is persisted to
 * sessionStorage — not just a ref — because fresh-signup auth churn can remount
 * this hook's component mid-auth and a ref dies with its instance (chat#1850
 * post-auth intent drop). Render inside `PrivyProvider`.
 */
export function useCatalogValuation(): CatalogValuationState {
  const { authenticated, login, getAccessToken, user } = usePrivy();
  const [picked, setPicked] = useState<Artist | null>(null);

  const [catalogAlbums, setCatalogAlbums] = useState<StartedAlbum[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  // The *selected-at-click* artist to run once login completes (so a selection
  // change while the modal is open can't retarget the run).
  const pendingRun = useRef<Artist | null>(null);

  async function doRun(artist: Artist) {
    setPhase("running");
    setError("");
    try {
      const token = await getAccessToken();
      const outcome = await runValuationFlow(artist.id, setProgress, token);
      setCatalogAlbums(outcome.catalogAlbums);
      setResult(outcome.result);
      setPhase("done");
      // Link the looked-up artist to the account roster (chat#1814); best-effort.
      void linkArtistToAccount(artist, token);
      captureRunLead(user, artist, outcome.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
    }
  }

  async function run() {
    if (!picked) return;
    // Gate: signed out → open Privy and defer the run to a successful login.
    if (!authenticated) {
      pendingRun.current = picked; // fast path when this instance survives auth
      savePendingIntent(picked); // source of truth: survives remount + reload
      login();
      return;
    }
    await doRun(picked);
  }

  // Auto-fire the deferred run once `authenticated` is true — on the sign-in
  // flip when this instance survives, or on mount of a fresh instance after an
  // auth-churn remount / full reload (then the intent comes from storage).
  useEffect(() => {
    if (!authenticated) return;
    const artist = pendingRun.current ?? readPendingIntent();
    pendingRun.current = null;
    clearPendingIntent(); // consume-once: never re-fire on later mounts
    if (!artist) return;
    setPicked(artist); // a remount lost `picked`; restore it for the result UI
    void doRun(artist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return {
    picked,
    catalogAlbums,
    phase,
    progress,
    result,
    error,
    pick: setPicked,
    clearPick: () => {
      pendingRun.current = null; // also drop a deferred signed-out run
      clearPendingIntent(); // …including its persisted copy
      setPicked(null);
    },
    run,
  };
}
