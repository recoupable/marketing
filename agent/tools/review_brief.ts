import { defineTool } from "eve/tools";
import { z } from "zod/v3";
import { brief } from "../lib/brief";
import { reportReview } from "../lib/reportReview";
import { getReportReadiness } from "../../lib/website-agent/getReportReadiness";
import { briefReviewSchema } from "../../lib/website-agent/briefReview";

export default defineTool({
  description:
    "Show the visitor a recap of their confirmed context and ask them to correct it or choose Build my report. Call only after saving a sufficiently detailed brief with update_brief. Returns the specific gaps if context is missing; ask the next useful question instead of guessing. A report cannot be published until the visitor confirms this recap. Do not ask for confirmation in plain text or replace this tool with ask_user_question.",
  inputSchema: z.object({}),
  execute() {
    const current = brief.get();
    const readiness = getReportReadiness(current);
    if (!readiness.ready)
      return {
        error: "More context is needed before a report.",
        ...readiness,
        guidance:
          "Ask one useful question about the next gap. Do not invent answers or keep retrying this tool.",
      };
    const { discovery: d, setup: s } = current;
    const review = briefReviewSchema.parse({
      context:
        "Check that this reflects your team and the work you want to improve.",
      question: "Does this capture what your report should solve?",
      options: [
        {
          label: "Build my report",
          description: "This captures our situation",
        },
        {
          label: "I want to change something",
          description: "Let's correct the brief first",
        },
      ],
      recap: [
        { label: "For your team", value: `${d.scope} ${d.priority}` },
        {
          label: "Today",
          value: `${d.currentProcess} ${d.problem} ${d.workload}`,
        },
        {
          label: "Tools and data",
          value: `${s.aiUsage} AI tools: ${s.aiTools?.join(", ") || "None"}. Records: ${s.dataSources?.join(", ")}.`,
        },
        { label: "Already tried", value: s.previousAttempts },
        { label: "A useful result", value: d.successMeasure },
        {
          label: "First test",
          value: `${s.pilotOwner} ${s.accessConstraints}`,
        },
      ],
    });
    reportReview.update(() => ({
      snapshot: JSON.stringify(current),
      confirmed: false,
    }));
    return review;
  },
});
