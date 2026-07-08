import type { Artist } from "@/components/valuation/types";
import {
  PENDING_INTENT_KEY,
  PENDING_INTENT_MAX_AGE_MS,
} from "@/lib/valuation/pendingIntent";

/**
 * Read the persisted post-auth valuation intent. Returns null when absent,
 * malformed, stale (> max age — a stale tab must not auto-run), or when
 * storage is unavailable (SSR / private mode). Read-only: the caller clears.
 */
export function readPendingIntent(now: number = Date.now()): Artist | null {
  try {
    if (typeof sessionStorage === "undefined") return null;
    const raw = sessionStorage.getItem(PENDING_INTENT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { artist, savedAt } = parsed as Partial<{
      artist: Artist;
      savedAt: number;
    }>;
    if (typeof artist?.id !== "string" || typeof artist.name !== "string") {
      return null;
    }
    if (typeof savedAt !== "number") return null;
    if (now - savedAt > PENDING_INTENT_MAX_AGE_MS) return null;
    return artist;
  } catch {
    return null;
  }
}
