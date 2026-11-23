import { expect, test } from "vitest";
import { episodeSchema } from "../episodeSchema.ts";
import { readEpisode } from "../readEpisode.ts";

test("a bilingual episode carries its Spanish title, YouTube and Spotify links", () => {
  const spanish = readEpisode("marcelo-mazzini")?.spanish;
  expect(spanish?.title).toBe("Cada canción es un ladrillo de tu patrimonio");
  expect(spanish?.youtube).toBe("https://www.youtube.com/watch?v=YYiYg9nEMj0");
  expect(spanish?.spotify).toBe("https://open.spotify.com/episode/4XJf5UMhpElwyubWFdGZXr");
  expect(spanish?.summary).toHaveLength(3);
});

test("the Spanish edition is optional and its links must be URLs", () => {
  const episode = readEpisode("paula-moore")!;
  expect(episode.spanish).toBeUndefined();
  const valid = { title: "Título", youtube: "https://www.youtube.com/watch?v=x", spotify: "https://open.spotify.com/episode/x" };
  expect(episodeSchema.safeParse({ ...episode, spanish: valid }).success).toBe(true);
  expect(episodeSchema.safeParse({ ...episode, spanish: { ...valid, youtube: "not a url" } }).success).toBe(false);
  expect(episodeSchema.safeParse({ ...episode, spanish: { ...valid, spotify: "not a url" } }).success).toBe(false);
  expect(episodeSchema.safeParse({ ...episode, spanish: { ...valid, summary: [] } }).success).toBe(false);
});
