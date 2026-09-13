import { sumCents } from "./sumCents.ts";
import type { MatchedStatement, PeriodSummary } from "./types.ts";

export function summarizePeriods(
  suppliedPeriods: readonly string[],
  matched: readonly MatchedStatement[],
): PeriodSummary[] {
  return suppliedPeriods.map((period) => {
    const rows = matched.filter((row) => row.period === period);
    return {
      period,
      receivedCents: sumCents(rows),
      attributedCents: sumCents(
        rows.filter((row) => row.status === "attributed"),
      ),
      heldCents: sumCents(rows.filter((row) => row.status !== "attributed")),
      rows,
    };
  });
}
