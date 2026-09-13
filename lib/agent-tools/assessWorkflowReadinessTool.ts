import { readinessQuestions } from "../marketing-migration-tools/readinessQuestions.ts";
import { createObjectSchema } from "./createObjectSchema.ts";
import type { AgentToolDefinition } from "./types.ts";

export const assessWorkflowReadinessTool: AgentToolDefinition = {
  name: "assess_workflow_readiness",
  description:
    "Recommend a practical next step for one music-business workflow from Recoup’s readiness check. All seven answers are collected for the summary; information access, task clarity, and workflow ownership decide the recommendation. Ask the user for any missing answer; do not infer it. Returns a recommendation and next steps, not a numerical score, certification, or promise of readiness.",
  inputSchema: createObjectSchema(
    {
      answers: createObjectSchema(
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
};
