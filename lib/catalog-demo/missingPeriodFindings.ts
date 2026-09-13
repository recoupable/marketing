import type { DemoFinding, SourceReference, StatementRow } from "./types.ts";

export function missingPeriodFindings(
  required: { periods: string[]; source: SourceReference },
  suppliedPeriods: readonly string[],
  statements: readonly StatementRow[],
): DemoFinding[] {
  return required.periods
    .filter((period) => !suppliedPeriods.includes(period))
    .map((period) => ({
      id: `missing-${period}`,
      kind: "missing-period",
      title: `${period} is still missing.`,
      summary: "The requested source coverage is incomplete.",
      explanation: `The deal notes request ${required.periods.join(", ")}. ${suppliedPeriods.length ? `The supplied statement contains ${suppliedPeriods.join(" and ")} only.` : "No statement has been supplied."} No amount has been invented for ${period}.`,
      nextStep: `Request the ${period} statement before treating the requested review period as complete.`,
      sources: [required.source, ...statements.map((row) => row.source)],
      heldCents: 0,
    }));
}
