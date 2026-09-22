import { defineState } from "eve/context";

export const reportReview = defineState("recoup.website.reportReview", () => ({
  snapshot: null as string | null,
  confirmed: false,
}));
