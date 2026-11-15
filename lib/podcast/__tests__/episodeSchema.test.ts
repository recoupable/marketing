import { describe, expect, test } from "vitest";
import { episodeSchema } from "../episodeSchema.ts";

const valid = {
  slug: "zac-kubilus",
  title: "From a #4 country album to box fans",
  guest: "Zac Kubilus",
  role: "Producer · Founder, Sleep Sounds",
  date: "2026-11-08",
  durationSeconds: 1437,
  cover: "/podcast/zac-kubilus-wide.jpg",
  links: { spotify: "https://open.spotify.com/episode/2Rmbz625NsqPGqvbBFCm1j", youtube: "https://www.youtube.com/watch?v=hfAY1PN-t9Q" },
  summary: ["Zac Kubilus produced Frank Foster's Rhythm and Whiskey."],
  guestLinks: [{ label: "Sleep Sounds", href: "https://sleepsounds.org/" }],
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
  test("requires at least one summary paragraph", () => {
    expect(episodeSchema.safeParse({ ...valid, summary: [] }).success).toBe(false);
  });
  test("rejects a non-ISO date, an impossible calendar date, and a non-positive duration", () => {
    expect(episodeSchema.safeParse({ ...valid, date: "Nov 8 2026" }).success).toBe(false);
    expect(episodeSchema.safeParse({ ...valid, date: "2026-02-30" }).success).toBe(false);
    expect(episodeSchema.safeParse({ ...valid, durationSeconds: 0 }).success).toBe(false);
  });
});
