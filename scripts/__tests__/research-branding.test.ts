import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = new URL("../../content/docs/source/", import.meta.url).pathname;

function publishedFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? publishedFiles(path) : [path];
  });
}

describe("Recoup research documentation", () => {
  it("keeps provider branding and credential operations out of published contracts", () => {
    for (const path of publishedFiles(source)) {
      if (!/\.(mdx|json)$/.test(path)) continue;
      expect(readFileSync(path, "utf8"), path).not.toMatch(
        /songstats|production.{0,30}key/i,
      );
      if (path.endsWith("openapi/research.json")) {
        expect(readFileSync(path, "utf8")).not.toMatch(/chartmetric|apify/i);
      }
    }
  });

  it("documents supported portable track selectors without inventing an API alias", () => {
    const spec = JSON.parse(
      readFileSync(join(source, "api-reference/openapi/research.json"), "utf8"),
    );
    const parameters = spec.paths["/api/research/track/stats"].get.parameters;
    expect(
      parameters
        .filter(
          (parameter: { name: string }) =>
            parameter.name.endsWith("track_id") || parameter.name === "isrc",
        )
        .map((parameter: { name: string }) => parameter.name),
    ).toEqual(["isrc", "spotify_track_id", "apple_music_track_id"]);
    expect(
      parameters.find(
        (parameter: { name: string }) => parameter.name === "source",
      ).required,
    ).toBe(true);
  });
});
