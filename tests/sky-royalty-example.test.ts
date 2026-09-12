import { test, expect } from "vitest";

const { royaltyExample, royaltyExampleRows, royaltyExampleSources, summarizeRoyaltyExample, formatRoyaltyExampleMoney, formatRoyaltyExampleDifference }: typeof import("../lib/sky-royalty-example") = await import(new URL("../lib/sky-royalty-example.ts", import.meta.url).href);

test("a matching grand total retains two offsetting source exceptions", () => {
  expect(royaltyExample.statementCents).toBe(8_460_000);
  expect(royaltyExample.receiptCents).toBe(8_460_000);
  expect(royaltyExample.differenceCents).toBe(0);
  expect(royaltyExample.exceptionCount).toBe(2);
  expect(royaltyExample.sources.map(({ differenceCents }) => differenceCents)).toStrictEqual([-120_000, 120_000, 0]);
});

test("every displayed amount has unique source rows and all rows are accounted for", () => {
  expect(new Set(royaltyExampleRows.map(({ id }) => id)).size).toBe(royaltyExampleRows.length);
  for (const row of royaltyExampleRows) {
    expect(royaltyExampleSources.some(({ id }) => id === row.sourceId)).toBeTruthy();
    expect(Number.isSafeInteger(row.amountCents)).toBeTruthy();
    expect(row.line > 1).toBeTruthy();
  }
  const displayedRows = royaltyExample.sources.flatMap(({ statementRows, receiptRows }) => [...statementRows, ...receiptRows]);
  expect(displayedRows.map(({ id }) => id).sort()).toStrictEqual(royaltyExampleRows.map(({ id }) => id).sort());
  for (const source of royaltyExample.sources) {
    expect(source.statementCents).toBe(source.statementRows.reduce((sum, row) => sum + row.amountCents, 0));
    expect(source.receiptCents).toBe(source.receiptRows.reduce((sum, row) => sum + row.amountCents, 0));
  }
});

test("correcting one receipt changes both its source difference and the grand total", () => {
  const corrected = royaltyExampleRows.map((row) => row.id === "RC-02" ? { ...row, amountCents: 1_600_000 } : row);
  const result = summarizeRoyaltyExample(corrected);
  expect(result.sources[0].differenceCents).toBe(0);
  expect(result.exceptionCount).toBe(1);
  expect(result.differenceCents).toBe(120_000);
  expect(result.receiptCents).toBe(8_580_000);
  expect(result.statementCents).toBe(royaltyExample.statementCents);
});

test("sample amounts and signed differences use consistent dollar formatting", () => {
  expect(formatRoyaltyExampleMoney(8_460_000)).toBe("$84,600");
  expect(formatRoyaltyExampleDifference(-120_000)).toBe("−$1,200");
  expect(formatRoyaltyExampleDifference(120_000)).toBe("+$1,200");
  expect(formatRoyaltyExampleDifference(0)).toBe("$0");
});
