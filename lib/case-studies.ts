export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  visual: "royalty" | "investment" | "catalog";
  audience: string;
  deliverable: string;
  change: string;
  problem: { title: string; paragraphs: string[] };
  approach: { title: string; description: string }[];
  outcome: { title: string; paragraphs: string[] };
  measure: string[];
  scope: string;
  nextHref: string;
  nextLabel: string;
};

// Private source-to-claim record: docs/research/recoup-evidence/case-study-claims.md.
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "royalty-reporting",
    category: "FINANCE & OPERATIONS",
    title: "Royalty reports. With answers behind the numbers.",
    summary: "Bring statements and receipts into a repeatable review, with the differences and their source records ready to inspect.",
    visual: "royalty",
    audience: "Finance and royalty teams",
    deliverable: "A reviewable reconciliation workbook",
    change: "From chasing a difference to inspecting its source.",
    problem: {
      title: "A matching total is only part of the answer.",
      paragraphs: [
        "Royalty statements and cash receipts tell different sides of the same story. Before reporting, the finance team needs to know which sources agree, which payments are still in transit, and which differences need attention.",
        "Checking only the grand total can miss the detail: an overpayment in one source can offset a shortfall in another. The review has to go deeper without becoming another spreadsheet rebuilt by hand.",
      ],
    },
    approach: [
      { title: "Start with Finance’s rules.", description: "Build the comparison around the team’s definitions, source mappings, and treatment of timing items. Keep materiality and sign-off with the reviewer." },
      { title: "Keep the calculation repeatable.", description: "Compare statements and receipts by payment source, using the same rules each time. Keep differences visible even when the overall total agrees." },
      { title: "Make every finding inspectable.", description: "Carry the statement rows and receipt references into the workbook, so the team can investigate a difference without starting the search again." },
    ],
    outcome: {
      title: "A working review the team can run again.",
      paragraphs: [
        "The system produces one workbook with overall totals, comparisons by payment source, flagged differences, and timing items. The finance team can inspect the records behind each finding and approve the review.",
        "When a source export was corrected, the workflow was run again with the updated input. The team could revise the report without rebuilding the process. Unresolved items stayed visible for the next review.",
      ],
    },
    measure: ["Time spent preparing each review", "Time from a flagged difference to its source", "Unresolved items carried into the next period"],
    scope: "An anonymized account of documented implementation and operating records. Business time savings and recovered royalties have not been independently measured. The illustration shows the method, not a client’s financial data.",
    nextHref: "/operations#royalty-example",
    nextLabel: "Explore the reporting example",
  },
  {
    slug: "investment-review",
    category: "MUSIC INVESTMENT",
    title: "A first draft that knows the deal.",
    summary: "Put the model, prior memos, analyst notes, and email context to work before the investment team starts its review.",
    visual: "investment",
    audience: "Catalog investment teams",
    deliverable: "A diligence draft grounded in deal materials",
    change: "From assembling the context to reviewing the draft.",
    problem: {
      title: "The deal doesn’t live in one document.",
      paragraphs: [
        "A model holds the assumptions. Previous reports establish the house format. Analyst notes capture the questions, and email threads contain details that never made it into the data room.",
        "Turning that material into a coherent diligence memo means reconstructing the context each time. A generic chat prompt starts too far away from the team’s actual work.",
      ],
    },
    approach: [
      { title: "Learn the team’s method.", description: "Set up a working environment around the team’s folders, report examples, and process. Preserve the original financial sources as the authority." },
      { title: "Bring the deal context together.", description: "Use the model, rough notes, previous diligence reports, and relevant correspondence to prepare a draft in a familiar structure." },
      { title: "Leave the judgment with the analyst.", description: "Use the draft to support memo preparation and model review. Keep unanswered questions explicit, and have the analyst edit and check the result." },
    ],
    outcome: {
      title: "A draft the analyst actually worked from.",
      paragraphs: [
        "The analyst used the workspace to prepare a diligence draft from prior reports, a model, notes, and email context. That draft became the starting point for their edits. The same workspace helped them work through questions about model changes.",
        "The information was already in context when the analyst began reviewing. Checking assumptions, resolving open questions, and making the investment decision stayed with the team.",
      ],
    },
    measure: ["Time to a usable first draft", "Assumptions corrected during review", "Analyst effort spent gathering context"],
    scope: "An anonymized account of documented operator use of a Recoup-enabled workspace. Deal names, model values, and customer quotations are kept private. Preparation time and investment outcomes have not been independently measured.",
    nextHref: "/acquisitions#acquisition-example",
    nextLabel: "Explore the investment example",
  },
  {
    slug: "catalog-intelligence",
    category: "CATALOG & CREATIVE",
    title: "A catalog brief worth opening.",
    summary: "Turn streams of music data into a focused review of what changed, what is reliable, and what deserves a closer look.",
    visual: "catalog",
    audience: "Catalog and creative teams",
    deliverable: "A recurring catalog intelligence brief",
    change: "From another data export to a useful review list.",
    problem: {
      title: "More data doesn’t tell you where to look.",
      paragraphs: [
        "A catalog can generate movement across streaming, video, social, and discovery platforms. Some changes are meaningful. Others reflect duplicate records, stale sources, or a mismatch in reporting windows.",
        "The team needs a short list it can investigate, with enough context to distinguish an opportunity from a data problem.",
      ],
    },
    approach: [
      { title: "Compare like with like.", description: "Calculate movement across aligned reporting periods, check source freshness, and exclude opening balances that could distort the comparison." },
      { title: "Cut the repeated noise.", description: "Consolidate related track movements, handle duplicate records, and surface data-quality concerns before suggesting follow-up." },
      { title: "Write for the person making the next move.", description: "Prepare a dated brief in the operator’s preferred format, with source context and follow-up questions. Keep unexplained movement unexplained until it is investigated." },
    ],
    outcome: {
      title: "A recurring output, with a clear review point.",
      paragraphs: [
        "Recurring briefs bring period changes, related track movements, and source checks into one review. The workflow flags data anomalies alongside the items that deserve a closer look.",
        "The operator starts with a prepared brief and the questions to investigate. Choosing a campaign or acting on an opportunity stays with the team.",
      ],
    },
    measure: ["Time spent preparing the weekly brief", "Items that lead to a useful follow-up", "Data issues caught before a campaign decision"],
    scope: "An anonymized account of implemented workflows and repeated report outputs. Campaign impact and reader engagement have not been measured. The illustration contains no actual artist or catalog data.",
    nextHref: "/platform",
    nextLabel: "Explore artist and catalog tools",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
