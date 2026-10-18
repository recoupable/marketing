/** "10/11/2026" for an episode's YYYY-MM-DD date, read as a calendar date (no timezone shift). */
export function formatEpisodeDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${month}/${day}/${year}`;
}
