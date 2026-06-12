import { describe, it, expect } from "vitest";
import { computeCatalogValuation } from "../computeCatalogValuation";

describe("computeCatalogValuation", () => {
  it("computes the full band from lifetime streams + catalog age (methodology defaults)", () => {
    // 100M lifetime Spotify plays, catalog ~10 years old
    const v = computeCatalogValuation({
      totalStreams: 100_000_000,
      earliestReleaseDate: "2016-06-12",
      now: new Date("2026-06-12"),
    });

    // annual proxy = 100M / 10y = 10M streams/yr
    expect(v.annualStreamsProxy).toBeCloseTo(10_000_000, -4);
    // spotify gross/yr = 10M × $0.0035 = $35,000
    // total gross band = spotify × (1.25 / 1.40 / 1.60)
    // NLS = gross × 0.85 × 0.75
    // value = NLS × (10 / 13 / 16)
    expect(v.valueBand.low).toBeCloseTo(35_000 * 1.25 * 0.85 * 0.75 * 10, 0);
    expect(v.valueBand.central).toBeCloseTo(35_000 * 1.4 * 0.85 * 0.75 * 13, 0);
    expect(v.valueBand.high).toBeCloseTo(35_000 * 1.6 * 0.85 * 0.75 * 16, 0);
    expect(v.lifetimeNls.central).toBeCloseTo(100_000_000 * 0.0035 * 1.4 * 0.85 * 0.75, 0);
    expect(v.assumptions.spotifyPerStreamUsd).toBe(0.0035);
  });

  it("clamps catalog age to at least one year (new catalogs aren't annualized above lifetime)", () => {
    const v = computeCatalogValuation({
      totalStreams: 1_000_000,
      earliestReleaseDate: "2026-01-01",
      now: new Date("2026-06-12"),
    });

    expect(v.catalogAgeYears).toBe(1);
    expect(v.annualStreamsProxy).toBe(1_000_000);
  });

  it("returns a zero band for zero streams", () => {
    const v = computeCatalogValuation({
      totalStreams: 0,
      earliestReleaseDate: "2020-01-01",
      now: new Date("2026-06-12"),
    });

    expect(v.valueBand).toEqual({ low: 0, central: 0, high: 0 });
  });

  it("tolerates a missing release date (falls back to 5y default age, labeled)", () => {
    const v = computeCatalogValuation({
      totalStreams: 50_000_000,
      earliestReleaseDate: null,
      now: new Date("2026-06-12"),
    });

    expect(v.catalogAgeYears).toBe(5);
    expect(v.assumptions.ageSource).toBe("default_5y");
  });
});
