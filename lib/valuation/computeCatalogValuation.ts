/**
 * Catalog valuation band from lifetime platform-displayed Spotify play counts.
 *
 * Mirrors the catalog-value-estimator skill's methodology.md (the house
 * assumption stack) with one campaign-page simplification: fresh artists have
 * no trailing-12-month series yet (the deltas endpoint gates run-rates behind
 * a 28-day window), so the annual run-rate uses the LIFETIME-AVERAGE proxy —
 * all-time streams ÷ catalog age — labeled as such. Front-loaded catalogs
 * read high on this proxy; evergreen ones read low. The page must present the
 * result as a directional model with assumptions visible.
 */

import {
  nlsBandFromSpotifyGross,
  GROSS_UP,
  DISTRIBUTION_FEE,
  ROYALTY_SHARE,
  type Band,
} from "@/lib/valuation/nlsBandFromSpotifyGross";

/** methodology.md §1 — public Spotify per-stream rate (2025 default). */
const SPOTIFY_PER_STREAM_USD = 0.0035;
/** methodology.md §4 — master-catalog NLS multiple band. */
const MULTIPLE = { low: 10, central: 13, high: 16 };

const DEFAULT_AGE_YEARS = 5;
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export type { Band } from "@/lib/valuation/nlsBandFromSpotifyGross";

export type CatalogValuation = {
  totalStreams: number;
  catalogAgeYears: number;
  annualStreamsProxy: number;
  lifetimeNls: Band;
  annualNls: Band;
  valueBand: Band;
  assumptions: {
    spotifyPerStreamUsd: number;
    grossUp: Band;
    distributionFee: number;
    royaltyShare: number;
    multiple: Band;
    runRateBasis: "lifetime_average";
    ageSource: "earliest_release" | "default_5y";
  };
};

export function computeCatalogValuation(params: {
  totalStreams: number;
  earliestReleaseDate: string | null;
  now?: Date;
}): CatalogValuation {
  const now = params.now ?? new Date();

  let catalogAgeYears = DEFAULT_AGE_YEARS;
  let ageSource: CatalogValuation["assumptions"]["ageSource"] = "default_5y";
  if (params.earliestReleaseDate) {
    const ageMs = now.getTime() - new Date(params.earliestReleaseDate).getTime();
    catalogAgeYears = Math.max(1, Math.round(ageMs / YEAR_MS));
    ageSource = "earliest_release";
  }

  const annualStreamsProxy = params.totalStreams / catalogAgeYears;
  const lifetimeNls = nlsBandFromSpotifyGross(params.totalStreams * SPOTIFY_PER_STREAM_USD);
  const annualNls = nlsBandFromSpotifyGross(annualStreamsProxy * SPOTIFY_PER_STREAM_USD);

  return {
    totalStreams: params.totalStreams,
    catalogAgeYears,
    annualStreamsProxy,
    lifetimeNls,
    annualNls,
    valueBand: {
      low: annualNls.low * MULTIPLE.low,
      central: annualNls.central * MULTIPLE.central,
      high: annualNls.high * MULTIPLE.high,
    },
    assumptions: {
      spotifyPerStreamUsd: SPOTIFY_PER_STREAM_USD,
      grossUp: GROSS_UP,
      distributionFee: DISTRIBUTION_FEE,
      royaltyShare: ROYALTY_SHARE,
      multiple: MULTIPLE,
      runRateBasis: "lifetime_average",
      ageSource,
    },
  };
}
