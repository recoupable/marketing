import { defineState } from "eve/context";
import type { Assessment } from "../../lib/website-agent/scorecard";

export const assessment = defineState(
  "recoup.website.assessment",
  (): Assessment => ({
    scope: null,
    priority: null,
    criteria: [],
  }),
);
export const assessmentReview = defineState(
  "recoup.website.assessment-review",
  () => ({
    snapshot: null as string | null,
    confirmed: false,
  }),
);
export const assessmentAnswers = defineState(
  "recoup.website.assessment-answers",
  () => ({
    messages: [] as string[],
    partialRequested: false,
    pendingQuestion: null as string | null,
    answeredQuestions: [] as { answer: string; question: string }[],
  }),
);
