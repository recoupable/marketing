/**
 * Monthly credit allotments in dollars. Mirror `api/lib/credits/const.ts`
 * (`DEFAULT_CREDITS_USD`, `PRO_CREDITS_USD`); the api is the source of truth.
 */
export const FREE_CREDITS_USD = 3.33;
export const PRO_CREDITS_USD = 99.99;

/**
 * Median credits spent by one scheduled report run: $0.766 over the 42 runs
 * in the 30 days to 2026-08-28 (`usage_events`, summed per `resource_url`).
 * Re-measure when the report prompts or models change.
 */
export const MEDIAN_REPORT_RUN_USD = 0.766;
