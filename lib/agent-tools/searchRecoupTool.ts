import { createObjectSchema } from "./createObjectSchema.ts";
import type { AgentToolDefinition } from "./types.ts";

export const searchRecoupTool: AgentToolDefinition = {
  name: "search_recoup",
  description:
    "Search Recoup’s public website, guides, API documentation, blog, and playbook. Returns matching public content with IDs for read_recoup_page. Use a relevant query and optional content type; follow the returned cursor for more matches.",
  inputSchema: createObjectSchema(
    {
      query: {
        type: "string",
        minLength: 1,
        maxLength: 240,
        description: "Words or a question to search for.",
      },
      type: {
        type: "string",
        enum: ["all", "page", "docs", "blog", "playbook"],
        default: "all",
      },
      limit: { type: "integer", minimum: 1, maximum: 10, default: 5 },
      cursor: {
        type: "string",
        minLength: 1,
        maxLength: 200,
        description:
          "Opaque pagination cursor returned by the previous search.",
      },
    },
    ["query"],
  ),
  annotations: { readOnlyHint: true },
};
