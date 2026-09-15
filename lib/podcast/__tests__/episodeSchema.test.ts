import { describe, expect, test } from "vitest";
import { episodeSchema } from "../episodeSchema.ts";

const valid = {
  slug: "xcelencia",
  title: "The $100K playbook of an independent artist",
  guest: "Xcelencia",
  role: "Independent artist and technologist",
  date: "2024-12-08",
  durationSeconds: 2437,
  cover: "/podcast/xcelencia-wide.jpg",
  links: { spotify: "https://open.spotify.com/episode/4gIQjPCwCOpNdzoi8HQDjL", youtube: "https://www.youtube.com/watch?v=ZXLjcYggrwc" },
};

describe("episodeSchema", () => {
  test("accepts a complete episode", () => {
    expect(episodeSchema.parse(valid)).toStrictEqual(valid);
  });
  test("names the missing field when the Spotify link is absent", () => {
    const result = episodeSchema.safeParse({ ...valid, links: { youtube: valid.links.youtube } });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0]?.path.join(".")).toBe("links.spotify");
  });
  test("rejects a non-ISO date and a non-positive duration", () => {
    expect(episodeSchema.safeParse({ ...valid, date: "Dec 8 2024" }).success).toBe(false);
    expect(episodeSchema.safeParse({ ...valid, durationSeconds: 0 }).success).toBe(false);
  });
});
