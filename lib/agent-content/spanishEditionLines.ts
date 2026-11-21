import { podcastCopy } from "../copy/podcast.ts";
import type { Episode } from "../podcast/episodeSchema.ts";

/** The markdown section for a dubbed episode's original Spanish recording, matching the page's "En español" line. */
export function spanishEditionLines(episode: Episode): string[] {
  if (!episode.spanish) return [];
  const copy = podcastCopy.episode.spanish;
  return [
    `## ${copy.kicker}`,
    episode.spanish.title,
    `- [${copy.youtube}](${episode.spanish.youtube})`,
    `- [${copy.spotify}](${episode.spanish.spotify})`,
  ];
}
