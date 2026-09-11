export type DirectionId = "acquisitions" | "operations";

type CatalogDirection = {
  name: string;
  heroLines: [string, string];
  description: string;
  primaryCta: string;
  outputs: { title: string; description: string }[];
  interestOptions: string[];
};

export const catalogDirections: Record<DirectionId, CatalogDirection> = {
  acquisitions: {
    name: "Catalog acquisitions",
    heroLines: ["Find the gaps.", "Before you buy."],
    description:
      "We build custom AI systems that turn royalty statements and catalog files into clear findings, seller questions, and a review your team can act on.",
    primaryCta: "Talk about your next deal",
    outputs: [
      {
        title: "One place for the deal.",
        description:
          "Catalog files and royalty statements, organized for review.",
      },
      {
        title: "The questions worth asking.",
        description:
          "Missing periods, conflicting records, and the source behind each finding.",
      },
      {
        title: "A review you can use.",
        description:
          "Findings and open questions, ready for your team and the seller.",
      },
    ],
    interestOptions: [
      "Deal-material intake",
      "Source checks and discrepancies",
      "Review-pack preparation",
      "Not sure yet",
    ],
  },
  operations: {
    name: "Catalog operations",
    heroLines: ["Stop rebuilding", "the same report."],
    description:
      "We build custom AI systems that turn incoming royalty statements into matched records, clear exceptions, and recurring reports for your team.",
    primaryCta: "Talk about your reporting",
    outputs: [
      {
        title: "Statements, brought together.",
        description:
          "A repeatable intake process for the files that arrive each quarter.",
      },
      {
        title: "Know what needs attention.",
        description:
          "Matched records in place. Unresolved amounts ready for review.",
      },
      {
        title: "Reports that keep up.",
        description:
          "Catalog totals, period changes, and the numbers behind them.",
      },
    ],
    interestOptions: [
      "Royalty-statement intake",
      "Reconciliation and exception review",
      "Recurring portfolio reports",
      "Not sure yet",
    ],
  },
};
