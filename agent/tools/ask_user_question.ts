import { defineTool } from "eve/tools";
import { questionSchema } from "../../lib/website-agent/question";

import { research } from "../lib/research";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";

export default defineTool({
  description:
    "Show one short question with 2-3 clickable answers. On the opening turn, call this alongside the first read_company_website call to learn the visitor's current AI setup before deeper research. For a later researched company question include the optional insight with specific evidence, tentative implication, a falsifiable first test and exact source quotes. For ordinary follow-ups include a brief useful observation, short plain-language labels and optional concise descriptions. The visitor can also type freely. After this tool batch, stop and wait for the visitor; do not repeat the question in text.",
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
