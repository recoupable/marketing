import { sumCents } from "./sumCents.ts";
import type { CatalogEntry, DemoFinding, MatchedStatement } from "./types.ts";

export function conflictingCodeFindings(
  byCode: Map<string, CatalogEntry[]>,
  matched: readonly MatchedStatement[],
): DemoFinding[] {
  const findings: DemoFinding[] = [];
  for (const [code, entries] of byCode) {
    if (entries.length < 2) continue;
    const affected = matched.filter((row) => row.code === code);
    findings.push({
      id: `conflicting-${code}`,
      kind: "conflicting-code",
      title: `One code. ${entries.length} catalog entries.`,
      summary: `${code} cannot be attributed automatically.`,
      explanation: `${code} appears on ${entries.length} catalog rows. The statement provides only that code, so it cannot distinguish these entries. All affected statement amounts remain unattributed.`,
      nextStep:
        "Ask the catalog team to confirm the correct identifier for each entry, then rerun the match.",
      sources: [
        ...entries.map((entry) => entry.source),
        ...affected.map((row) => row.source),
      ],
      heldCents: sumCents(affected),
    });
  }
  return findings;
}
