import { readdirSync } from "node:fs";
import { expect, test } from "vitest";
import { podcastCopy } from "@/lib/copy/podcast";
import { readEpisodes } from "../readEpisodes.ts";
import { readTranscript } from "../readTranscript.ts";

test("every Spanish transcript belongs to an episode with a Spanish edition and follows its English timing", () => {
  const files = readdirSync("content/podcast/transcripts/es").filter((file) => file.endsWith(".json"));
  expect(files).toContain("marcelo-mazzini.json");
  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    const episode = readEpisodes().find((candidate) => candidate.slug === slug);
    expect(episode?.spanish, slug).toBeDefined();
    const spanish = readTranscript(slug, "es")!;
    const english = readTranscript(slug)!;
    expect(spanish.map(({ speaker, start }) => `${start}-${speaker}`)).toStrictEqual(english.map(({ speaker, start }) => `${start}-${speaker}`));
  }
});

test("Marcelo's Spanish transcript opens with the cold open and spells the names as published", () => {
  const text = readTranscript("marcelo-mazzini", "es")!.flatMap((turn) => turn.paragraphs).join(" ");
  expect(text).toMatch(/^Al artista nosotros siempre le explicamos: cada canción es como un ladrillo/);
  expect(text).toContain("Marmaz Records");
  expect(text).not.toMatch(/Marma(s|r|'s)?\b/);
  expect(text).not.toMatch(/San Alejo|Polygram|Galavitz|Bla, bla/);
});

test("an episode without a Spanish recording has no Spanish transcript", () => {
  expect(readTranscript("paula-moore", "es")).toBeUndefined();
});

test("the transcript's labels follow the edition's language", () => {
  expect(podcastCopy.episode.editions.en.transcript.heading).toBe("Full transcript");
  expect(podcastCopy.episode.editions.es.transcript.heading).toBe("Transcripción completa");
  expect(podcastCopy.episode.editions.es.transcript.copy).toBe("Copiar transcripción");
});
