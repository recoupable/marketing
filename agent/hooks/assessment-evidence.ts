import { defineHook } from "eve/hooks";
import {
  assessment,
  assessmentAnswers,
  assessmentReview,
} from "../lib/assessment";

export default defineHook({
  events: {
    "message.received"(event) {
      if (event.data.kind) return;
      const message = event.data.message.trim();
      assessmentAnswers.update((current) => ({
        messages: [...current.messages, message].slice(-60),
        pendingQuestion: null,
        answeredQuestions: [
          ...(current.answeredQuestions ?? []),
          ...(current.pendingQuestion
            ? [{ answer: message, question: current.pendingQuestion }]
            : []),
        ].slice(-60),
        partialRequested:
          /(?:scorecard|assessment|audit|results?)/i.test(message) &&
          /(?:now|so far|partial|what you have)/i.test(message),
      }));
      const review = assessmentReview.get();
      assessmentReview.update(() => ({
        snapshot: review.snapshot,
        confirmed:
          !!review.snapshot &&
          review.snapshot === JSON.stringify(assessment.get()) &&
          message.toLowerCase() === "show my scorecard",
      }));
    },
  },
});
