import { defineTool } from "eve/tools";
import { questionSchema } from "../../lib/website-agent/question";

import { research } from "../lib/research";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";

export default defineTool({
  description:
    "Show one short question with 2-3 clickable answers without blocking research. Call alongside the first homepage read, then continue website and web research while the visitor answers. Keep one unanswered question; do not replace it. Use publish_finding separately for sourced observations, even before the question is answered. Follow up on the visitor's actual role, business priority, current process, workload, tools/data, prior attempts, success measure and implementation constraints. No fixed question count and no report from a few superficial answers. Keep labels natural and specific; free text is always available. Continue independent work after this tool returns. Do not repeat the question in text. Use review_brief for the final context recap, not this tool.",
  inputSchema: questionSchema,
  execute(input) {
    const question = questionSchema.parse(input);
    if (question.insight) {
      const error = validateInsightSources(
        question.insight.sources,
        research.get(),
      );
      if (error)
        return {
          error,
          correction:
            "Correct the sources and call ask_user_question again. Do not present unverified claims.",
        };
    }
    return question;
  },
});
