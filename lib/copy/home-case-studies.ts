export const homeCaseStudiesCopy = {
  eyebrow: "CASE STUDIES",
  title: "What we’ve built.",
  allLabel: "All case studies",
  readLabel: "Read case study",
  disclosure: "Anonymized client work. Illustrations contain no client data.",
  projects: [
    {
      id: "royalty-example",
      title: "Royalty reporting",
      audience: "Finance & operations",
      story: "A repeatable workbook comparing royalty statements with receipts, with source records behind flagged differences.",
      visual: "royalty",
      href: "/case-studies/royalty-reporting",
    },
    {
      id: "acquisition-example",
      title: "Investment review",
      audience: "Music investment",
      story: "A diligence draft assembled from models, notes, and emails for an analyst to check and edit.",
      visual: "investment",
      href: "/case-studies/investment-review",
    },
    {
      id: "catalog-intelligence",
      title: "Catalog intelligence",
      audience: "Catalog & creative",
      story: "Recurring briefs flag period changes, data issues, and questions for the team to investigate.",
      visual: "catalog",
      href: "/case-studies/catalog-intelligence",
    },
  ],
} as const;
