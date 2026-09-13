import { test, expect } from "vitest";

import { analyzeCatalogDemo } from "../lib/catalog-demo/analyzeCatalogDemo.ts";
import { createDemoReviewPacket } from "../lib/catalog-demo/createDemoReviewPacket.ts";
import { demoSummary } from "../lib/catalog-demo/demoSummary.ts";
import { formatDemoMoney } from "../lib/catalog-demo/formatDemoMoney.ts";
import { northstarFixture } from "../lib/catalog-demo/northstarFixture.ts";

function fixture() {
  return {
    ...northstarFixture,
    sources: {
      "catalog.csv": [...northstarFixture.sources["catalog.csv"]] as string[],
      "royalty_statement.csv": [
        ...northstarFixture.sources["royalty_statement.csv"],
      ] as string[],
      "deal_notes.txt": [
        ...northstarFixture.sources["deal_notes.txt"],
      ] as string[],
    },
  };
}

test("accounts for every statement cent while excluding ambiguous and unmatched attribution", () => {
  const result = analyzeCatalogDemo();
  expect(result.periods.map(
      ({ period, receivedCents, attributedCents, heldCents }) => ({
        period,
        receivedCents,
        attributedCents,
        heldCents,
      }),
    )).toStrictEqual([
      {
        period: "2025-Q1",
        receivedCents: 1_200_000,
        attributedCents: 1_100_000,
        heldCents: 100_000,
      },
      {
        period: "2025-Q2",
        receivedCents: 1_400_000,
        attributedCents: 1_270_000,
        heldCents: 130_000,
      },
    ]);
  for (const period of result.periods) {
    expect(period.receivedCents).toBe(period.attributedCents + period.heldCents);
    expect(period.rows.length).toBe(4);
  }
  expect(result.attributedDeltaCents).toBe(170_000);
  expect(Math.abs(result.attributedDeltaRate! - 0.15454545454545454) < 1e-12).toBeTruthy();
  expect(demoSummary.catalogRowCount).toBe(4);
  expect(demoSummary.distinctCatalogCodeCount).toBe(3);
  expect(demoSummary.acquisitionFindingCount).toBe(3);
});

test("never chooses an arbitrary duplicate or double counts its statement amounts", () => {
  const result = analyzeCatalogDemo();
  const conflicting = result.matched.filter((row) => row.code === "NS-003");
  expect(conflicting.length).toBe(2);
  expect(conflicting.every(
      (row) => row.status === "ambiguous" && row.candidates.length === 2,
    )).toBeTruthy();
  const changed = fixture();
  changed.sources["catalog.csv"][4] =
    "C-004,NS-004,Afterglow (Instrumental),June Assembly";
  const fixed = analyzeCatalogDemo(changed);
  expect(fixed.current?.receivedCents).toBe(1_400_000);
  expect(fixed.current?.attributedCents).toBe(1_360_000);
  expect(fixed.current?.heldCents).toBe(40_000);
  expect(fixed.findings.some((finding) => finding.kind === "conflicting-code")).toBe(false);
  expect(fixed.findings.length).toBe(2);
});

test("resolving an unmatched code changes attribution but never changes received totals", () => {
  const changed = fixture();
  changed.sources["catalog.csv"].push("C-005,NS-999,Signal Home,Paper Cities");
  const fixed = analyzeCatalogDemo(changed);
  expect(fixed.current?.receivedCents).toBe(1_400_000);
  expect(fixed.current?.attributedCents).toBe(1_310_000);
  expect(fixed.current?.heldCents).toBe(90_000);
  expect(fixed.findings.some((finding) => finding.kind === "unmatched-code")).toBe(false);
});

test("required coverage comes from notes and remains separate from available-period reporting", () => {
  const result = analyzeCatalogDemo();
  expect(result.missingPeriods).toStrictEqual(["2025-Q3"]);
  expect(result.suppliedPeriods).toStrictEqual(["2025-Q1", "2025-Q2"]);
  const changed = fixture();
  changed.sources["deal_notes.txt"][1] = "required_periods=2025-Q1|2025-Q2";
  const revisedScope = analyzeCatalogDemo(changed);
  expect(revisedScope.missingPeriods).toStrictEqual([]);
  expect(revisedScope.findings.length).toBe(2);
  expect(revisedScope.current?.receivedCents).toBe(result.current?.receivedCents);
});

test("both packets preserve every unresolved item and citations point to exact input lines", () => {
  for (const direction of ["acquisitions", "operations"] as const) {
    const packet = JSON.parse(
      JSON.stringify(createDemoReviewPacket(direction)),
    );
    expect(packet.example).toBe("synthetic");
    expect(packet.unresolvedItems.length).toBe(3);
    expect(packet.unresolvedItems
        .map((finding: { kind: string }) => finding.kind)
        .sort()).toStrictEqual(["conflicting-code", "missing-period", "unmatched-code"]);
    for (const finding of packet.unresolvedItems) {
      expect(finding.sources.length > 0).toBeTruthy();
      for (const source of finding.sources) {
        expect(packet.sources[source.file][source.line - 1]).toBe(source.text);
      }
    }
    const heldFromFindings = packet.unresolvedItems.reduce(
      (sum: number, finding: { heldCents: number }) => sum + finding.heldCents,
      0,
    );
    expect(heldFromFindings).toBe(230_000);
    expect(heldFromFindings).toBe(packet.periods.reduce(
        (sum: number, period: { heldCents: number }) => sum + period.heldCents,
        0,
      ));
  }
});

test("integer-cent changes and negative adjustments reconcile without decimal drift", () => {
  const changed = fixture();
  changed.sources["royalty_statement.csv"].push("2025-Q2,NS-001,-101,USD");
  const result = analyzeCatalogDemo(changed);
  expect(result.current?.receivedCents).toBe(1_399_899);
  expect(result.current?.attributedCents).toBe(1_269_899);
  expect(result.current?.heldCents).toBe(130_000);
  expect(formatDemoMoney(101)).toBe("$1.01");
  expect(formatDemoMoney(1_400_000)).toBe("$14,000");
  expect(() => formatDemoMoney(100.5)).toThrow(/integer cents/);
});

test("a zero attributed baseline does not invent a percentage change", () => {
  const changed = fixture();
  changed.sources["royalty_statement.csv"][1] = "2025-Q1,NS-001,0,USD";
  changed.sources["royalty_statement.csv"][2] = "2025-Q1,NS-002,0,USD";
  const result = analyzeCatalogDemo(changed);
  expect(result.attributedDeltaCents).toBe(1_270_000);
  expect(result.attributedDeltaRate).toBe(null);
});

test("rejects unsupported currency, fractional cents and unsafe amounts", () => {
  for (const row of [
    "2025-Q2,NS-001,100,EUR",
    "2025-Q2,NS-001,1.25,USD",
    "2025-Q2,NS-001,9007199254740992,USD",
  ]) {
    const changed = fixture();
    changed.sources["royalty_statement.csv"].push(row);
    expect(() => analyzeCatalogDemo(changed)).toThrow();
  }
});
