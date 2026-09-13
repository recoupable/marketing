import type { ROIInputs } from "../marketing-migration-tools/calculateWorkflowROI.ts";
import { invalidInput } from "./invalidInput.ts";
import { requireObject } from "./requireObject.ts";
import { roiLimits } from "./roiLimits.ts";
import type { AgentToolIssue } from "./types.ts";

export function validateROI(input: unknown): ROIInputs {
  const values = requireObject(input, Object.keys(roiLimits));
  const issues: AgentToolIssue[] = [];
  for (const [key, limit] of Object.entries(roiLimits)) {
    const value = values[key];
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > limit.maximum
    ) {
      issues.push({
        field: key,
        message: `Required finite number between 0 and ${limit.maximum}. ${limit.description}`,
      });
    }
  }
  if (issues.length) invalidInput(issues);
  return {
    monthlyHours: values.monthlyHours as number,
    hourlyCost: values.hourlyCost as number,
    timeReduction: values.timeReduction as number,
    monthlySystemCost: values.monthlySystemCost as number,
    setupCost: values.setupCost as number,
  };
}
