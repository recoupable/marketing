import type { EveMessage } from "eve/client";
import { assessmentSchema, type Assessment } from "./scorecard";
import { scorecardReviewSchema } from "./scorecard";

/** Client presentation only; the server independently checks review and confirmation. */
export function getScorecardContext(messages: readonly EveMessage[]) {
  let assessment: Assessment | undefined;
  let reviewed: string | undefined;
  let confirmed = false;
  for (const message of messages) {
    if (message.role === "user") {
      const text = message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n");
      confirmed =
        !!reviewed &&
        reviewed === JSON.stringify(assessment) &&
        text.trim().toLowerCase() === "show my scorecard";
      continue;
    }
    for (const part of message.parts) {
      if (
        part.type !== "dynamic-tool" ||
        part.state !== "output-available" ||
        part.partial ||
        !part.output ||
        typeof part.output !== "object"
      )
        continue;
      if (!["record_assessment", "review_scorecard"].includes(part.toolName))
        continue;
      const value = assessmentSchema.safeParse(
        (part.output as Record<string, unknown>).assessment,
      );
      if (!value.success || "error" in part.output) continue;
      assessment = value.data;
      if (JSON.stringify(assessment) !== reviewed) confirmed = false;
      if (
        part.toolName === "review_scorecard" &&
        scorecardReviewSchema.safeParse(part.output).success
      ) {
        reviewed = JSON.stringify(assessment);
        confirmed = false;
      }
    }
  }
  return { assessment, preview: confirmed ? assessment : undefined };
}
