import { defineTool } from "eve/tools";
import { z } from "zod/v3";
import { searchAgentContent } from "../../lib/agent-content/searchAgentContent";
export default defineTool({
  description:
    "Search approved public Recoup website content for factual answers. Results include source IDs and URLs. Read the matching source before making a claim. Search covers company, services, pricing, platform, API docs, integrations, case studies, privacy, blog and playbook. Use nextCursor to retrieve more matches; rephrase narrowly if results are irrelevant.",
  inputSchema: z.object({
    query: z.string().min(1).max(240),
    type: z.enum(["all", "page", "docs", "blog", "playbook"]).optional(),
    cursor: z
      .string()
      .regex(/^(0|[1-9]\d{0,4})$/)
      .optional(),
  }),
  execute: (input) => searchAgentContent({ ...input, limit: 6 }),
});
