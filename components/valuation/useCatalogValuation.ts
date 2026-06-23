"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import type { Artist, Result, StartedAlbum } from "@/components/valuation/types";
import { runValuationFlow } from "@/lib/valuation/runValuationFlow";
import { captureValuationLead } from "@/lib/valuation/captureValuationLead";
import { linkArtistToAccount } from "@/lib/valuation/linkArtistToAccount";

export type { Artist, Result, StartedAlbum, MeasuredAlbum } from "@/components/valuation/types";

export type CatalogValuationState = {
  picked: Artist | null;
  catalogAlbums: StartedAlbum[];
  phase: "idle" | "running" | "done" | "error";
  progress: string;
  result: Result | null;
  error: string;
  pick: (artist: Artist) => void;
  clearPick: () => void;
  run: () => Promise<void>;
};

/**
 * Drives the catalog valuation: composes the debounced artist search and runs
 * the valuation behind the Privy sign-in gate (chat#1798). "Value my catalog"
 * opens the Privy modal when signed out and, on a successful login, auto-fires
 * the run for the **originally** selected artist. Must be rendered inside
 * `PrivyProvider` (see ValuationAuthProvider).
 */
export function useCatalogValuation(): CatalogValuationState {
  const { authenticated, login, getAccessToken, user } = usePrivy();
  const [picked, setPicked] = useState<Artist | null>(null);

  const [catalogAlbums, setCatalogAlbums] = useState<StartedAlbum[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  // Holds the artist to run once login completes — the *selected-at-click* one,
  // so a selection change while the modal is open can't retarget the run.
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
      // Link the looked-up artist to the signed-in account's roster so it shows
      // up in the app (and the account is discoverable in Attio) — not just
      // mirrored to the CRM (chat#1814). Fire-and-forget; never affects result.
      linkArtistToAccount({ artistId: artist.id, artistName: artist.name, token });
      // Capture the lead on every successful run — email + artist + value band
      // → Attio + Telegram (fire-and-forget; must not affect the result).
      const email = user?.email?.address;
      if (email && outcome.result.valueBand) {
        captureValuationLead({
          email,
          artistName: artist.name,
          artistId: artist.id,
          valueBand: outcome.result.valueBand,
          lifetimeStreams: outcome.result.totalStreams,
          followerCount: artist.followers,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
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

  return {
    picked,
    catalogAlbums,
    phase,
    progress,
    result,
    error,
    pick: setPicked,
    clearPick: () => setPicked(null),
    run,
  };
}
