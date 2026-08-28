/**
 * Plan-card bullet for a monthly credit budget: the dollar amount plus how
 * many scheduled report runs it buys at the median run cost, so a visitor can
 * compare tiers without knowing that credits are dollars. Floors the count so
 * the page never claims more runs than the budget buys.
 */
export function formatCreditsBullet(
  monthlyUsd: number,
  reportRunUsd: number,
): string {
  const runs = Math.max(1, Math.floor(monthlyUsd / reportRunUsd));
  const noun = runs === 1 ? "report run" : "report runs";
  return `$${monthlyUsd.toFixed(2)} in agent credits every month, about ${runs} ${noun}`;
}
