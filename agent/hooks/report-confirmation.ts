import { defineHook } from "eve/hooks";
import { brief } from "../lib/brief";
import { reportReview } from "../lib/reportReview";

export default defineHook({
  events: {
    "message.received"(event) {
      if (event.data.kind) return;
      const review = reportReview.get();
      // The model cannot confirm its own summary; only a subsequent visitor message can.
      reportReview.update(() => ({
        snapshot: review.snapshot,
        confirmed:
          !!review.snapshot &&
          review.snapshot === JSON.stringify(brief.get()) &&
          event.data.message.trim().toLowerCase() === "build my report",
      }));
    },
  },
});
