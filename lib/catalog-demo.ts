/** A deliberately small, synthetic source bundle. Every visible number is derived below. */
export const northstarFixture = {
  catalogName: "Northstar Catalog",
  disclaimer:
    "Fictional names, dates and amounts. This is synthetic data, not a client project.",
  sources: {
    "catalog.csv": [
      "entry_id,catalog_code,title,artist",
      "C-001,NS-001,Northbound,The Still Hours",
      "C-002,NS-002,Late Hours,The Still Hours",
      "C-003,NS-003,Afterglow,June Assembly",
      "C-004,NS-003,Afterglow (Instrumental),June Assembly",
    ],
    "royalty_statement.csv": [
      "period,catalog_code,amount_cents,currency",
      "2025-Q1,NS-001,620000,USD",
      "2025-Q1,NS-002,480000,USD",
      "2025-Q1,NS-003,75000,USD",
      "2025-Q1,NS-999,25000,USD",
      "2025-Q2,NS-001,720000,USD",
      "2025-Q2,NS-002,550000,USD",
      "2025-Q2,NS-003,90000,USD",
      "2025-Q2,NS-999,40000,USD",
    ],
    "deal_notes.txt": [
      "SYNTHETIC EXAMPLE: fictional Northstar Catalog; all dates and amounts invented.",
      "required_periods=2025-Q1|2025-Q2|2025-Q3",
      "Match statements by catalog_code only when exactly one catalog entry exists.",
      "Hold ambiguous and unmatched rows separately. Never infer an owner or a match.",
      "Review scope: source coverage and reporting checks. No valuation or investment recommendation.",
    ],
  },
} as const;

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

