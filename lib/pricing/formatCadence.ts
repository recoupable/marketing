const NAMED_CADENCES: Record<number, string> = {
  10080: "Weekly",
  1440: "Daily",
  60: "Hourly",
};

/** Plain-words name for a plan's shortest task cadence, given in minutes. */
export function formatCadence(minCadenceMinutes: number): string {
  return NAMED_CADENCES[minCadenceMinutes] ?? `Every ${minCadenceMinutes} minutes`;
}
