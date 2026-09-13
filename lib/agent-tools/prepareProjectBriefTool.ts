import { generalInterests } from "../inquiry-topics.ts";
import { createObjectSchema } from "./createObjectSchema.ts";
import type { AgentToolDefinition } from "./types.ts";

export const prepareProjectBriefTool: AgentToolDefinition = {
  name: "prepare_project_brief",
  description:
    "Prepare a short project inquiry draft from a workflow, desired outcome, and optional tools and frequency. Returns text the user can review on /contact. Does not save information, submit an inquiry, contact Recoup, book a call, or promise scope or pricing.",
  inputSchema: createObjectSchema(
    {
      workflow: {
        type: "string",
        minLength: 20,
        maxLength: 500,
        description:
          "Describe the current workflow and where work gets difficult. Do not include passwords or confidential records.",
      },
      desiredOutcome: {
        type: "string",
        minLength: 10,
        maxLength: 500,
        description: "What the team would like to improve or produce.",
      },
      tools: {
        type: "string",
        minLength: 1,
        maxLength: 500,
        description: "Optional tools or data sources involved.",
      },
      frequency: {
        type: "string",
        minLength: 1,
        maxLength: 120,
        description: "Optional description of how often the work happens.",
      },
      interest: {
        type: "string",
        enum: [...generalInterests],
        default: "Not sure yet",
      },
    },
    ["workflow", "desiredOutcome"],
  ),
  annotations: { readOnlyHint: true },
};
