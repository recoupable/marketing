import { defineTool } from "eve/tools";
import { questionSchema } from "../../lib/website-agent/question";

import { research } from "../lib/research";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";

export default defineTool({
  description:
    "Show one short question with 2-3 clickable answers without blocking independent work. On the opening turn, call this alongside the first read_company_website call, then continue deeper research from the returned links while the visitor answers. Keep one unanswered question available; do not replace it or ask another until answered or skipped. For a later researched company question include the optional insight with specific evidence, tentative implication, a falsifiable first test and exact source quotes. For ordinary follow-ups include a brief useful observation, short plain-language labels and optional concise descriptions. The visitor can also type freely. Continue useful independent work after this tool returns; only wait when that work is complete or actually requires the visitor's answer. Do not repeat the question in text.",
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
