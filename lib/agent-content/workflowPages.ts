import type { PageSummary } from "./types.ts";

// Summaries of the workflow example pages; same representation rules as offerPages.
export const workflowPages: PageSummary[] = [
  {
    path: "/acquisitions",
    title: "AI for music catalog acquisitions",
    description:
      "Custom systems organize deal materials, draft diligence reviews, and connect open questions to source records.",
    keywords:
      "catalog acquisition due diligence investment review music fund rights deal documents seller financial model source assumptions",
    paragraphs: [
      "Recoup can build a workflow that gathers deal documents, financial models, and analyst notes into one review; traces findings to their sources; keeps missing information visible; and prepares questions for the seller.",
      "The result is a draft review for the investment team. The service supports preparation and review rather than promising an investment decision or guaranteed outcome.",
    ],
    links: [
      ["Acquisition workflow example", "/acquisitions#workflow"],
      ["Discuss acquisition review", "/acquisitions/contact"],
    ],
  },
  {
    path: "/operations",
    title: "AI royalty reporting and catalog operations",
    description:
      "Custom royalty intake, reconciliation, and recurring reporting systems keep matches, exceptions, and source records visible.",
    keywords:
      "royalty royalties statement receipts reconcile reconciliation monthly reporting catalog operations payment source differences exceptions",
    paragraphs: [
      "Recoup can connect royalty statements, receipts, and catalog records; identify differences by payment source; and prepare a report with the underlying records and a focused review list.",
      "The example demonstrates why an overall matching total does not prove each source reconciles: offsetting differences can cancel out. Reviewers can inspect records behind individual differences.",
      "A project starts with the team's actual files, tools, and recurring reporting process. The scope defines the useful first build and review responsibilities.",
    ],
    links: [
      ["Royalty reporting example", "/operations#workflow"],
      ["Discuss catalog operations", "/operations/contact"],
    ],
  },
];
