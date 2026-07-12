import type { Result, StartedAlbum } from "@/components/valuation/types";
import { siteConfig } from "@/lib/config";
import { resolveArtistAlbums } from "@/lib/valuation/resolveArtistAlbums";
import { readCatalogMeasurements } from "@/lib/valuation/readCatalogMeasurements";
import { computeCatalogValuation } from "@/lib/valuation/computeCatalogValuation";

type FlowOutcome = { catalogAlbums: StartedAlbum[]; result: Result };

const POLL_ATTEMPTS = 15;
const POLL_INTERVAL_MS = 6000;

/**
 * Client flow for one valuation run (Option B, chat#1798): the browser calls
 * the consolidated, bearer-authed recoup-api endpoints directly —
 *   1. resolve the artist's releases (auth-free Spotify proxy),
 *   2. `POST /research/measurement-jobs { source:"current" }` to kick the
 *      Apify capture under the signed-in account,
 *   3. poll per-album `GET /research/albums/{id}/measurements` until counts land,
 *   4. compute the valuation band client-side.
 *
 * Values what's measured rather than waiting for 100% coverage; a `402` mid-read
 * (credits exhausted) yields a **partial** result rather than an error.
 *
 * @param artistId - Spotify artist id
 * @param onProgress - Progress copy for the running button
 * @param token - Privy access token (the bearer); the run executes under the
 *   signed-in account and spends its credits.
 */
export async function runValuationFlow(
  artistId: string,
  onProgress: (message: string) => void,
  token?: string | null,
): Promise<FlowOutcome> {
  onProgress("Finding your releases…");
  const { albums, albumIds, earliestReleaseDate } = await resolveArtistAlbums(artistId);

  onProgress(`Measuring play counts across ${albumIds.length} releases…`);
  const startRes = await fetch(`${siteConfig.apiUrl}/research/measurement-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      source: "current",
      scope: { album_ids: albumIds },
      platforms: ["spotify"],
    }),
  });
  if (!startRes.ok) {
    const err = await startRes.json().catch(() => ({}));
    throw new Error(err.error ?? `couldn't start the measurement (${startRes.status})`);
  }
  // The job response carries the playcount snapshot id (`id` === snapshot_id for
  // source:"current"). Keep it so the result CTA can materialize this exact run
  // into a catalog via POST /api/catalogs { from: { snapshot_id } }.
  const startJob = await startRes.json().catch(() => null);
  const snapshotId: string | undefined = startJob?.id ?? undefined;

  // Poll the per-album reads until anything lands (bounded ~90s). Some albums
  // never produce counts (no ISRCs / hidden counts), so we stop at first data
  // rather than waiting for full coverage.
  const build = (counts: Awaited<ReturnType<typeof readCatalogMeasurements>>): Result =>
    ({
      state: "done",
      trackCount: counts.trackCount,
      albumCount: counts.total,
      capturedAlbums: counts.captured,
      albums: counts.albums,
      snapshotId,
      ...computeCatalogValuation({ totalStreams: counts.totalStreams, earliestReleaseDate }),
    }) as Result;

  for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
    const counts = await readCatalogMeasurements(albumIds, token);
    // Value what landed the moment anything does — partial coverage is fine,
    // including a partial that stopped on credit exhaustion.
    if (counts.captured > 0) {
      onProgress("Computing your valuation…");
      return { catalogAlbums: albums, result: build(counts) };
    }
    // Credits ran out before a single album landed — nothing to value, so
    // surface it rather than returning a misleading $0 "done" result.
    if (counts.creditsExhausted)
      throw new Error("we couldn't measure this catalog — not enough credits to capture it");
    onProgress(`Measuring play counts across ${albumIds.length} releases… (still capturing)`);
  }

  // nothing measured yet — one patient final read before giving up
  await new Promise(r => setTimeout(r, 20000));
  const counts = await readCatalogMeasurements(albumIds, token);
  if (counts.captured === 0)
    throw new Error("we couldn't measure this catalog yet — try again in a few minutes");
  onProgress("Computing your valuation…");
  return { catalogAlbums: albums, result: build(counts) };
}
