import type { Result } from "@/components/valuation/types";
import { siteConfig } from "@/lib/config";

/** Raw `POST /api/valuation` envelope (docs#272). */
type ValuationResponse = {
  catalog?: { id?: string } | null;
  band?: { low: number; mid: number; high: number } | null;
  songs_measured?: number;
  error?: string;
};

/** Friendly copy for the error states the endpoint reports. */
function messageForStatus(status: number): string {
  if (status === 402)
    return "We couldn't measure this catalog. Not enough credits to capture it.";
  if (status === 404) return "We couldn't find any releases for this artist.";
  if (status === 504)
    return "We couldn't measure this catalog yet. Try again in a few minutes.";
  return `We couldn't run the valuation (${status}).`;
}

/**
 * Run one catalog valuation through the consolidated, bearer-authed recoup-api
 * endpoint (`POST /api/valuation { spotify_artist_id }`, docs#272; handler
 * api/lib/valuation/runValuationHandler.ts). One synchronous call replaces the
 * old client-side orchestration (resolve → measure → poll → compute → claim):
 * the endpoint spends the signed-in account's credits, materializes the catalog,
 * links the artist to the roster, and returns the value band — so the browser no
 * longer orchestrates, links, or claims. Still "values what's measured": a
 * partial capture yields a band over `songs_measured` tracks rather than an error.
 *
 * @param spotifyArtistId - Spotify artist id
 * @param token - Privy access token (the bearer); the run executes under the
 *   signed-in account and spends its credits.
 */
export async function runValuation(
  spotifyArtistId: string,
  token?: string | null,
): Promise<Result> {
  const res = await fetch(`${siteConfig.apiUrl}/valuation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ spotify_artist_id: spotifyArtistId }),
  });

  const data: ValuationResponse | null = await res.json().catch(() => null);
  if (!res.ok || !data?.catalog?.id || !data.band) {
    throw new Error(data?.error ?? messageForStatus(res.status));
  }

  // The endpoint's band is { low, mid, high }; the card's Band uses `central`.
  return {
    catalogId: data.catalog.id,
    band: { low: data.band.low, central: data.band.mid, high: data.band.high },
    songsMeasured: data.songs_measured ?? 0,
  };
}
