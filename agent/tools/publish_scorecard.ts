import { defineTool } from "eve/tools";
import {
  scorecardInputSchema,
  scorecardSchema,
} from "../../lib/website-agent/scorecard";
import { validateInsightSources } from "../../lib/website-agent/validateInsightSources";
import { assessment, assessmentReview } from "../lib/assessment";
import { research } from "../lib/research";

export default defineTool({
  description:
    "Publish the AI Scorecard after the visitor confirms review_scorecard with Show my scorecard. Ratings come from saved criteria, never your choice of a score. Write summary first so it streams; use two short sentences, ideally under 45 words, without repeating the scope or headline. Give 1-3 concrete next moves tied to assessed gaps and the visitor's priority, with a first step and a way to check it worked. Peer examples are optional and must use actual opened pages, short exact quotes, dates when known, and an explanation of comparability. Public announcements do not establish typical practice, internal performance or a percentile. Use an empty peers array if nothing comparable is verified. The detailed implementation plan follows this assessment separately.",
  inputSchema: scorecardInputSchema,
  execute(input) {
    const current = assessment.get();
    const review = assessmentReview.get();
    if (!review.confirmed || review.snapshot !== JSON.stringify(current))
      return {
        error:
          "The visitor has not confirmed this assessment. Use review_scorecard and wait for Show my scorecard; corrections require another review.",
      };
    const result = scorecardInputSchema.parse(input);
    if (result.peers.length) {
      const error = validateInsightSources(
        result.peers.map((peer) => peer.source),
        research.get(),
      );
      if (error)
        return {
          error,
          guidance: "Read the actual pages or remove unverified peer examples.",
        };
    }
    return scorecardSchema.parse({
      ...result,
      assessment: current,
      version: "recoup-ai-scorecard-v1",
      assessedAt: new Date().toISOString().slice(0, 10),
    });
  },
});
