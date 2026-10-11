import { readEpisodes } from "./readEpisodes.ts";
import type { Episode } from "./episodeSchema.ts";

/** One published episode by slug, or undefined when no episode has that slug. */
export function readEpisode(slug: string): Episode | undefined {
  return readEpisodes().find((episode) => episode.slug === slug);
}
