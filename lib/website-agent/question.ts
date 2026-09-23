import { z } from "zod/v3";
import { insightSchema } from "./insight";

export const questionSchema = z
  .object({
    message: z
      .string()
      .trim()
      .min(1)
      .max(360)
      .describe(
        "One or two conversational sentences shown in the chat before the question. At the start, explain the research and invite an answer while it runs. For follow-ups, respond specifically to what the visitor just said and connect it to the next question. Do not repeat the question or make unsourced company claims.",
      )
      .optional(),
    context: z.string().max(180),
    insight: insightSchema.optional(),
    question: z.string().min(1).max(100),
    options: z
      .array(
        z.object({
          label: z.string().min(1).max(80),
          description: z.string().max(100),
        }),
      )
      .min(2)
      .max(4),
  })
  .strict();
