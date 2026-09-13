import { conflictingCodeFindings } from "./conflictingCodeFindings.ts";
import { groupCatalogByCode } from "./groupCatalogByCode.ts";
import { matchStatements } from "./matchStatements.ts";
import { missingPeriodFindings } from "./missingPeriodFindings.ts";
import { northstarFixture } from "./northstarFixture.ts";
import { parseCatalog } from "./parseCatalog.ts";
import { parseStatements } from "./parseStatements.ts";
import { readRequiredPeriods } from "./readRequiredPeriods.ts";
import { summarizePeriods } from "./summarizePeriods.ts";
import type { CatalogFixture } from "./types.ts";
import { unmatchedCodeFindings } from "./unmatchedCodeFindings.ts";

export function analyzeCatalogDemo(fixture: CatalogFixture = northstarFixture) {
  const catalog = parseCatalog(fixture);
  const statements = parseStatements(fixture);
  const required = readRequiredPeriods(fixture);
  const byCode = groupCatalogByCode(catalog);
  const matched = matchStatements(statements, byCode);
  const suppliedPeriods = [
    ...new Set(statements.map((row) => row.period)),
  ].sort();
  const missingPeriods = required.periods.filter(
    (period) => !suppliedPeriods.includes(period),
  );
  const findings = [
    ...conflictingCodeFindings(byCode, matched),
    ...unmatchedCodeFindings(catalog, matched),
    ...missingPeriodFindings(required, suppliedPeriods, statements),
  ];
  const periods = summarizePeriods(suppliedPeriods, matched);
  const current = periods.at(-1);
  const prior = periods.at(-2);
  const attributedDeltaCents =
    current && prior ? current.attributedCents - prior.attributedCents : null;
  const attributedDeltaRate =
    current && prior && prior.attributedCents !== 0
      ? (current.attributedCents - prior.attributedCents) /
        prior.attributedCents
      : null;
  return {
    catalog,
    statements,
    matched,
    requiredPeriods: required.periods,
    suppliedPeriods,
    missingPeriods,
    findings,
    periods,
    current,
    prior,
    attributedDeltaCents,
    attributedDeltaRate,
  };
}
