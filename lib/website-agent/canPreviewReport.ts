import type { EveMessage } from "eve/client";
import { briefReviewSchema } from "./briefReview";

/** Display permission only: publish_plan still enforces the authoritative server checks. */
export function canPreviewReport(messages: readonly EveMessage[]) {
  let currentBrief: string | undefined;
  let reviewedBrief: string | undefined;
  let ready = false;
  let confirmed = false;
  for (const message of messages) {
    if (message.role === "user") {
      const text = message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n");
      confirmed =
        !!reviewedBrief &&
        reviewedBrief === currentBrief &&
        text.trim().toLowerCase() === "build my report";
      continue;
    }
    for (const part of message.parts) {
      if (
        part.type !== "dynamic-tool" ||
        part.state !== "output-available" ||
        part.partial
      )
        continue;
      if (
        part.toolName === "update_brief" &&
        part.output &&
        typeof part.output === "object"
      ) {
        const { readiness, ...brief } = part.output as Record<string, unknown>;
        currentBrief = JSON.stringify(brief);
        ready =
          !!readiness &&
          typeof readiness === "object" &&
          "ready" in readiness &&
          readiness.ready === true;
        if (reviewedBrief !== currentBrief) confirmed = false;
      }
      if (
        part.toolName === "review_brief" &&
        briefReviewSchema.safeParse(part.output).success
      ) {
        reviewedBrief = ready ? currentBrief : undefined;
        confirmed = false;
      }
    }
  }
  return ready && confirmed && reviewedBrief === currentBrief;
}
