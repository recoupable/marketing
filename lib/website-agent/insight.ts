import { z } from "zod/v3";

export const insightSchema = z
  .object({
    sources: z
      .array(
        z.object({
          title: z.string().trim().min(1).max(100),
          url: z
            .string()
            .url()
            .refine((value) => {
              try {
                const url = new URL(value);
                return (
                  url.protocol === "https:" && !url.username && !url.password
                );
              } catch {
                // Refinements also run for unfinished URLs arriving in a stream.
                return false;
              }
            }),
          quote: z.string().trim().min(1).max(180),
        }),
      )
      .min(1)
      .max(3),
    title: z.string().trim().min(1).max(100),
    finding: z.string().trim().min(1).max(320),
    implication: z.string().trim().min(1).max(320),
    test: z.string().trim().min(1).max(320),
  })
  .strict();
