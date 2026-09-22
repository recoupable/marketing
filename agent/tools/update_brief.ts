import { defineTool } from "eve/tools";
import { z } from "zod/v3";
import { setupSchema } from "../../lib/website-agent/setup";
import { brief } from "../lib/brief";
export default defineTool({
  description:
    "Save the current complete visitor brief, preserving known facts and applying corrections. Use only context supplied in this conversation; list unknowns explicitly.",
  inputSchema: z.object({
    goal: z.string().max(1000),
    tools: z.array(z.string().max(200)).max(10),
    constraints: z.array(z.string().max(300)).max(10),
    unknowns: z.array(z.string().max(300)).max(10),
    setup: setupSchema.describe("Only visitor-confirmed current setup. null is unknown; [] is confirmed none."),
  }),
  execute(input) {
    brief.update(() => input);
    return brief.get();
  },
});
