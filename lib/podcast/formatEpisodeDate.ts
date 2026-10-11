/** "October 11, 2026" for an episode's YYYY-MM-DD date, read as a calendar date (no timezone shift). */
export function formatEpisodeDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
