import { roiLimits } from "./roiLimits.ts";
import { createObjectSchema } from "./createObjectSchema.ts";
import type { AgentToolDefinition } from "./types.ts";

export const estimateWorkflowRoiTool: AgentToolDefinition = {
  name: "estimate_workflow_roi",
  description:
    "Calculate the potential value of time saved on one workflow using five explicit assumptions. Returns hours saved, capacity value, recurring net value, first-year net value, and payback. All costs are USD. Capacity value is not guaranteed cash savings; this does not generate a quote or submit a lead.",
  inputSchema: createObjectSchema(
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
};
