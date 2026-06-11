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

/** methodology.md §1 — public Spotify per-stream rate (2025 default). */
const SPOTIFY_PER_STREAM_USD = 0.0035;
/** methodology.md §1 — other-DSP gross-up as a share of Spotify gross. */
const GROSS_UP = { low: 1.25, central: 1.4, high: 1.6 };
/** methodology.md §2 — distribution fee + blended artist/producer royalties. */
const DISTRIBUTION_FEE = 0.15;
const ROYALTY_SHARE = 0.25;
/** methodology.md §4 — master-catalog NLS multiple band. */
const MULTIPLE = { low: 10, central: 13, high: 16 };

const DEFAULT_AGE_YEARS = 5;
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export type Band = { low: number; central: number; high: number };

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

function nlsBandFromSpotifyGross(spotifyGross: number): Band {
  const net = (1 - DISTRIBUTION_FEE) * (1 - ROYALTY_SHARE);
  return {
    low: spotifyGross * GROSS_UP.low * net,
    central: spotifyGross * GROSS_UP.central * net,
    high: spotifyGross * GROSS_UP.high * net,
  };
}

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
