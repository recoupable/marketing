import { z } from "zod/v3";

export const questionSchema = z
  .object({
    context: z.string().max(180),
    insight: z
      .object({
        title: z.string().min(1).max(100),
        finding: z.string().min(1).max(320),
        implication: z.string().min(1).max(320),
        test: z.string().min(1).max(320),
        sources: z
          .array(
            z.object({
              title: z.string().min(1).max(100),
              url: z
                .string()
                .url()
                .refine((url) => url.startsWith("https://")),
              quote: z.string().min(1).max(180),
            }),
          )
          .min(1)
          .max(3),
      })
      .optional(),
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
