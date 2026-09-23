import { defineTool } from "eve/tools";
import { questionSchema } from "../../lib/website-agent/question";
import { aiSetupQuestion } from "../../lib/website-agent/aiSetupQuestion";
import { research } from "../lib/research";
import { assessmentAnswers } from "../lib/assessment";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";

export default defineTool({
  description:
    "Speak to the visitor and ask one short question with 2-4 clickable answers without blocking research. Write message first: at the opening mention their AI Scorecard, explain that you will research their business and relevant public examples, and invite them to answer while you work; for follow-ups acknowledge their actual answer and explain the useful next step. The message streams in the conversation, and the question appears in the reply input. Call alongside the first homepage read, then continue website and web research while the visitor answers. Keep one unanswered question; do not replace it. Use publish_finding separately for sourced observations, even before the question is answered. For the scorecard learn the visitor's actual role/team, priority, company knowledge, recurring AI work, adoption, checks and measured results. Use record_assessment to save what is supported. Learn implementation constraints when they later request a detailed plan. No fixed question count and no report from a few superficial answers. Keep labels natural and specific; free text is always available. Continue independent work after this tool returns. Do not repeat the message or question in separate text. Use review_scorecard for the assessment recap, or review_brief for a later detailed implementation plan, not this tool.",
  inputSchema: questionSchema,
  execute(input) {
    const question = questionSchema.parse(
      input.question === aiSetupQuestion.question && !input.insight
        ? {
            ...aiSetupQuestion,
            message: input.message ?? aiSetupQuestion.message,
          }
        : input,
    );
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
    assessmentAnswers.update((current) => ({
      ...current,
      pendingQuestion: question.question,
    }));
    return question;
  },
});
