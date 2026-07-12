/**
 * Compact USD for valuation display: $1.2M / $450K / $660.
 *
 * @param n - Dollar amount
 */
export function formatUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}
