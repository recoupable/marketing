import { defineTool } from "eve/tools";
import { questionSchema } from "../../lib/website-agent/question";
import { aiSetupQuestion } from "../../lib/website-agent/aiSetupQuestion";
import { research } from "../lib/research";
import { assessmentAnswers } from "../lib/assessment";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";

export default defineTool({
  description:
    "Speak to the visitor and ask one short question with 2-4 clickable answers without blocking research. Write message first: at the opening mention their AI Scorecard, explain that you will research their business and relevant public examples, and invite them to answer while you work; for follow-ups acknowledge their actual answer and explain the useful next step. The message streams in the conversation, and the question appears in the reply input. Call alongside the first homepage read, then continue website and web research while the visitor answers. Keep one unanswered question; do not replace it. Use publish_finding separately for sourced observations. Follow record_assessment.nextQuestion: first role/team, then current knowledge, recurring work, adoption, checks and existing measured results. Stay with a topic until it is understood or explicitly skipped. Only then transition clearly to what they want to improve. Do not alternate current-state questions with future wishes. Save volunteered goals without changing the current topic; never treat those wishes as existing capabilities or measured results. Learn implementation constraints only when they request a plan. No fixed question count. Keep labels natural and specific; free text is always available. Continue research after this tool returns. Do not repeat the message or question in separate text. Use review_scorecard for the assessment recap, or review_brief for a requested implementation plan, not this tool.",
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
