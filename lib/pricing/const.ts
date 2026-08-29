import { PLAN_ENTITLEMENTS } from "@/lib/pricing/entitlements";

/**
 * Monthly credit allotments in dollars, read from the entitlement table that
 * mirrors `api/lib/credits/const.ts` (`DEFAULT_CREDITS_USD`,
 * `STARTER_CREDITS_USD`, `PRO_CREDITS_USD`); the api is the source of truth.
 */
export const FREE_CREDITS_USD = PLAN_ENTITLEMENTS.free.credits_usd;
export const STARTER_CREDITS_USD = PLAN_ENTITLEMENTS.starter.credits_usd;
export const PRO_CREDITS_USD = PLAN_ENTITLEMENTS.pro.credits_usd;

/**
 * Median credits spent by one scheduled report run: $0.766 over the 42 runs
 * in the 30 days to 2026-08-28 (`usage_events`, summed per `resource_url`).
 * Re-measure when the report prompts or models change.
 */
export const MEDIAN_REPORT_RUN_USD = 0.766;
