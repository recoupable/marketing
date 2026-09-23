import type { ConversationTurn } from "./getConversationTurns";
import { z } from "zod/v3";
import { questionSchema } from "./question";
import { briefReviewSchema } from "./briefReview";
import { scorecardReviewSchema } from "./scorecard";

const draftSchema = z.object({
  context: z.string().max(180).optional(),
  question: z.string().min(1).max(100),
  options: z
    .array(
      z.object({
        label: z.string().max(80).optional(),
        description: z.string().max(100).optional(),
      }),
    )
    .max(4)
    .optional(),
});

/** Independent research/finding messages must not dismiss the pending question. */
export function getActiveQuestion(turn?: ConversationTurn) {
  return turn?.assistants
    .flatMap((message) => message.parts)
    .flatMap((part) => {
      if (
        part.type !== "dynamic-tool" ||
        ![
          "ask_user_question",
          "present_choices",
          "review_brief",
          "review_scorecard",
        ].includes(part.toolName)
      )
        return [];
      if (
        !["review_brief", "review_scorecard"].includes(part.toolName) &&
        (part.state === "input-streaming" || part.state === "input-available")
      ) {
        const draft = draftSchema.safeParse(part.input);
        if (!draft.success) return [];
        return [
          {
            id: part.toolCallId,
            pending: true,
            question: draft.data.question,
            context: draft.data.context ?? "",
            options: (draft.data.options ?? []).flatMap((option) =>
              option.label
                ? [
                    {
                      label: option.label,
                      description: option.description ?? "",
                    },
                  ]
                : [],
            ),
          },
        ];
      }
      if (part.state !== "output-available" || part.partial) return [];
      const result = (
        part.toolName === "review_scorecard"
          ? scorecardReviewSchema
          : part.toolName === "review_brief"
            ? briefReviewSchema
            : questionSchema
      ).safeParse(part.output);
      return result.success
        ? [{ ...result.data, id: part.toolCallId, pending: false }]
        : [];
    })
    .at(-1);
}
