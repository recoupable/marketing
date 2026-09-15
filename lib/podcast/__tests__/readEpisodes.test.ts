import { expect, test } from "vitest";
import episodes from "../../../content/podcast/episodes.json";
import { readEpisodes } from "../readEpisodes.ts";

test("the seeded episodes parse and keep the curated file order", () => {
  const parsed = readEpisodes();
  expect(parsed.length).toBe(6);
  expect(parsed.map((episode) => episode.slug)).toStrictEqual(episodes.map((episode) => episode.slug));
  expect(parsed[0]?.slug).toBe("xcelencia");
});

test("every seeded episode has a unique slug and a cover under /podcast/", () => {
  const parsed = readEpisodes();
  expect(new Set(parsed.map((episode) => episode.slug)).size).toBe(parsed.length);
  for (const episode of parsed) expect(episode.cover.startsWith("/podcast/")).toBe(true);
});
