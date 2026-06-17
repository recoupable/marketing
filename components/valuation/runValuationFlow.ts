import type { Result, StartedAlbum } from "@/components/valuation/types";
import { readResult } from "@/components/valuation/readResult";

type FlowOutcome = { catalogAlbums: StartedAlbum[]; result: Result };

/**
 * Client flow for one valuation run: start the snapshot, probe-poll until the
 * capture starts landing, then read the full result. Throws with a
 * user-facing message when nothing could be measured.
 *
 * @param artistId - Spotify artist id
 * @param onProgress - Progress copy for the running button
 * @param getToken - Privy access token getter; the gated flow runs under the
 *   signed-in account (chat#1798). Threaded through now; the direct-to-recoup-api
 *   calls that use it land in the Option-B retarget (follow-up PR).
 */
export async function runValuationFlow(
  artistId: string,
  onProgress: (message: string) => void,
  getToken?: () => Promise<string | null>,
): Promise<FlowOutcome> {
  void getToken;
  onProgress("Finding your releases…");
  const startRes = await fetch("/api/valuation/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artistId }),
  });
  const started = await startRes.json();
  if (!startRes.ok) throw new Error(started.error ?? "start failed");

  onProgress(`Measuring play counts across ${started.albumCount} releases…`);

  // cheap probe (first 2 albums) until anything lands — bounded at ~90s;
  // some albums never produce playcounts (no ISRCs / hidden counts), so we
  // value what's measured rather than waiting for 100% coverage
  const probeIds = started.albumIds.slice(0, 2);
  for (let attempt = 0; attempt < 15; attempt++) {
    await new Promise(r => setTimeout(r, 6000));
    const probe = await fetch("/api/valuation/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ albumIds: probeIds, probe: true }),
    }).then(r => r.json());
    if (probe.state === "captured") break;
    onProgress(`Measuring play counts across ${started.albumCount} releases… (still capturing)`);
  }

  onProgress("Computing your valuation…");
  const final = await readResult(started.albumIds, started.earliestReleaseDate);
  if (final.state === "done") return { catalogAlbums: started.albums ?? [], result: final };

  // nothing measured yet — one more patient read before giving up
  await new Promise(r => setTimeout(r, 20000));
  const retry = await readResult(started.albumIds, started.earliestReleaseDate);
  if (retry.state !== "done")
    throw new Error("we couldn't measure this catalog yet — try again in a few minutes");
  return { catalogAlbums: started.albums ?? [], result: retry };
}
