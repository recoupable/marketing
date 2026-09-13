import { AgentContentError } from "./AgentContentError.ts";
import { registry } from "./registry.ts";
import type { AgentReadInput } from "./types.ts";
import { validateFields } from "./validateFields.ts";

export async function readAgentContent(input: AgentReadInput) {
  validateFields(input, ["id", "offset", "maxLength"], "INVALID_ID");
  if (
    !input ||
    typeof input.id !== "string" ||
    input.id.length > 300 ||
    !/^(?:page:\/[a-z0-9/-]*|(?:docs|blog|playbook):[a-z0-9][a-z0-9/-]*)$/.test(
      input.id,
    )
  )
    throw new AgentContentError(
      "INVALID_ID",
      "Use an exact content ID returned by search or the content index.",
    );
  const entry = registry.get(input.id);
  if (!entry)
    throw new AgentContentError(
      "NOT_FOUND",
      "Public content was not found for this ID.",
    );
  const offset = input.offset === undefined ? 0 : input.offset;
  const maxLength = input.maxLength === undefined ? 6000 : input.maxLength;
  if (!Number.isSafeInteger(offset) || offset < 0)
    throw new AgentContentError(
      "INVALID_OFFSET",
      "Offset must be a nonnegative integer from the previous response.",
    );
  if (!Number.isInteger(maxLength) || maxLength < 1 || maxLength > 12000)
    throw new AgentContentError(
      "INVALID_MAX_LENGTH",
      "maxLength must be an integer from 1 to 12000.",
    );
  // Offsets count Unicode characters, so chunks never split an emoji or
  // non-BMP character and every nonempty chunk makes progress.
  const characters = Array.from(await entry.markdown());
  if (offset > characters.length)
    throw new AgentContentError(
      "INVALID_OFFSET",
      "Offset is beyond the end of this document.",
    );
  const end = Math.min(offset + maxLength, characters.length);
  return {
    ...structuredClone(entry.metadata),
    markdown: characters.slice(offset, end).join(""),
    offset,
    nextOffset: end < characters.length ? end : null,
    totalLength: characters.length,
  };
}
