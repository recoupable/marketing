import type { EditionLang, EpisodeEdition } from "./episodeEditions.ts";

/** The edition a link opens: `?lang=es` picks the Spanish edition when the episode has one; anything else is English. */
export function editionLangFromSearch(search: string, editions: Pick<EpisodeEdition, "lang">[]): EditionLang {
  const lang = new URLSearchParams(search).get("lang");
  return editions.some((edition) => edition.lang === lang) && lang === "es" ? "es" : "en";
}
