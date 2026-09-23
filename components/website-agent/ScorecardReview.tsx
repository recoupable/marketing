import { ChevronDown } from "lucide-react";
import type { Assessment } from "@/lib/website-agent/scorecard";
import { getAssessmentProfile } from "@/lib/website-agent/getAssessmentProfile";

export function ScorecardReview({ assessment }: { assessment: Assessment }) {
  const profile = getAssessmentProfile(assessment);
  return (
    <section
      className="wa-assessment-review"
      aria-label="Check your assessment"
    >
      <span className="wa-scorecard-eyebrow">BEFORE YOUR SCORECARD</span>
      <h2>Here’s what I’ve understood.</h2>
      <p>{assessment.scope?.summary}</p>
      <div className="wa-assessment-review-areas">
        {profile.areas.map((area) => (
          <details key={area.id}>
            <summary>
              <span>{area.title}</span>
              <span>{area.label}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <ul>
              {area.criteria.map((criterion) => (
                <li key={criterion.id}>
                  <strong>{criterion.label}</strong>
                  <span>
                    {criterion.status === "unknown"
                      ? "Not yet answered"
                      : criterion.status === "yes"
                        ? "In place"
                        : "Not in place"}
                  </span>
                  {criterion.question && (
                    <span>In answer to: {criterion.question}</span>
                  )}
                  {criterion.quote && (
                    <blockquote>“{criterion.quote}”</blockquote>
                  )}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <p className="wa-scorecard-note">
        Open any area to check the answers behind it. You can correct these
        before we finish.
      </p>
    </section>
  );
}
