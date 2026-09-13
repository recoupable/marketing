import { sourceReference } from "./sourceReference.ts";
import { sourceRows } from "./sourceRows.ts";
import type { CatalogFixture, StatementRow } from "./types.ts";

export function parseStatements(fixture: CatalogFixture): StatementRow[] {
  return sourceRows(
    fixture,
    "royalty_statement.csv",
    "period,catalog_code,amount_cents,currency",
  ).map(([period, code, amount, currency], index) => {
    if (
      !/^\d{4}-Q[1-4]$/.test(period) ||
      !/^-?\d+$/.test(amount) ||
      currency !== "USD"
    ) {
      throw new Error(
        "Invalid period, integer cents or currency in synthetic statement.",
      );
    }
    const amountCents = Number(amount);
    if (!Number.isSafeInteger(amountCents))
      throw new Error("Money must be safe integer cents.");
    return {
      period,
      code,
      amountCents,
      currency,
      source: sourceReference(fixture, "royalty_statement.csv", index + 2),
    };
  });
}
