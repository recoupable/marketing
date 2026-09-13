import { sumCents } from "./sumCents.ts";
import type { CatalogEntry, DemoFinding, MatchedStatement } from "./types.ts";

export function unmatchedCodeFindings(
  catalog: readonly CatalogEntry[],
  matched: readonly MatchedStatement[],
): DemoFinding[] {
  const codes = new Set(
    matched.filter((row) => row.status === "unmatched").map((row) => row.code),
  );
  return [...codes].map((code) => {
    const affected = matched.filter((row) => row.code === code);
    return {
      id: `unmatched-${code}`,
      kind: "unmatched-code",
      title: "A statement code has no match.",
      summary: `${code} is absent from the supplied catalog.`,
      explanation: `No supplied catalog row uses ${code}. The amount is included in statement totals, but excluded from attributed catalog reporting. A missing match is not evidence that the amount belongs to another work.`,
      nextStep:
        "Request the missing catalog entry or a corrected statement identifier. Keep the amount unattributed until reviewed.",
      sources: [
        ...affected.map((row) => row.source),
        ...catalog.map((entry) => entry.source),
      ],
      heldCents: sumCents(affected),
    };
  });
}
