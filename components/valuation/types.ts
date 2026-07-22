export type Artist = { id: string; name: string; image?: string; followers?: number };

export type Band = { low: number; central: number; high: number };

/**
 * A completed valuation run, as returned by `POST /api/valuation` (docs#272)
 * and mapped in `lib/valuation/runValuation`. The endpoint materializes the
 * catalog and computes the band server-side, so the client only carries what
 * the result card renders — no per-album/per-track breakdown is returned.
 */
export type Result = {
  /** Materialized, account-owned catalog id — deep-links the full-report CTA. */
  catalogId: string;
  /** Estimated catalog value band (USD). */
  band: Band;
  /** Tracks with a captured play count that were materialized into the catalog. */
  songsMeasured: number;
};
