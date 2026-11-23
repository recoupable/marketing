import type { Episode } from "./episodeSchema.ts";

export type EditionLang = "en" | "es";

/** One language edition of an episode: what the page's title, listen links, video and summary show for it. */
export type EpisodeEdition = {
  lang: EditionLang;
  title: string;
  links: Episode["links"];
  summary: string[];
  /** Appended to the platform in click analytics, so the Spanish edition's plays are told apart ("youtube-es"). */
  platformSuffix: string;
};

/** The episode's editions, English first; a dubbed episode adds its original Spanish recording. */
export function episodeEditions(episode: Episode): EpisodeEdition[] {
  const english: EpisodeEdition = { lang: "en", title: episode.title, links: episode.links, summary: episode.summary, platformSuffix: "" };
  if (!episode.spanish) return [english];
  const { title, youtube, spotify, summary } = episode.spanish;
  return [english, { lang: "es", title, links: { youtube, spotify }, summary: summary ?? episode.summary, platformSuffix: "-es" }];
}
