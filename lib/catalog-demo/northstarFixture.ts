/** A deliberately small, synthetic source bundle. Every visible number is derived from it. */
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
