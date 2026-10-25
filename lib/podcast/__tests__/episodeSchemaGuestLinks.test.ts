import { expect, test } from "vitest";
import episodes from "../../../content/podcast/episodes.json";
import { episodeSchema } from "../episodeSchema.ts";

test("requires at least one guest link", () => {
  const [episode] = episodes;
  expect(episodeSchema.safeParse({ ...episode, guestLinks: [] }).success).toBe(false);
});
