import { expect, test } from "vitest";
import { readEpisode } from "../../podcast/readEpisode.ts";
import { spanishEditionLines } from "../spanishEditionLines.ts";

test("a dubbed episode's markdown lists its Spanish title and links", () => {
  const lines = spanishEditionLines(readEpisode("marcelo-mazzini")!);
  expect(lines).toStrictEqual([
    "## En español",
    "Cada canción es un ladrillo de tu patrimonio",
    "- [YouTube](https://www.youtube.com/watch?v=YYiYg9nEMj0)",
    "- [Spotify](https://open.spotify.com/episode/4XJf5UMhpElwyubWFdGZXr)",
  ]);
});

test("an episode without a Spanish edition adds no lines", () => {
  expect(spanishEditionLines(readEpisode("paula-moore")!)).toStrictEqual([]);
});
