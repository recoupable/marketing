import { sourceReference } from "./sourceReference.ts";
import type { CatalogFixture, SourceReference } from "./types.ts";

/** The deal notes state which statement periods the review must cover, each once. */
export function readRequiredPeriods(fixture: CatalogFixture): {
  periods: string[];
  source: SourceReference;
} {
  const notes = fixture.sources["deal_notes.txt"];
  const line = notes.findIndex((entry) =>
    entry.startsWith("required_periods="),
  );
  if (line === -1)
    throw new Error("Required periods must be stated in the source notes.");
  const periods = notes[line].slice("required_periods=".length).split("|");
  const wellFormed = periods.every((period) => /^\d{4}-Q[1-4]$/.test(period));
  if (!wellFormed || new Set(periods).size !== periods.length)
    throw new Error("Invalid required periods.");
  return {
    periods,
    source: sourceReference(fixture, "deal_notes.txt", line + 1),
  };
}
