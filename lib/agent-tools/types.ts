import type { generalInterests } from "../inquiry-topics.ts";
import type { utilityToolNames } from "./utilityToolNames.ts";

export type UtilityToolName = (typeof utilityToolNames)[number];
export type AgentToolName =
  | "search_recoup"
  | "read_recoup_page"
  | UtilityToolName;
export type AgentToolDefinition = {
  name: AgentToolName;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: true };
};
export type AgentToolIssue = { field: string; message: string };
export type ProjectBriefDraft = {
  status: "draft";
  draft: { interest: (typeof generalInterests)[number]; message: string };
  submitted: false;
  nextStep: "/contact";
};
