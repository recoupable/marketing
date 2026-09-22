import type { ConversationTurn } from "./getConversationTurns";
import { questionSchema } from "./question";
import { briefReviewSchema } from "./briefReview";

/** Independent research/finding messages must not dismiss the pending question. */
export function getActiveQuestion(turn?: ConversationTurn) {
  return turn?.assistants
    .flatMap((message) => message.parts)
    .flatMap((part) => {
      if (
        part.type !== "dynamic-tool" ||
        !["ask_user_question", "present_choices", "review_brief"].includes(
          part.toolName,
        ) ||
        part.state !== "output-available" ||
        part.partial
      )
        return [];
      const result = (
        part.toolName === "review_brief" ? briefReviewSchema : questionSchema
      ).safeParse(part.output);
      return result.success ? [{ ...result.data, id: part.toolCallId }] : [];
    })
    .at(-1);
}
