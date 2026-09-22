import type { WorkflowAnswers, WorkflowPlan } from "./schema";

export function planText(answers: WorkflowAnswers, plan: WorkflowPlan): string {
  return [
    plan.title,
    plan.summary,
    "",
    "YOUR CONTEXT",
    `Focus: ${answers.bottleneck.join(", ")}`,
    `Information: ${answers.sources.join(", ")}`,
    `Desired result: ${answers.outcome.join("; ")}`,
    "",
    "WHAT THE OUTPUT LOOKS LIKE",
    plan.output,
    "",
    "WHAT YOU NEED",
    ...plan.inputs.map((item) => `• ${item}`),
    "",
    "HOW TO START",
    ...plan.steps.map((item, i) => `${i + 1}. ${item}`),
    "",
    "HUMAN REVIEW",
    plan.review,
    "",
    "FIRST STEP",
    plan.firstStep,
    "",
    "CHECK IT WORKED",
    plan.success,
    "",
    "Based on your answers, not a review of your catalog or a confirmed project scope.",
  ].join("\n");
}
