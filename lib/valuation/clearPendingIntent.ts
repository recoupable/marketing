import { PENDING_INTENT_KEY } from "@/lib/valuation/pendingIntent";

/**
 * Drop the persisted post-auth valuation intent — after a resume consumes it,
 * or when the user clears their pick (matching the ref-clearing semantic).
 */
export function clearPendingIntent(): void {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.removeItem(PENDING_INTENT_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
}
