export type ImmersiveWorkflowId =
  | "catalog-diligence"
  | "royalty-reporting"
  | "management-reporting";

export type ImmersiveWorkflow = Readonly<{
  id: ImmersiveWorkflowId;
  label: string;
  title: string;
  description: string;
  input: readonly string[];
  output: readonly string[];
  exampleHref?: string;
}>;

/** Examples of custom systems to scope, not a list of ready-made products. */
export const immersiveWorkflows: readonly ImmersiveWorkflow[] = [
  {
    id: "catalog-diligence",
    label: "Catalog diligence",
    title: "Review acquisition files.",
    description:
      "Organize deal files and flag missing documents or conflicting catalog identifiers.",
    input: ["Deal documents", "Catalog metadata", "Royalty statements"],
    output: [
      "Organized review files",
      "Missing-document checklist",
      "Conflicting identifiers for review",
    ],
    exampleHref: "/acquisitions",
  },
  {
    id: "royalty-reporting",
    label: "Royalty reporting",
    title: "Prepare royalty reports.",
    description:
      "Match statement entries, total attributed royalties, and flag unresolved entries for review.",
    input: ["Royalty statements", "Catalog records", "Matching rules"],
    output: [
      "Attributed royalty totals",
      "Unresolved entries for review",
      "Statement breakdown with source references",
    ],
    exampleHref: "/operations",
  },
  {
    id: "management-reporting",
    label: "Management reporting",
    title: "Prepare recurring briefings.",
    description:
      "Prepare recurring finance and catalog briefings from approved data and documented workflows.",
    input: ["Approved company data", "Reporting requirements", "Team workflows"],
    output: [
      "Finance and catalog briefings",
      "Documented reporting workflow",
      "Source references for review",
    ],
  },
] as const;

export const defaultImmersiveWorkflowId: ImmersiveWorkflowId = "royalty-reporting";

/** Reject arbitrary text and repeated query parameters before prefilling a brief. */
export function getImmersiveWorkflow(project: unknown) {
  if (typeof project !== "string") return undefined;
  return immersiveWorkflows.find((workflow) => workflow.id === project);
}

export function getImmersiveProjectBrief(project: unknown) {
  const workflow = getImmersiveWorkflow(project);
  return workflow
    ? `I would like to scope a custom system for ${workflow.label.toLowerCase()}.`
    : undefined;
}
