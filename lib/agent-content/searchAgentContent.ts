import { AgentContentError } from "./AgentContentError.ts";
import { rankSearchEntries } from "./rankSearchEntries.ts";
import type { AgentSearchInput } from "./types.ts";
import { validateFields } from "./validateFields.ts";

export async function searchAgentContent(input: AgentSearchInput) {
  validateFields(input, ["query", "type", "limit", "cursor"], "INVALID_QUERY");
  if (
    !input ||
    typeof input.query !== "string" ||
    !input.query.trim() ||
    input.query.length > 240 ||
    /[\u0000-\u001f\u007f]/.test(input.query)
  )
    throw new AgentContentError(
      "INVALID_QUERY",
      "Provide a search query between 1 and 240 characters.",
    );
  if (
    input.type !== undefined &&
    !["all", "page", "docs", "blog", "playbook"].includes(input.type)
  )
    throw new AgentContentError(
      "INVALID_TYPE",
      "Choose all, page, docs, blog, or playbook.",
    );
  const limit = input.limit === undefined ? 5 : input.limit;
  if (!Number.isInteger(limit) || limit < 1 || limit > 10)
    throw new AgentContentError(
      "INVALID_LIMIT",
      "Limit must be an integer from 1 to 10.",
    );
  if (
    input.cursor !== undefined &&
    (typeof input.cursor !== "string" ||
      !/^(0|[1-9]\d{0,4})$/.test(input.cursor))
  )
    throw new AgentContentError(
      "INVALID_CURSOR",
      "Use the nextCursor returned by a previous search.",
    );
  const offset = Number(input.cursor || 0);
  const query = input.query.trim();
  const ranked = rankSearchEntries(query, input.type);
  if (offset > ranked.length)
    throw new AgentContentError(
      "INVALID_CURSOR",
      "The cursor is beyond this search's results. Restart without a cursor.",
    );
  const results = ranked.slice(offset, offset + limit).map((entry) => {
    const text =
      entry.metadata.description ||
      entry.searchable.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
    const excerpt =
      text.length > 320
        ? `${text.slice(0, text.lastIndexOf(" ", 317) > 0 ? text.lastIndexOf(" ", 317) : 317)}…`
        : text;
    return { ...structuredClone(entry.metadata), excerpt };
  });
  return {
    query,
    results,
    total: ranked.length,
    nextCursor:
      offset + results.length < ranked.length
        ? String(offset + results.length)
        : null,
  };
}
