import { defineState } from "eve/context";

// Session-scoped evidence, never shared between visitors.
export const research = defineState(
  "recoup.website.research",
  () => ({}) as Record<string, string>,
);
