import type { Artist } from "@/components/valuation/types";
import { PENDING_INTENT_KEY } from "@/lib/valuation/pendingIntent";

/**
 * Persist the picked artist before opening the auth modal so the run can
 * resume even if the component remounts (or the page reloads) mid-auth.
 * Best-effort: storage failures fall back to the in-memory ref path.
 */
export function savePendingIntent(
  artist: Artist,
  now: number = Date.now(),
): void {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.setItem(
      PENDING_INTENT_KEY,
      JSON.stringify({ artist, savedAt: now }),
    );
  } catch {
    // Private-mode quota / disabled storage — the ref fast path still works.
  }
}
