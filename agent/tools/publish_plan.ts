import { defineTool } from "eve/tools";
import { planSchema } from "../../lib/workflow-plan/schema";
export default defineTool({
  description:
    "Publish or replace the visitor's visible workflow plan. Include a concrete deliverable and first test. Every field must reflect this conversation; label assumptions.",
  inputSchema: planSchema,
  execute(input) {
    return planSchema.parse(input);
  },
});
