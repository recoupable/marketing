import { aiScorecardCopy } from "@/lib/copy/ai-scorecard";
import {
  scorecardLevels,
  scorecardRubric,
} from "@/lib/website-agent/scorecardRubric";

// Illustrative levels only; never derived from the visitor's entry or session.
const exampleLevels = [2, 1, 1, 2, 0] as const;

export function ScorecardPreview() {
  const copy = aiScorecardCopy.example;

  return (
    <figure
      className="wa-audit-example"
      aria-label={`${copy.label}: ${copy.title}`}
    >
      <figcaption className="wa-audit-example-header">
        <span>{copy.label}</span>
        <h2>{copy.title}</h2>
      </figcaption>
      <dl className="wa-audit-example-ratings">
        {scorecardRubric.map((area, index) => {
          const level = exampleLevels[index];
          return (
            <div key={area.id}>
              <dt>{area.title}</dt>
              <dd>
                <span className="wa-audit-example-meter" aria-hidden="true">
                  {scorecardLevels.map((label, step) => (
                    <i key={label} data-reached={step <= level} />
                  ))}
                </span>
                <span>{scorecardLevels[level]}</span>
              </dd>
            </div>
          );
        })}
      </dl>
      <div className="wa-audit-example-next">
        <span>{copy.nextLabel}</span>
        <p>{copy.nextAction}</p>
      </div>
    </figure>
  );
}
