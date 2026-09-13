import { calculateWorkflowROI } from "../marketing-migration-tools/calculateWorkflowROI.ts";
import { recommendReadiness } from "../marketing-migration-tools/recommendReadiness.ts";
import { AgentToolInputError } from "./AgentToolInputError.ts";
import { prepareProjectBrief } from "./prepareProjectBrief.ts";
import { validateReadiness } from "./validateReadiness.ts";
import { validateROI } from "./validateROI.ts";

export function executeUtilityTool(name: string, input: unknown) {
  if (name === "estimate_workflow_roi") {
    const assumptions = validateROI(input);
    return {
      status: "calculated" as const,
      assumptions,
      result: calculateWorkflowROI(assumptions),
      units: {
        monthlyHours: "hours/month",
        hourlyCost: "USD/hour",
        timeReduction: "percent",
        monthlySystemCost: "USD/month",
        setupCost: "USD",
        hoursSaved: "hours/month",
        capacityValue: "USD/month",
        monthlyNetValue: "USD/month",
        firstYearNetValue: "USD",
        paybackMonths: "months",
      },
      interpretation:
        "The value of freed team time is capacity value, not guaranteed cash savings. Results depend on your assumptions and are not a quote. Null payback means recurring net value is not positive.",
    };
  }
  if (name === "assess_workflow_readiness") {
    const answers = validateReadiness(input);
    return {
      status: "assessed" as const,
      answers,
      recommendation: recommendReadiness(answers),
    };
  }
  if (name === "prepare_project_brief") return prepareProjectBrief(input);
  throw new AgentToolInputError("UNKNOWN_TOOL", [
    {
      field: "name",
      message:
        "Choose estimate_workflow_roi, assess_workflow_readiness, or prepare_project_brief.",
    },
  ]);
}
