import { describe, it, expect } from "vitest";
import { computeCatalogValuation } from "../computeCatalogValuation";
import fixture from "./fixtures/valuation-golden.json";

/**
 * Cross-repo divergence guard (recoupable/chat#1850): the valuation model is
 * implemented twice — here and in recoupable/api
 * (lib/catalog/computeValuationBand.ts). This fixture's twin lives at
 * api/lib/catalog/__tests__/fixtures/valuation-golden.json and the two JSON
 * files must stay byte-identical. If this test fails, the marketing model has
 * drifted from the shared formula: fix the code, or change the fixture in
 * BOTH repos in the same coordinated change. The fixture's `mid` maps to this
 * repo's `central` band key.
 */
describe("computeCatalogValuation golden fixture", () => {
  it.each(fixture.cases)("$name", ({ input, expected }) => {
    const { valueBand, catalogAgeYears } = computeCatalogValuation({
      totalStreams: input.totalStreams,
      earliestReleaseDate: input.earliestReleaseDate,
      now: new Date(input.now),
    });

    expect(catalogAgeYears).toBe(expected.catalogAgeYears);
    // Fixture values are rounded to the cent; assert to within one cent.
    expect(Math.abs(valueBand.low - expected.low)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(valueBand.central - expected.mid)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(valueBand.high - expected.high)).toBeLessThanOrEqual(0.01);
  });
});
