/** Whole minutes, floored like Spotify's episode length, never below one. */
export function formatDuration(seconds: number): string {
  return `${Math.max(1, Math.floor(seconds / 60))} min`;
}
