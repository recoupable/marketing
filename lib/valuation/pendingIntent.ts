import type { Artist } from "@/components/valuation/types";

/**
 * The "run valuation after auth" intent persisted at the sign-in gate
 * (chat#1850). It lives in sessionStorage — not a React ref — because fresh
 * signups churn enough state to remount the valuation component mid-auth,
 * and a ref dies with its component instance. Versioned key per the
 * `recoupable-theme:v1` convention.
 */
export const PENDING_INTENT_KEY = "recoupable-valuation-pending-intent:v1";

/** Ignore intents older than this — a stale tab shouldn't auto-run a valuation. */
export const PENDING_INTENT_MAX_AGE_MS = 15 * 60 * 1000;

export type PendingIntent = { artist: Artist; savedAt: number };
