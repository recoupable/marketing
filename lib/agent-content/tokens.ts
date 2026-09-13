const stopWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "to",
  "of",
  "in",
  "on",
  "at",
  "with",
  "from",
  "is",
  "are",
  "be",
  "do",
  "does",
  "can",
  "could",
  "would",
  "should",
  "i",
  "we",
  "you",
  "my",
  "our",
  "your",
  "how",
  "what",
  "where",
  "which",
  "me",
  "about",
  "help",
  "get",
]);
const equivalents: Record<string, string> = {
  royalties: "royalty",
  catalogue: "catalog",
  catalogs: "catalog",
  catalogues: "catalog",
  reconciliation: "reconcile",
  reconciling: "reconcile",
  integrate: "integration",
  integrations: "integration",
  integrated: "integration",
  consulting: "consult",
  consultation: "consult",
  consultancy: "consult",
  diligence: "acquisition",
  acquisitions: "acquisition",
  funds: "fund",
  plans: "plan",
  pricing: "price",
  costs: "cost",
  statements: "statement",
  endpoints: "endpoint",
  agents: "agent",
  artists: "artist",
  reports: "report",
  reporting: "report",
  building: "build",
  tools: "tool",
  skills: "skill",
};

export function tokens(text: string): string[] {
  return [
    ...new Set(
      (
        text
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .match(/[a-z0-9]+/g) || []
      )
        .filter((word) => !stopWords.has(word))
        .map((word) => equivalents[word] || word),
    ),
  ];
}
