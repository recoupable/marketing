import type { Scorecard } from "./scorecard";
import { getAssessmentProfile } from "./getAssessmentProfile";
import { aiScorecardCopy } from "../copy/ai-scorecard";

export function scorecardText(scorecard: Scorecard) {
  const profile = getAssessmentProfile(scorecard.assessment);
  return [
    "YOUR AI SCORECARD",
    scorecard.assessedAt,
    scorecard.assessment.scope?.summary,
    `${profile.assessed} of 5 areas assessed. ${profile.repeatable} rated Repeatable or Established.`,
    scorecard.summary,
    aiScorecardCopy.methodology,
    ...profile.areas.flatMap((area) => [
      area.title.toUpperCase(),
      area.label,
      ...area.criteria.map(
        (criterion) =>
          `${criterion.label}: ${criterion.status}\n${criterion.question ? `Question: ${criterion.question}\n` : ""}${criterion.quote ? `Your answer: “${criterion.quote}”` : "Not yet answered"}`,
      ),
    ]),
    "WHAT TO DO NEXT",
    ...scorecard.nextMoves.flatMap((move) => [
      move.action,
      move.why,
      `First step: ${move.firstStep}`,
      `Check the result: ${move.check}`,
    ]),
    ...(scorecard.peers.length
      ? [
          "PEER CONTEXT",
          aiScorecardCopy.peerNote,
          ...scorecard.peers.flatMap((peer) => [
            peer.company,
            peer.practice,
            peer.relevance,
            peer.published ?? "Publication date unknown",
            `“${peer.source.quote}”`,
            `${peer.source.title}: ${peer.source.url}`,
          ]),
        ]
      : ["No comparable public example verified for this scorecard."]),
    "METHOD",
    "Three cumulative requirements per area: Started meets one, Repeatable meets two, Established meets all three. Not yet means the first requirement is absent. Unknown answers are never treated as zero. No percentile or industry ranking is calculated.",
    scorecard.version,
  ]
    .filter(Boolean)
    .join("\n\n");
}
