import assert from "node:assert/strict";
import { test } from "node:test";

const { royaltyExample, royaltyExampleRows, royaltyExampleSources, summarizeRoyaltyExample, formatRoyaltyExampleMoney, formatRoyaltyExampleDifference }: typeof import("../lib/sky-royalty-example") = await import(new URL("../lib/sky-royalty-example.ts", import.meta.url).href);

test("a matching grand total retains two offsetting source exceptions", () => {
  assert.equal(royaltyExample.statementCents, 8_460_000);
  assert.equal(royaltyExample.receiptCents, 8_460_000);
  assert.equal(royaltyExample.differenceCents, 0);
  assert.equal(royaltyExample.exceptionCount, 2);
  assert.deepEqual(royaltyExample.sources.map(({ differenceCents }) => differenceCents), [-120_000, 120_000, 0]);
});

test("every displayed amount has unique source rows and all rows are accounted for", () => {
  assert.equal(new Set(royaltyExampleRows.map(({ id }) => id)).size, royaltyExampleRows.length);
  for (const row of royaltyExampleRows) {
    assert.ok(royaltyExampleSources.some(({ id }) => id === row.sourceId));
    assert.ok(Number.isSafeInteger(row.amountCents));
    assert.ok(row.line > 1);
  }
  const displayedRows = royaltyExample.sources.flatMap(({ statementRows, receiptRows }) => [...statementRows, ...receiptRows]);
  assert.deepEqual(displayedRows.map(({ id }) => id).sort(), royaltyExampleRows.map(({ id }) => id).sort());
  for (const source of royaltyExample.sources) {
    assert.equal(source.statementCents, source.statementRows.reduce((sum, row) => sum + row.amountCents, 0));
    assert.equal(source.receiptCents, source.receiptRows.reduce((sum, row) => sum + row.amountCents, 0));
  }
});

test("correcting one receipt changes both its source difference and the grand total", () => {
  const corrected = royaltyExampleRows.map((row) => row.id === "RC-02" ? { ...row, amountCents: 1_600_000 } : row);
  const result = summarizeRoyaltyExample(corrected);
  assert.equal(result.sources[0].differenceCents, 0);
  assert.equal(result.exceptionCount, 1);
  assert.equal(result.differenceCents, 120_000);
  assert.equal(result.receiptCents, 8_580_000);
  assert.equal(result.statementCents, royaltyExample.statementCents);
});

test("sample amounts and signed differences use consistent dollar formatting", () => {
  assert.equal(formatRoyaltyExampleMoney(8_460_000), "$84,600");
  assert.equal(formatRoyaltyExampleDifference(-120_000), "−$1,200");
  assert.equal(formatRoyaltyExampleDifference(120_000), "+$1,200");
  assert.equal(formatRoyaltyExampleDifference(0), "$0");
});
