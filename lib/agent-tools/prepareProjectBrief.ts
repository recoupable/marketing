import { generalInterests } from "../inquiry-topics.ts";
import { invalidInput } from "./invalidInput.ts";
import { requireObject } from "./requireObject.ts";
import type { AgentToolIssue, ProjectBriefDraft } from "./types.ts";

export function prepareProjectBrief(input: unknown): ProjectBriefDraft {
  const values = requireObject(input, [
    "workflow",
    "desiredOutcome",
    "tools",
    "frequency",
    "interest",
  ]);
  const issues: AgentToolIssue[] = [];
  function text(
    field: string,
    minimum: number,
    maximum: number,
    optional = false,
  ): string | undefined {
    const value = values[field];
    if (optional && value === undefined) return undefined;
    if (
      typeof value !== "string" ||
      value.trim().length < minimum ||
      value.length > maximum
    ) {
      issues.push({
        field,
        message: `Must contain at least ${minimum} characters after trimming and no more than ${maximum} characters in total.`,
      });
      return undefined;
    }
    return value.trim();
  }
  const workflow = text("workflow", 20, 500);
  const desiredOutcome = text("desiredOutcome", 10, 500);
  const tools = text("tools", 1, 500, true);
  const frequency = text("frequency", 1, 120, true);
  const interest =
    values.interest === undefined ? "Not sure yet" : values.interest;
  if (
    typeof interest !== "string" ||
    !(generalInterests as readonly string[]).includes(interest)
  ) {
    issues.push({
      field: "interest",
      message: `Choose one of: ${generalInterests.join("; ")}.`,
    });
  }
  if (issues.length) invalidInput(issues);

  const sections = [
    `Current workflow\n${workflow}`,
    `Desired outcome\n${desiredOutcome}`,
  ];
  if (tools) sections.push(`Tools and information\n${tools}`);
  if (frequency) sections.push(`How often the work happens\n${frequency}`);
  return {
    status: "draft",
    draft: {
      interest: interest as (typeof generalInterests)[number],
      message: sections.join("\n\n"),
    },
    submitted: false,
    nextStep: "/contact",
  };
}
