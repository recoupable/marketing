/**
 * Format an elapsed duration for the valuation progress ticker: "42s" under a
 * minute, "1m 15s" beyond. Negative and fractional inputs clamp/floor.
 */
export function formatElapsedSeconds(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  if (total < 60) return `${total}s`;
  return `${Math.floor(total / 60)}m ${total % 60}s`;
}
