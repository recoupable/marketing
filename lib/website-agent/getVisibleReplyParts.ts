import type { EveMessagePart } from "eve/client";
import { questionSchema } from "./question";
import { planSchema } from "../workflow-plan/schema";

/** Structured answers already contain the finding, question, or complete report. */
export function getVisibleReplyParts(parts: readonly EveMessagePart[]) {
  let structuredAnswer = false;
  return parts.filter((part) => {
    if (part.type === "text") return !structuredAnswer;
    if (
      part.type === "dynamic-tool" &&
      part.state === "output-available" &&
      !part.partial
    ) {
      structuredAnswer ||=
        (["ask_user_question", "present_choices"].includes(part.toolName) &&
          questionSchema.safeParse(part.output).success) ||
        (part.toolName === "publish_plan" &&
          planSchema.safeParse(part.output).success);
    }
    return true;
  });
}
