import type { Episode } from "./episodeSchema.ts";

export type EpisodeAction = { label: "Watch now" | "Listen now"; href: string; platform: "youtube" | "spotify" };

/** The card's one action: video where it exists, otherwise the Spotify audio. */
export function episodeAction(links: Episode["links"]): EpisodeAction {
  return links.youtube
    ? { label: "Watch now", href: links.youtube, platform: "youtube" }
    : { label: "Listen now", href: links.spotify, platform: "spotify" };
}
