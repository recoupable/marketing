import { defineTool } from "eve/tools";
import { z } from "zod/v3";
import {
  assessment,
  assessmentAnswers,
  assessmentReview,
} from "../lib/assessment";
import { getAssessmentProfile } from "../../lib/website-agent/getAssessmentProfile";
import { briefReviewSchema } from "../../lib/website-agent/briefReview";

export default defineTool({
  description:
    "Show the actual assessed areas and supporting answers for the visitor to check before Show my scorecard. All five areas, role/team and priority must be understood first. Only an explicit visitor request for a partial scorecard permits unknown areas. Do not substitute a plain question for this review.",
  inputSchema: z.object({}),
  execute() {
    const current = assessment.get();
    const profile = getAssessmentProfile(current);
    if (
      !profile.complete &&
      !(
        assessmentAnswers.get().partialRequested &&
        current.scope &&
        profile.assessed > 0
      )
    )
      return {
        error: "More context is needed for a scorecard.",
        missing: profile.missing,
        guidance:
          "Ask about the next missing area. If the visitor wants to stop, they can request a partial scorecard; unknowns will stay unscored.",
      };
    assessmentReview.update(() => ({
      snapshot: JSON.stringify(current),
      confirmed: false,
    }));
    return {
      ...briefReviewSchema.parse({
        context:
          "These ratings use your answers, not an inspection of your systems. Check the evidence and correct anything missing.",
        question: "Does this reflect how your team uses AI?",
        options: [
          {
            label: "Show my scorecard",
            description: "This reflects our setup",
          },
          {
            label: "I want to correct something",
            description: "Update the evidence first",
          },
        ],
        recap: [
          {
            label: "Scope",
            value: current.scope?.summary ?? "Not yet established",
          },
          ...profile.areas.map((area) => ({
            label: `${area.title} · ${area.label}`,
            value:
              [
                ...new Set(
                  area.criteria.map((item) => item.quote).filter(Boolean),
                ),
              ].join(" / ") || "Not enough context to assess this area.",
          })),
        ],
      }),
      assessment: current,
    };
  },
});
