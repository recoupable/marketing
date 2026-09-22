import { z } from "zod/v3";

/** One published episode of the Recoup Podcast, as stored in content/podcast/episodes.json. */
export const episodeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  guest: z.string().min(1),
  role: z.string().min(1),
  date: z.string().date(),
  durationSeconds: z.number().int().positive(),
  cover: z.string().startsWith("/podcast/"),
  links: z.object({
    spotify: z.string().url(),
    youtube: z.string().url().optional(),
    apple: z.string().url().optional(),
  }),
});

export type Episode = z.infer<typeof episodeSchema>;
