/** Compact follower count: 113_000_000 → "113M", 1_200_000 → "1.2M", 45_000 → "45K". */
export function formatFollowers(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (n >= 1_000) {
    const k = Math.round(n / 1_000);
    // 999_500+ rounds to 1000K → roll up to "1M" instead.
    return k >= 1_000 ? "1M" : `${k}K`;
  }
  return String(n);
}
