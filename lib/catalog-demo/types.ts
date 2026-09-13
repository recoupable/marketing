import type { northstarFixture } from "./northstarFixture.ts";

export type SourceName = keyof typeof northstarFixture.sources;
export type CatalogFixture = {
  catalogName: string;
  disclaimer: string;
  sources: Record<SourceName, readonly string[]>;
};
export type SourceReference = { file: SourceName; line: number; text: string };
export type CatalogEntry = {
  entryId: string;
  code: string;
  title: string;
  artist: string;
  source: SourceReference;
};
export type StatementRow = {
  period: string;
  code: string;
  amountCents: number;
  currency: "USD";
  source: SourceReference;
};
export type MatchedStatement = StatementRow & {
  status: "attributed" | "ambiguous" | "unmatched";
  candidates: CatalogEntry[];
};
export type DemoFinding = {
  id: string;
  kind: "conflicting-code" | "unmatched-code" | "missing-period";
  title: string;
  summary: string;
  explanation: string;
  nextStep: string;
  sources: SourceReference[];
  heldCents: number;
};
export type PeriodSummary = {
  period: string;
  receivedCents: number;
  attributedCents: number;
  heldCents: number;
  rows: MatchedStatement[];
};
