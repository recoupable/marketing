export type RoyaltyExampleRow = {
  id: string;
  sourceId: string;
  kind: "statement" | "receipt";
  description: string;
  file: string;
  line: number;
  amountCents: number;
};

export const royaltyExampleSources = [
  { id: "harbor", name: "Harbor Distribution", type: "Recorded music", question: "Is the remaining $1,200 still due, or is there a documented deduction?" },
  { id: "beacon", name: "Beacon Publishing", type: "Publishing", question: "Does the extra $1,200 belong to another reporting period?" },
  { id: "northline", name: "Northline Sync", type: "Sync licensing", question: "Both source totals agree. Keep the source records with the report." },
] as const;

// All names, records, and amounts in this demonstration are invented.
export const royaltyExampleRows: readonly RoyaltyExampleRow[] = [
  { id: "ST-01", sourceId: "harbor", kind: "statement", description: "Catalog A", file: "statements_june.csv", line: 2, amountCents: 2_240_000 },
  { id: "ST-02", sourceId: "harbor", kind: "statement", description: "Catalog B", file: "statements_june.csv", line: 3, amountCents: 1_600_000 },
  { id: "RC-01", sourceId: "harbor", kind: "receipt", description: "Catalog A", file: "receipts_june.csv", line: 2, amountCents: 2_240_000 },
  { id: "RC-02", sourceId: "harbor", kind: "receipt", description: "Catalog B", file: "receipts_june.csv", line: 3, amountCents: 1_480_000 },
  { id: "ST-03", sourceId: "beacon", kind: "statement", description: "June royalties", file: "statements_june.csv", line: 4, amountCents: 2_980_000 },
  { id: "RC-03", sourceId: "beacon", kind: "receipt", description: "June payment", file: "receipts_june.csv", line: 4, amountCents: 3_100_000 },
  { id: "ST-04", sourceId: "northline", kind: "statement", description: "June licenses", file: "statements_june.csv", line: 5, amountCents: 1_640_000 },
  { id: "RC-04", sourceId: "northline", kind: "receipt", description: "June payment", file: "receipts_june.csv", line: 5, amountCents: 1_640_000 },
];

export function summarizeRoyaltyExample(rows: readonly RoyaltyExampleRow[] = royaltyExampleRows) {
  const sources = royaltyExampleSources.map((source) => {
    const sourceRows = rows.filter((row) => row.sourceId === source.id);
    const statementRows = sourceRows.filter((row) => row.kind === "statement");
    const receiptRows = sourceRows.filter((row) => row.kind === "receipt");
    const statementCents = statementRows.reduce((sum, row) => sum + row.amountCents, 0);
    const receiptCents = receiptRows.reduce((sum, row) => sum + row.amountCents, 0);
    return { ...source, statementRows, receiptRows, statementCents, receiptCents, differenceCents: receiptCents - statementCents };
  });
  const statementCents = sources.reduce((sum, source) => sum + source.statementCents, 0);
  const receiptCents = sources.reduce((sum, source) => sum + source.receiptCents, 0);
  return {
    sources,
    statementCents,
    receiptCents,
    differenceCents: receiptCents - statementCents,
    exceptionCount: sources.filter((source) => source.differenceCents !== 0).length,
  };
}

export const royaltyExample = summarizeRoyaltyExample();

export function formatRoyaltyExampleMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
}

export function formatRoyaltyExampleDifference(cents: number) {
  return `${cents > 0 ? "+" : cents < 0 ? "−" : ""}${formatRoyaltyExampleMoney(Math.abs(cents))}`;
}
