import { defineTool } from "eve/tools";
import { planSchema } from "../../lib/workflow-plan/schema";
import { brief } from "../lib/brief";
import { reportReview } from "../lib/reportReview";
import { getReportReadiness } from "../../lib/website-agent/getReportReadiness";
export default defineTool({
  description:
    "Publish the visitor's report only after discovery is complete and they confirmed the recap from review_brief by choosing Build my report. Never publish after a fixed question count or from website research alone. Every field must fit their confirmed priority, process, tools, data and success measure. A conditional idea belongs in the conversation, not a finished report.",
  inputSchema: planSchema,
  execute(input) {
    const current = brief.get();
    const readiness = getReportReadiness(current);
    if (!readiness.ready)
      return {
        error: "The report is not ready: essential context is missing.",
        ...readiness,
        guidance:
          "Keep learning about the actual work. Ask one useful question about the next gap; do not publish a report or fill gaps with assumptions.",
      };
    const review = reportReview.get();
    if (!review.confirmed || review.snapshot !== JSON.stringify(current))
      return {
        error: "The visitor has not confirmed this brief.",
        guidance:
          "Call review_brief and let the visitor check the recap and choose Build my report before publishing. If you changed the brief, show the updated recap.",
      };
    return planSchema.parse(input);
  },
});
