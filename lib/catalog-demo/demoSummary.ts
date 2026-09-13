import { catalogDemo } from "./catalogDemo.ts";
import { northstarFixture } from "./northstarFixture.ts";

export const demoSummary = {
  catalogName: northstarFixture.catalogName,
  catalogRowCount: catalogDemo.catalog.length,
  distinctCatalogCodeCount: new Set(
    catalogDemo.catalog.map((entry) => entry.code),
  ).size,
  sourceCount: Object.keys(northstarFixture.sources).length,
  suppliedPeriodCount: catalogDemo.suppliedPeriods.length,
  requiredPeriodCount: catalogDemo.requiredPeriods.length,
  acquisitionFindingCount: catalogDemo.findings.length,
  currentReceivedCents: catalogDemo.current?.receivedCents ?? 0,
  currentAttributedCents: catalogDemo.current?.attributedCents ?? 0,
  currentHeldCents: catalogDemo.current?.heldCents ?? 0,
  priorAttributedCents: catalogDemo.prior?.attributedCents ?? 0,
  attributedDeltaCents: catalogDemo.attributedDeltaCents ?? 0,
};
