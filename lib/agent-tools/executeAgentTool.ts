import { readAgentContent } from "../agent-content/readAgentContent.ts";
import { searchAgentContent } from "../agent-content/searchAgentContent.ts";
import { executeUtilityTool } from "./executeUtilityTool.ts";
import { RequestError } from "./RequestError.ts";

/** Shared public execution path; it never forwards to authenticated platform tools. */
export async function executeAgentTool(input: unknown) {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    Object.keys(input).some((key) => !["name", "arguments"].includes(key))
  )
    throw new RequestError("INVALID_INPUT", "Provide name and arguments only.");
  const { name, arguments: args } = input as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    !args ||
    typeof args !== "object" ||
    Array.isArray(args)
  )
    throw new RequestError(
      "INVALID_INPUT",
      "A tool name and arguments object are required.",
    );
  if (name === "search_recoup") {
    if (
      Object.keys(args).some(
        (key) => !["query", "type", "limit", "cursor"].includes(key),
      )
    )
      throw new RequestError("INVALID_INPUT", "Unknown search argument.");
    return searchAgentContent(args as Parameters<typeof searchAgentContent>[0]);
  }
  if (name === "read_recoup_page") {
    if (
      Object.keys(args).some(
        (key) => !["id", "offset", "maxLength"].includes(key),
      )
    )
      throw new RequestError("INVALID_INPUT", "Unknown read argument.");
    return readAgentContent(args as Parameters<typeof readAgentContent>[0]);
  }
  return executeUtilityTool(name, args);
}
