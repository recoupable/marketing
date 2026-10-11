import type { Episode } from "./episodeSchema.ts";
import { episodePath } from "./episodePath.ts";

export type EpisodeAction = { label: "Watch now" | "Listen now"; href: string };

/** The card's one action: opens the episode page, worded for video where the episode has it, audio otherwise. */
export function episodeAction(episode: Pick<Episode, "slug" | "links">): EpisodeAction {
  return { label: episode.links.youtube ? "Watch now" : "Listen now", href: episodePath(episode.slug) };
}
