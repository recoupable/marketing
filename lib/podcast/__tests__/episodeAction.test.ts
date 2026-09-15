import { expect, test } from "vitest";
import { episodeAction } from "../episodeAction.ts";

const links = { spotify: "https://open.spotify.com/episode/abc" };

test("an episode with a YouTube link reads Watch now and opens YouTube", () => {
  expect(episodeAction({ ...links, youtube: "https://www.youtube.com/watch?v=xyz" })).toStrictEqual({
    label: "Watch now", href: "https://www.youtube.com/watch?v=xyz", platform: "youtube",
  });
});

test("an audio-only episode reads Listen now and opens Spotify", () => {
  expect(episodeAction(links)).toStrictEqual({ label: "Listen now", href: links.spotify, platform: "spotify" });
});
