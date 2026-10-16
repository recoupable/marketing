import { aiStrategyCopy as copy } from "../copy/ai-strategy";
import { assessProject } from "./assessProject";
import type { StrategyInput } from "./strategySchema";

export function formatStrategyBrief(input: StrategyInput): string {
  const assessment = assessProject(input);
  return [
    `# Recoup: ${copy.resultTitle}`,
    copy.readinessNote,
    `## ${assessment.ready ? copy.readyTitle : copy.gapsTitle}`,
    ...assessment.gaps.map((gap) => `- ${gap}`),
    ...(
      ["workflow", "outcome", "owner", "reviewDate", "success", "stop"] as const
    ).map((key) => `## ${copy.resultLabels[key]}\n${input[key]}`),
    `## ${copy.resultLabels.purpose}\n${copy.purposes[input.purpose].label}`,
    `## ${copy.resultLabels.measure}\n${copy.purposes[input.purpose].measure}`,
    "## Inputs to confirm\n" +
      (["access", "example", "review", "baseline"] as const)
        .map((key) => `- ${copy.fields[key]} ${copy.answers[input[key]]}`)
        .join("\n"),
    "## Before starting\nAgree on test size, full cost ceiling, permissions, human review, and a fallback. No project has been approved or implemented by this brief.",
  ].join("\n\n");
}
