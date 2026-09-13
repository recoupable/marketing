import { generalInterests } from "../inquiry-topics.ts";
import { readinessQuestions } from "../marketing-migration-tools/readinessQuestions.ts";
import { objectSchema } from "./objectSchema.ts";
import { roiLimits } from "./roiLimits.ts";
import type { AgentToolDefinition } from "./types.ts";

export const agentToolDefinitions: readonly AgentToolDefinition[] = [
  {
    name: "search_recoup",
    description:
      "Search Recoup’s public website, guides, API documentation, blog, and playbook. Returns matching public content with IDs for read_recoup_page. Use a relevant query and optional content type; follow the returned cursor for more matches.",
    inputSchema: objectSchema(
      {
        query: {
          type: "string",
          minLength: 1,
          maxLength: 240,
          description: "Words or a question to search for.",
        },
        type: {
          type: "string",
          enum: ["all", "page", "docs", "blog", "playbook"],
          default: "all",
        },
        limit: { type: "integer", minimum: 1, maximum: 10, default: 5 },
        cursor: {
          type: "string",
          minLength: 1,
          maxLength: 200,
          description:
            "Opaque pagination cursor returned by the previous search.",
        },
      },
      ["query"],
    ),
    annotations: { readOnlyHint: true },
  },
  {
    name: "read_recoup_page",
    description:
      "Read the public text of a Recoup page by an ID returned by search_recoup. Use the returned continuation offset when the content is longer than one response. Does not browse arbitrary URLs or read private account data.",
    inputSchema: objectSchema(
      {
        id: {
          type: "string",
          minLength: 1,
          maxLength: 300,
          description: "Public content ID returned by search_recoup.",
        },
        offset: {
          type: "integer",
          minimum: 0,
          default: 0,
          description:
            "Character offset supplied by the previous response; start at zero.",
        },
        maxLength: {
          type: "integer",
          minimum: 1,
          maximum: 12_000,
          default: 6000,
          description: "Maximum characters to return.",
        },
      },
      ["id"],
    ),
    annotations: { readOnlyHint: true },
  },
  {
    name: "estimate_workflow_roi",
    description:
      "Calculate the potential value of time saved on one workflow using five explicit assumptions. Returns hours saved, capacity value, recurring net value, first-year net value, and payback. All costs are USD. Capacity value is not guaranteed cash savings; this does not generate a quote or submit a lead.",
    inputSchema: objectSchema(
      Object.fromEntries(
        Object.entries(roiLimits).map(([key, limit]) => [
          key,
          {
            type: "number",
            minimum: 0,
            maximum: limit.maximum,
            description: limit.description,
          },
        ]),
      ),
      Object.keys(roiLimits),
    ),
    annotations: { readOnlyHint: true },
  },
  {
    name: "assess_workflow_readiness",
    description:
      "Recommend a practical next step for one music-business workflow from Recoup’s readiness check. All seven answers are collected for the summary; information access, task clarity, and workflow ownership decide the recommendation. Ask the user for any missing answer; do not infer it. Returns a recommendation and next steps, not a numerical score, certification, or promise of readiness.",
    inputSchema: objectSchema(
      {
        answers: objectSchema(
          Object.fromEntries(
            readinessQuestions.map((question) => [
              question.id,
              {
                type: "string",
                enum: [...question.options],
                description: question.question,
              },
            ]),
          ),
          readinessQuestions.map((question) => question.id),
        ),
      },
      ["answers"],
    ),
    annotations: { readOnlyHint: true },
  },
  {
    name: "prepare_project_brief",
    description:
      "Prepare a short project inquiry draft from a workflow, desired outcome, and optional tools and frequency. Returns text the user can review on /contact. Does not save information, submit an inquiry, contact Recoup, book a call, or promise scope or pricing.",
    inputSchema: objectSchema(
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
  },
];
