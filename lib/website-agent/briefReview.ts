import { z } from "zod/v3";
import { questionSchema } from "./question";

export const briefReviewSchema = questionSchema.extend({
  recap: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1)
    .max(6),
});
