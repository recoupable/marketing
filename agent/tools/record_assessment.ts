import { defineTool } from "eve/tools";
import { assessmentUpdateSchema } from "../../lib/website-agent/scorecard";
import { getAssessmentProfile } from "../../lib/website-agent/getAssessmentProfile";
import { assessment, assessmentAnswers } from "../lib/assessment";
import { scorecardRubric } from "../../lib/website-agent/scorecardRubric";
import { getAssessmentFocus } from "../../lib/website-agent/getAssessmentFocus";

export default defineTool({
  description: `Record only what the visitor has said about their current AI use. Patch confirmed facts, preserve previous answers, and replace corrections. Each yes/no needs an exact quote from a visitor message, never a website or your own inference. For a short answer such as Yes, include the actual question it answered in question; the server checks that pairing. Use unknown with a null quote only for explicitly skipped or unclear answers, not questions you have yet to ask. A broad initial choice does not establish accuracy, adoption, workflow controls or results. Scope describes their actual role/team, not automatically the entire company. Priority is a desired improvement; it does not establish results_goal or any present capability. Criteria are cumulative in this fixed rubric: ${JSON.stringify(scorecardRubric)}. Follow the returned nextQuestion focus: current setup first, future priorities afterward. An empty criteria patch can retrieve the current focus without changing evidence. Keep asking one useful question at a time; do not fill gaps to get a score.`,
  inputSchema: assessmentUpdateSchema,
  execute(input) {
    const patch = assessmentUpdateSchema.parse(input);
    const facts = [patch.scope, patch.priority, ...patch.criteria].filter(
      (fact): fact is NonNullable<typeof fact> => !!fact && !!fact.quote,
    );
    const normalize = (value: string) =>
      value.toLowerCase().replace(/\s+/g, " ").trim();
    const savedAnswers = assessmentAnswers.get();
    const messages = savedAnswers.messages.map(normalize);
    for (const fact of facts) {
      const quote = normalize(fact.quote!);
      if (!messages.some((message) => message.includes(quote)))
        return {
          error:
            "Every quote must appear in an actual visitor message. Ask for the missing evidence instead of inventing it.",
        };
      const reply = [...(savedAnswers.answeredQuestions ?? [])]
        .reverse()
        .find(
          (item) =>
            (quote.length < 12
              ? normalize(item.answer) === quote
              : normalize(item.answer).includes(quote)) &&
            (!fact.question ||
              normalize(item.question) === normalize(fact.question)),
        );
      if ((quote.length < 12 || fact.question) && !reply)
        return {
          error:
            "A short or contextual answer must be tied to the actual question the visitor answered. Ask for clarification; do not guess what Yes or No refers to.",
        };
      if (quote.length < 12 && reply) fact.question = reply.question;
    }
    const previous = assessment.get();
    const criteria = new Map(previous.criteria.map((item) => [item.id, item]));
    for (const item of patch.criteria) criteria.set(item.id, item);
    const next = {
      scope: patch.scope ?? previous.scope,
      priority: patch.priority ?? previous.priority,
      criteria: [...criteria.values()],
    };
    const profile = getAssessmentProfile(next);
    if (
      profile.areas.some((area) => area.answered === 3 && area.level === null)
    )
      return {
        error:
          "These cumulative criteria conflict. Clarify the actual process; do not award a higher stage while an earlier requirement is absent.",
      };
    assessment.update(() => next);
    return {
      assessment: next,
      missing: profile.missing,
      complete: profile.complete,
      nextQuestion: getAssessmentFocus(next),
    };
  },
});
