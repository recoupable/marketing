import type { EveMessagePart } from "eve/client";
import { questionSchema } from "./question";

/** The conversational lead-in can arrive before the question and its choices. */
export function getQuestionMessage(part: EveMessagePart) {
  if (
    part.type !== "dynamic-tool" ||
    !["ask_user_question", "present_choices"].includes(part.toolName)
  )
    return;
  const streaming =
    part.state === "input-streaming" || part.state === "input-available";
  const result = streaming
    ? questionSchema.pick({ message: true }).strip().safeParse(part.input)
    : part.state === "output-available" && !part.partial
      ? questionSchema.safeParse(part.output)
      : undefined;
  if (result?.success && result.data.message)
    return { id: part.toolCallId, text: result.data.message, streaming };
}
