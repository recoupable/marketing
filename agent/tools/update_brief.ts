import { defineTool } from "eve/tools";
import { z } from "zod/v3";
import { setupSchema } from "../../lib/website-agent/setup";
import { discoverySchema } from "../../lib/website-agent/discovery";
import { getReportReadiness } from "../../lib/website-agent/getReportReadiness";
import { brief } from "../lib/brief";
export default defineTool({
  description:
    "Save the complete visitor-confirmed brief, preserving facts and applying corrections. Save discovery and setup from actual answers only. A website, your own suggested idea, or Yes to a narrow question does not confirm the visitor's priorities, process, tools, data or success measure. Unknown fields must be null. Returns what still needs to be learned before a report. Never fill gaps to pass this check.",
  inputSchema: z.object({
    goal: z.string().max(1000),
    tools: z.array(z.string().max(200)).max(10),
    constraints: z.array(z.string().max(300)).max(10),
    unknowns: z.array(z.string().max(300)).max(10),
    discovery: discoverySchema,
    setup: setupSchema.describe(
      "Only visitor-confirmed current setup. null is unknown; [] is confirmed none.",
    ),
  }),
  execute(input) {
    brief.update(() => input);
    return { ...brief.get(), readiness: getReportReadiness(input) };
  },
});
