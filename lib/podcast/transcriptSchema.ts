import { z } from "zod/v3";

/** An episode transcript as published on its page: speaker turns built from the aired captions. */
export const transcriptSchema = z.array(
  z.object({
    speaker: z.string().min(1),
    /** Seconds into the published video where the turn starts. */
    start: z.number().nonnegative(),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
);

export type Transcript = z.infer<typeof transcriptSchema>;
