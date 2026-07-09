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
import { fetchSpotifyArtist } from "@/lib/spotify/fetchArtist";
import { toArtist } from "@/lib/valuation/toArtist";

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
 * the **originally** selected artist. Render inside `PrivyProvider`.
 *
 * When `initialArtistId` is provided (shareable URL), auto-fetches the artist
 * and queues the valuation run on mount.
 */
export function useCatalogValuation(
  initialArtistId?: string,
): CatalogValuationState {
  const { authenticated, login, getAccessToken, user } = usePrivy();
  const [picked, setPicked] = useState<Artist | null>(null);
  const initialFetched = useRef(false);

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
      // Roster attach happens server-side when the run is claimed into a
      // catalog (POST /api/catalogs resolves the canonical artist through the
      // songs graph, chat#1850 P1) — the old client-side POST /api/artists
      // minted a duplicate, song-less roster artist per signup.
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

  // Shareable URL: fetch artist by Spotify ID and auto-trigger the run.
  useEffect(() => {
    if (!initialArtistId || initialFetched.current) return;
    initialFetched.current = true;
    void (async () => {
      const spotify = await fetchSpotifyArtist(initialArtistId);
      if (!spotify) return;
      const artist = toArtist(spotify);
      setPicked(artist);
      // If already authenticated, run immediately; otherwise queue for login.
      if (authenticated) {
        void doRun(artist);
      } else {
        pendingRun.current = artist;
        login();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialArtistId]);

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
      setPicked(null);
    },
    run,
  };
}
