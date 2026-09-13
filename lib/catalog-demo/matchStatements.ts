import type { CatalogEntry, MatchedStatement, StatementRow } from "./types.ts";

/** A statement row is attributed only when exactly one catalog entry carries its code. */
export function matchStatements(
  statements: readonly StatementRow[],
  byCode: Map<string, CatalogEntry[]>,
): MatchedStatement[] {
  return statements.map((row) => {
    const candidates = byCode.get(row.code) ?? [];
    return {
      ...row,
      candidates,
      status:
        candidates.length === 1
          ? "attributed"
          : candidates.length === 0
            ? "unmatched"
            : "ambiguous",
    };
  });
}
