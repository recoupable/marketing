import { expect, test } from "vitest";
import { episodeEditions } from "../episodeEditions.ts";
import { editionLangFromSearch } from "../editionLangFromSearch.ts";
import { readEpisode } from "../readEpisode.ts";

test("a bilingual episode has an English and a Spanish edition, each with its own title, video, audio and summary", () => {
  const [en, es] = episodeEditions(readEpisode("marcelo-mazzini")!);
  expect(en.lang).toBe("en");
  expect(en.title).toBe("Every song is a brick in your estate");
  expect(en.links.youtube).toBe("https://www.youtube.com/watch?v=nCtMk58bTdU");
  expect(en.platformSuffix).toBe("");
  expect(es.lang).toBe("es");
  expect(es.title).toBe("Cada canción es un ladrillo de tu patrimonio");
  expect(es.links).toStrictEqual({
    youtube: "https://www.youtube.com/watch?v=YYiYg9nEMj0",
    spotify: "https://open.spotify.com/episode/4XJf5UMhpElwyubWFdGZXr",
  });
  expect(es.summary[0]).toMatch(/^Marcelo Mazzini dirige Marmaz Records/);
  expect(es.summary.join(" ")).not.toMatch(/English AI dub/);
  expect(es.platformSuffix).toBe("-es");
});

test("an episode without a Spanish edition has only its English edition", () => {
  const editions = episodeEditions(readEpisode("paula-moore")!);
  expect(editions.map((edition) => edition.lang)).toStrictEqual(["en"]);
});

test("?lang=es opens the Spanish edition only when the episode has one", () => {
  const bilingual = episodeEditions(readEpisode("marcelo-mazzini")!);
  const english = episodeEditions(readEpisode("paula-moore")!);
  expect(editionLangFromSearch("?lang=es", bilingual)).toBe("es");
  expect(editionLangFromSearch("?lang=en", bilingual)).toBe("en");
  expect(editionLangFromSearch("", bilingual)).toBe("en");
  expect(editionLangFromSearch("?lang=fr", bilingual)).toBe("en");
  expect(editionLangFromSearch("?lang=es", english)).toBe("en");
});
