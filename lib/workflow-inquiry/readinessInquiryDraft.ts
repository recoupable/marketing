import type { AgentDraft } from "../agent-browser.ts";
import { readinessQuestions } from "../marketing-migration-tools/readinessQuestions.ts";
import { recommendReadiness } from "../marketing-migration-tools/recommendReadiness.ts";

export function readinessInquiryDraft(
  answers: Record<string, string>,
): AgentDraft {
  const result = recommendReadiness(answers);
  return {
    interest: result.interest,
    message: [
      "I’d like to discuss the next step for this workflow.",
      "",
      "From the Recoup readiness check:",
      ...readinessQuestions.flatMap((question) => [
        question.question,
        answers[question.id],
        "",
      ]),
      `Suggested next step: ${result.title}`,
      result.description,
      "",
      "This suggestion is based on my answers, not a confirmed project scope.",
    ].join("\n"),
  };
}