export function formatDemoMoney(cents: number): string {
  if (!Number.isSafeInteger(cents))
    throw new Error("Money must be safe integer cents.");
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function reference(
  fixture: CatalogFixture,
  file: SourceName,
  line: number,
): SourceReference {
  const text = fixture.sources[file][line - 1];
  if (text === undefined) throw new Error(`Missing source: ${file}:${line}`);
  return { file, line, text };
}

// This fixture uses unquoted CSV without commas inside fields. It is not an upload parser.
function sourceRows(
  fixture: CatalogFixture,
  file: SourceName,
  header: string,
): string[][] {
  const lines = fixture.sources[file];
  if (lines[0] !== header) throw new Error(`Unexpected header in ${file}.`);
  const width = header.split(",").length;
  return lines.slice(1).map((line) => {
    const fields = line.split(",");
    if (fields.length !== width || fields.some((field) => !field)) {
      throw new Error(`Invalid fixture row in ${file}.`);
    }
    return fields;
  });
}

function sumCents(rows: readonly { amountCents: number }[]): number {
  const total = rows.reduce((sum, row) => sum + row.amountCents, 0);
  if (!Number.isSafeInteger(total))
    throw new Error("Statement total exceeds safe integer cents.");
  return total;
}

export function analyzeCatalogDemo(fixture: CatalogFixture = northstarFixture) {
  const catalog: CatalogEntry[] = sourceRows(
    fixture,
    "catalog.csv",
    "entry_id,catalog_code,title,artist",
  ).map(([entryId, code, title, artist], index) => ({
    entryId,
    code,
    title,
    artist,
    source: reference(fixture, "catalog.csv", index + 2),
  }));
  const statements: StatementRow[] = sourceRows(
    fixture,
    "royalty_statement.csv",
    "period,catalog_code,amount_cents,currency",
  ).map(([period, code, amount, currency], index) => {
    if (
      !/^\d{4}-Q[1-4]$/.test(period) ||
      !/^-?\d+$/.test(amount) ||
      currency !== "USD"
    ) {
      throw new Error(
        "Invalid period, integer cents or currency in synthetic statement.",
      );
    }
    const amountCents = Number(amount);
    if (!Number.isSafeInteger(amountCents))
      throw new Error("Money must be safe integer cents.");
    return {
      period,
      code,
      amountCents,
      currency,
      source: reference(fixture, "royalty_statement.csv", index + 2),
    };
  });
  const requiredLine = fixture.sources["deal_notes.txt"].findIndex((line) =>
    line.startsWith("required_periods="),
  );
  if (requiredLine === -1)
    throw new Error("Required periods must be stated in the source notes.");
  const requiredPeriods = fixture.sources["deal_notes.txt"][requiredLine]
    .slice("required_periods=".length)
    .split("|");
  if (requiredPeriods.some((period) => !/^\d{4}-Q[1-4]$/.test(period)))
    throw new Error("Invalid required periods.");
  const byCode = new Map<string, CatalogEntry[]>();
  for (const entry of catalog)
    byCode.set(entry.code, [...(byCode.get(entry.code) ?? []), entry]);
  const matched: MatchedStatement[] = statements.map((row) => {
    const candidates = byCode.get(row.code) ?? [];
    return {
      ...row,
      candidates,
      status:
        candidates.length === 1
          ? "attributed"
          : candidates.length === 0
            ? "unmatched"
            : "ambiguous",
    };
  });
  const suppliedPeriods = [
    ...new Set(statements.map((row) => row.period)),
  ].sort();
  const missingPeriods = requiredPeriods.filter(
    (period) => !suppliedPeriods.includes(period),
  );
  const findings: DemoFinding[] = [];
  for (const [code, entries] of byCode) {
    if (entries.length < 2) continue;
    const affected = matched.filter((row) => row.code === code);
    findings.push({
      id: `conflicting-${code}`,
      kind: "conflicting-code",
      title: `One code. ${entries.length} catalog entries.`,
      summary: `${code} cannot be attributed automatically.`,
      explanation: `${code} appears on ${entries.length} catalog rows. The statement provides only that code, so it cannot distinguish these entries. All affected statement amounts remain unattributed.`,
      nextStep:
        "Ask the catalog team to confirm the correct identifier for each entry, then rerun the match.",
      sources: [
        ...entries.map((entry) => entry.source),
        ...affected.map((row) => row.source),
      ],
      heldCents: sumCents(affected),
    });
  }
  for (const code of new Set(
    matched.filter((row) => row.status === "unmatched").map((row) => row.code),
  )) {
    const affected = matched.filter((row) => row.code === code);
    findings.push({
      id: `unmatched-${code}`,
      kind: "unmatched-code",
      title: "A statement code has no match.",
      summary: `${code} is absent from the supplied catalog.`,
      explanation: `No supplied catalog row uses ${code}. The amount is included in statement totals, but excluded from attributed catalog reporting. A missing match is not evidence that the amount belongs to another work.`,
      nextStep:
        "Request the missing catalog entry or a corrected statement identifier. Keep the amount unattributed until reviewed.",
      sources: [
        ...affected.map((row) => row.source),
        ...catalog.map((entry) => entry.source),
      ],
      heldCents: sumCents(affected),
    });
  }
  for (const period of missingPeriods) {
    findings.push({
      id: `missing-${period}`,
      kind: "missing-period",
      title: `${period} is still missing.`,
      summary: "The requested source coverage is incomplete.",
      explanation: `The deal notes request ${requiredPeriods.join(", ")}. The supplied statement contains ${suppliedPeriods.join(" and ")} only. No amount has been invented for ${period}.`,
      nextStep: `Request the ${period} statement before treating the requested review period as complete.`,
      sources: [
        reference(fixture, "deal_notes.txt", requiredLine + 1),
        ...statements.map((row) => row.source),
      ],
      heldCents: 0,
    });
  }
  const periods = suppliedPeriods.map((period) => {
    const rows = matched.filter((row) => row.period === period);
    return {
      period,
      receivedCents: sumCents(rows),
      attributedCents: sumCents(
        rows.filter((row) => row.status === "attributed"),
      ),
      heldCents: sumCents(rows.filter((row) => row.status !== "attributed")),
      rows,
    };
  });
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
    requiredPeriods,
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

export const catalogDemo = analyzeCatalogDemo();
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

export function createDemoReviewPacket(
  direction: "acquisitions" | "operations",
  fixture: CatalogFixture = northstarFixture,
) {
  const result = analyzeCatalogDemo(fixture);
  return {
    schemaVersion: 1,
    example: "synthetic",
    catalogName: fixture.catalogName,
    disclaimer: fixture.disclaimer,
    direction,
    currency: "USD",
    amountUnit: "integer cents",
    scope:
      direction === "acquisitions"
        ? "Source coverage and identifier checks. No valuation or investment recommendation."
        : "Comparison of supplied statement periods only. Unresolved rows are excluded from attributed totals and included in statement totals.",
    sources: fixture.sources,
    coverage: {
      requiredPeriods: result.requiredPeriods,
      suppliedPeriods: result.suppliedPeriods,
      missingPeriods: result.missingPeriods,
    },
    periods: result.periods,
    attributedDeltaCents: result.attributedDeltaCents,
    attributedDeltaRate: result.attributedDeltaRate,
    unresolvedItems: result.findings,
    rules: [
      "Attribute only when exactly one catalog row matches catalog_code.",
      "Hold all ambiguous and unmatched statement rows; never choose a duplicate silently.",
      "Statement total = attributed total + unattributed total for every supplied period.",
      "Missing periods stay missing; comparison does not assert complete diligence coverage.",
    ],
  };
}
