/**
 * Format a number as a whole-dollar USD string, e.g. 54_600_000 → "$54,600,000".
 * Used in the valuation lead's Telegram ping (chat#1798).
 */
export function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}
