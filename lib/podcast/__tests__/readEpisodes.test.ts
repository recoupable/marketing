import { expect, test } from "vitest";
import { readEpisodes } from "../readEpisodes.ts";

test("the seeded episodes parse and sort newest first", () => {
  const episodes = readEpisodes();
  expect(episodes.length).toBe(6);
  const dates = episodes.map((episode) => episode.date);
  expect(dates).toStrictEqual([...dates].sort().reverse());
  expect(episodes[0]?.slug).toBe("xcelencia");
});

test("every seeded episode has a unique slug and a cover under /podcast/", () => {
  const episodes = readEpisodes();
  expect(new Set(episodes.map((episode) => episode.slug)).size).toBe(episodes.length);
  for (const episode of episodes) expect(episode.cover.startsWith("/podcast/")).toBe(true);
});
