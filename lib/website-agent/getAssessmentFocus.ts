import type { Assessment } from "./scorecard";
import { scorecardRubric } from "./scorecardRubric";

const directions = {
  knowledge:
    "Stay with questions AI answers today: the records it uses, source links and how answers are checked. Do not ask what they wish it could answer.",
  workflows:
    "Ask about a task AI already helps complete, its actual output and how it runs. Do not ask which task they would like to automate.",
  adoption:
    "Ask who uses the existing setup, shared methods and who maintains them. Do not ask about a future rollout.",
  reliability:
    "Ask about checks, permissions and error handling already in place. Do not ask them to design new controls.",
  results:
    "Ask what they already track and have measured about current AI use. A future wish or scorecard priority is not an existing goal or measured result.",
};

/** Steer adaptive questions through today's setup before discussing future priorities. */
export function getAssessmentFocus(assessment: Assessment) {
  if (!assessment.scope)
    return {
      phase: "current_setup",
      topic: "scope",
      criteria: [],
      guidance:
        "Establish the role and team covered by the answers. Then continue with what their AI does today; leave desired improvements until the current setup is understood.",
    };

  for (const area of scorecardRubric) {
    const unasked = area.criteria.filter(
      (criterion) =>
        !assessment.criteria.some((answer) => answer.id === criterion.id),
    );
    if (unasked.length)
      return {
        phase: "current_setup",
        topic: area.id,
        criteria: unasked.map((criterion) => criterion.id),
        guidance: `${directions[area.id]} Finish this topic before moving on. Reuse facts already shared; one answer may cover several criteria.`,
      };
  }

  const unknowns = assessment.criteria.filter(
    (criterion) => criterion.status === "unknown",
  );
  if (unknowns.length)
    return {
      phase: "current_setup",
      topic: "clarification",
      criteria: unknowns.map((criterion) => criterion.id),
      guidance:
        "Some current-setup answers were skipped or unclear. Offer to clarify those gaps or show a partial scorecard. Do not repeat skipped questions without their agreement or switch into planning. A partial scorecard still needs an explicit visitor request.",
    };

  if (!assessment.priority)
    return {
      phase: "priorities",
      topic: "priority",
      criteria: [],
      guidance:
        "The current setup is understood. Explicitly transition: we have covered what AI does today; now ask which improvement matters most. Keep this desired improvement separate from existing measured results. Save the answer, then review the scorecard.",
    };

  return {
    phase: "review",
    topic: "review",
    criteria: [],
    guidance:
      "The current setup and desired improvement are recorded. Use review_scorecard; do not ask for implementation requirements unless they request a plan. Reopen an earlier topic only to address a correction or contradiction, explaining why.",
  };
}
