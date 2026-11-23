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
  /** The original Spanish recording of a dubbed episode: the page's ES edition (title, video, audio and its published description). */
  spanish: z
    .object({
      title: z.string().min(1),
      youtube: z.string().url(),
      spotify: z.string().url(),
      summary: z.array(z.string().min(1)).min(1).optional(),
    })
    .optional(),
  /** The episode page's summary, one string per paragraph (the published episode description, without links). */
  summary: z.array(z.string().min(1)).min(1),
  /** The guest's own links, shown on the episode page. */
  guestLinks: z.array(z.object({ label: z.string().min(1), href: z.string().url() })).min(1),
});

export type Episode = z.infer<typeof episodeSchema>;
