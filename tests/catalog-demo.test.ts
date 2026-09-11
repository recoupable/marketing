import assert from "node:assert/strict";
import { test } from "node:test";

const {
  analyzeCatalogDemo,
  createDemoReviewPacket,
  demoSummary,
  formatDemoMoney,
  northstarFixture,
}: typeof import("../lib/catalog-demo") = await import(
  new URL("../lib/catalog-demo.ts", import.meta.url).href
);

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
  assert.deepEqual(
    result.periods.map(
      ({ period, receivedCents, attributedCents, heldCents }) => ({
        period,
        receivedCents,
        attributedCents,
        heldCents,
      }),
    ),
    [
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
    ],
  );
  for (const period of result.periods) {
    assert.equal(
      period.receivedCents,
      period.attributedCents + period.heldCents,
    );
    assert.equal(period.rows.length, 4);
  }
  assert.equal(result.attributedDeltaCents, 170_000);
  assert.ok(
    Math.abs(result.attributedDeltaRate! - 0.15454545454545454) < 1e-12,
  );
  assert.equal(demoSummary.catalogRowCount, 4);
  assert.equal(demoSummary.distinctCatalogCodeCount, 3);
  assert.equal(demoSummary.acquisitionFindingCount, 3);
});

test("never chooses an arbitrary duplicate or double counts its statement amounts", () => {
  const result = analyzeCatalogDemo();
  const conflicting = result.matched.filter((row) => row.code === "NS-003");
  assert.equal(conflicting.length, 2);
  assert.ok(
    conflicting.every(
      (row) => row.status === "ambiguous" && row.candidates.length === 2,
    ),
  );
  const changed = fixture();
  changed.sources["catalog.csv"][4] =
    "C-004,NS-004,Afterglow (Instrumental),June Assembly";
  const fixed = analyzeCatalogDemo(changed);
  assert.equal(fixed.current?.receivedCents, 1_400_000);
  assert.equal(fixed.current?.attributedCents, 1_360_000);
  assert.equal(fixed.current?.heldCents, 40_000);
  assert.equal(
    fixed.findings.some((finding) => finding.kind === "conflicting-code"),
    false,
  );
  assert.equal(fixed.findings.length, 2);
});

test("resolving an unmatched code changes attribution but never changes received totals", () => {
  const changed = fixture();
  changed.sources["catalog.csv"].push("C-005,NS-999,Signal Home,Paper Cities");
  const fixed = analyzeCatalogDemo(changed);
  assert.equal(fixed.current?.receivedCents, 1_400_000);
  assert.equal(fixed.current?.attributedCents, 1_310_000);
  assert.equal(fixed.current?.heldCents, 90_000);
  assert.equal(
    fixed.findings.some((finding) => finding.kind === "unmatched-code"),
    false,
  );
});

test("required coverage comes from notes and remains separate from available-period reporting", () => {
  const result = analyzeCatalogDemo();
  assert.deepEqual(result.missingPeriods, ["2025-Q3"]);
  assert.deepEqual(result.suppliedPeriods, ["2025-Q1", "2025-Q2"]);
  const changed = fixture();
  changed.sources["deal_notes.txt"][1] = "required_periods=2025-Q1|2025-Q2";
  const revisedScope = analyzeCatalogDemo(changed);
  assert.deepEqual(revisedScope.missingPeriods, []);
  assert.equal(revisedScope.findings.length, 2);
  assert.equal(
    revisedScope.current?.receivedCents,
    result.current?.receivedCents,
  );
});

test("both packets preserve every unresolved item and citations point to exact input lines", () => {
  for (const direction of ["acquisitions", "operations"] as const) {
    const packet = JSON.parse(
      JSON.stringify(createDemoReviewPacket(direction)),
    );
    assert.equal(packet.example, "synthetic");
    assert.equal(packet.unresolvedItems.length, 3);
    assert.deepEqual(
      packet.unresolvedItems
        .map((finding: { kind: string }) => finding.kind)
        .sort(),
      ["conflicting-code", "missing-period", "unmatched-code"],
    );
    for (const finding of packet.unresolvedItems) {
      assert.ok(finding.sources.length > 0);
      for (const source of finding.sources) {
        assert.equal(packet.sources[source.file][source.line - 1], source.text);
      }
    }
    const heldFromFindings = packet.unresolvedItems.reduce(
      (sum: number, finding: { heldCents: number }) => sum + finding.heldCents,
      0,
    );
    assert.equal(heldFromFindings, 230_000);
    assert.equal(
      heldFromFindings,
      packet.periods.reduce(
        (sum: number, period: { heldCents: number }) => sum + period.heldCents,
        0,
      ),
    );
  }
});

test("integer-cent changes and negative adjustments reconcile without decimal drift", () => {
  const changed = fixture();
  changed.sources["royalty_statement.csv"].push("2025-Q2,NS-001,-101,USD");
  const result = analyzeCatalogDemo(changed);
  assert.equal(result.current?.receivedCents, 1_399_899);
  assert.equal(result.current?.attributedCents, 1_269_899);
  assert.equal(result.current?.heldCents, 130_000);
  assert.equal(formatDemoMoney(101), "$1.01");
  assert.equal(formatDemoMoney(1_400_000), "$14,000");
  assert.throws(() => formatDemoMoney(100.5), /integer cents/);
});

test("a zero attributed baseline does not invent a percentage change", () => {
  const changed = fixture();
  changed.sources["royalty_statement.csv"][1] = "2025-Q1,NS-001,0,USD";
  changed.sources["royalty_statement.csv"][2] = "2025-Q1,NS-002,0,USD";
  const result = analyzeCatalogDemo(changed);
  assert.equal(result.attributedDeltaCents, 1_270_000);
  assert.equal(result.attributedDeltaRate, null);
});

test("rejects unsupported currency, fractional cents and unsafe amounts", () => {
  for (const row of [
    "2025-Q2,NS-001,100,EUR",
    "2025-Q2,NS-001,1.25,USD",
    "2025-Q2,NS-001,9007199254740992,USD",
  ]) {
    const changed = fixture();
    changed.sources["royalty_statement.csv"].push(row);
    assert.throws(() => analyzeCatalogDemo(changed));
  }
});
