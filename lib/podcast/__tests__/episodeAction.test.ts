import { expect, test } from "vitest";
import { episodeAction } from "../episodeAction.ts";

const links = { spotify: "https://open.spotify.com/episode/abc" };

test("an episode with a YouTube link reads Watch now and opens its episode page", () => {
  expect(episodeAction({ slug: "jesse-kirshbaum", links: { ...links, youtube: "https://www.youtube.com/watch?v=xyz" } })).toStrictEqual({
    label: "Watch now", href: "/podcast/jesse-kirshbaum",
  });
});

test("an audio-only episode reads Listen now and opens its episode page", () => {
  expect(episodeAction({ slug: "kantor", links })).toStrictEqual({ label: "Listen now", href: "/podcast/kantor" });
});
