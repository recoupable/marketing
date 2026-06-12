import type { Result } from "@/components/valuation/types";

/**
 * One full (non-probe) read of the valuation result for a started snapshot.
 *
 * @param albumIds - Album ids from the started snapshot
 * @param earliestReleaseDate - Earliest release date (for catalog age)
 */
export function readResult(
  albumIds: string[],
  earliestReleaseDate: string | null,
): Promise<Result> {
  return fetch("/api/valuation/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ albumIds, earliestReleaseDate }),
  }).then(r => r.json());
}
