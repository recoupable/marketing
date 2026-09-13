import { createObjectSchema } from "./createObjectSchema.ts";
import type { AgentToolDefinition } from "./types.ts";

export const readRecoupPageTool: AgentToolDefinition = {
  name: "read_recoup_page",
  description:
    "Read the public text of a Recoup page by an ID returned by search_recoup. Use the returned continuation offset when the content is longer than one response. Does not browse arbitrary URLs or read private account data.",
  inputSchema: createObjectSchema(
    {
      id: {
        type: "string",
        minLength: 1,
        maxLength: 300,
        description: "Public content ID returned by search_recoup.",
      },
      offset: {
        type: "integer",
        minimum: 0,
        default: 0,
        description:
          "Character offset supplied by the previous response; start at zero.",
      },
      maxLength: {
        type: "integer",
        minimum: 1,
        maximum: 12_000,
        default: 6000,
        description: "Maximum characters to return.",
      },
    },
    ["id"],
  ),
  annotations: { readOnlyHint: true },
};
