import { defineTool } from "eve/tools";
import { insightSchema } from "../../lib/website-agent/insight";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";
import { research } from "../lib/research";

export default defineTool({
  description:
    "Show one useful, sourced company finding as soon as the evidence is ready, even while a question remains unanswered. This does not replace or answer the pending question. Connect specific verified facts, explain a tentative implication and propose a small test; keep the total under 110 words. Cite 1-3 pages actually opened with read_company_website, using short exact quotes. Search snippets alone are not verified evidence. Do not repeat the finding in prose or in the next question.",
  inputSchema: insightSchema,
  execute(input) {
    const finding = insightSchema.parse(input);
    const error = validateInsightSources(finding.sources, research.get());
    return error
      ? {
          error,
          correction:
            "Read the sources or correct the quotes, then call publish_finding again. Do not present unverified claims.",
        }
      : finding;
  },
});
