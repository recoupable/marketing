import type { Assessment } from "./scorecard";
import { scorecardLevels, scorecardRubric } from "./scorecardRubric";

export function getAssessmentProfile(assessment: Assessment) {
  const areas = scorecardRubric.map((area) => {
    const criteria = area.criteria.map((criterion) => ({
      ...criterion,
      status:
        assessment.criteria.find((item) => item.id === criterion.id)?.status ??
        "unknown",
      question:
        assessment.criteria.find((item) => item.id === criterion.id)
          ?.question ?? null,
      quote:
        assessment.criteria.find((item) => item.id === criterion.id)?.quote ??
        null,
    }));
    const answered = criteria.filter(
      (item) => item.status !== "unknown",
    ).length;
    const consistent = !criteria.some(
      (item, index) =>
        item.status === "yes" &&
        criteria.slice(0, index).some((earlier) => earlier.status === "no"),
    );
    // Unknown is never a zero. A rating needs every criterion resolved consistently.
    const level =
      answered === 3 && consistent
        ? criteria.findIndex((item) => item.status !== "yes") === -1
          ? 3
          : criteria.findIndex((item) => item.status !== "yes")
        : null;
    return {
      ...area,
      criteria,
      answered,
      level,
      label: level === null ? "Not assessed" : scorecardLevels[level],
    };
  });
  const assessed = areas.filter((area) => area.level !== null).length;
  const repeatable = areas.filter(
    (area) => area.level !== null && area.level >= 2,
  ).length;
  return {
    areas,
    assessed,
    repeatable,
    complete: assessed === 5 && !!assessment.scope && !!assessment.priority,
    missing: [
      ...(!assessment.scope
        ? ["the role and team this assessment covers"]
        : []),
      ...(!assessment.priority
        ? ["the business result the visitor cares about"]
        : []),
      ...areas.flatMap((area) =>
        area.criteria
          .filter((item) => item.status === "unknown")
          .map((item) => `${area.title}: ${item.label}`),
      ),
    ],
  };
}
