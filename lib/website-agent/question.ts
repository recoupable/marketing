import { z } from "zod/v3";
import { insightSchema } from "./insight";

export const questionSchema = z
  .object({
    context: z.string().max(180),
    insight: insightSchema.optional(),
    question: z.string().min(1).max(100),
    options: z
      .array(
        z.object({
          label: z.string().min(1).max(48),
          description: z.string().max(100),
        }),
      )
      .min(2)
      .max(3),
  })
  .strict();
