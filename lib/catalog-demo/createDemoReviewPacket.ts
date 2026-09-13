import { analyzeCatalogDemo } from "./analyzeCatalogDemo.ts";
import { northstarFixture } from "./northstarFixture.ts";
import type { CatalogFixture } from "./types.ts";

export function createDemoReviewPacket(
  direction: "acquisitions" | "operations",
  fixture: CatalogFixture = northstarFixture,
) {
  const result = analyzeCatalogDemo(fixture);
  return {
    schemaVersion: 1,
    example: "synthetic",
    catalogName: fixture.catalogName,
    disclaimer: fixture.disclaimer,
    direction,
    currency: "USD",
    amountUnit: "integer cents",
    scope:
      direction === "acquisitions"
        ? "Source coverage and identifier checks. No valuation or investment recommendation."
        : "Comparison of supplied statement periods only. Unresolved rows are excluded from attributed totals and included in statement totals.",
    sources: fixture.sources,
    coverage: {
      requiredPeriods: result.requiredPeriods,
      suppliedPeriods: result.suppliedPeriods,
      missingPeriods: result.missingPeriods,
    },
    periods: result.periods,
    attributedDeltaCents: result.attributedDeltaCents,
    attributedDeltaRate: result.attributedDeltaRate,
    unresolvedItems: result.findings,
    rules: [
      "Attribute only when exactly one catalog row matches catalog_code.",
      "Hold all ambiguous and unmatched statement rows; never choose a duplicate silently.",
      "Statement total = attributed total + unattributed total for every supplied period.",
      "Missing periods stay missing; comparison does not assert complete diligence coverage.",
    ],
  };
}
