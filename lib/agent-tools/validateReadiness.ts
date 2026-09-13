import { readinessQuestions } from "../marketing-migration-tools/readinessQuestions.ts";
import { invalidInput } from "./invalidInput.ts";
import { requireObject } from "./requireObject.ts";
import type { AgentToolIssue } from "./types.ts";

export function validateReadiness(input: unknown): Record<string, string> {
  const values = requireObject(input, ["answers"]);
  const answers = requireObject(
    values.answers,
    readinessQuestions.map((question) => question.id),
    "answers",
  );
  const issues: AgentToolIssue[] = [];
  for (const question of readinessQuestions) {
    const value = answers[question.id];
    if (
      typeof value !== "string" ||
      !(question.options as readonly string[]).includes(value)
    ) {
      issues.push({
        field: `answers.${question.id}`,
        message: `Choose one of: ${question.options.join("; ")}.`,
      });
    }
  }
  if (issues.length) invalidInput(issues);
  return Object.fromEntries(
    readinessQuestions.map((question) => [
      question.id,
      answers[question.id] as string,
    ]),
  );
}
