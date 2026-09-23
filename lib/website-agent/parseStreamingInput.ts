import { parsePartialJson } from "ai";
import type { EveMessagePart } from "eve/client";

/** Eve streams raw JSON arguments; decode only tools with a visitor-facing view. */
export async function parseStreamingInput(part: EveMessagePart) {
  if (
    part.type !== "dynamic-tool" ||
    part.state !== "input-streaming" ||
    ![
      "ask_user_question",
      "present_choices",
      "publish_finding",
      "publish_plan",
    ].includes(part.toolName) ||
    part.inputText.length > 32000
  )
    return undefined;
  const { value } = await parsePartialJson(part.inputText);
  return value && typeof value === "object" && !Array.isArray(value)
    ? { id: part.toolCallId, text: part.inputText, input: value }
    : undefined;
}
