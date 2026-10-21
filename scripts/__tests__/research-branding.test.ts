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

function contextWithoutCompatibilityIdentifiers(text: string): string {
  const spec = JSON.parse(text);
  const node =
    spec.components.schemas.ContextCatalogPlanningResponse.properties.plan.items
      .properties;
  expect(node.module.enum).toEqual([
    "musicbrainz",
    "mlc_recording",
    "songstats",
  ]);
  node.module.enum[2] = "legacy_platform_module";
  expect(node.executor.enum[2]).toBe("collectContextSongstats");
  node.executor.enum[2] = "legacy_platform_executor";

  const modulePlan =
    spec.components.schemas.ContextModulePlanResponse.properties.plan.items
      .properties;
  expect(modulePlan.module.enum).toEqual([
    "musicbrainz",
    "mlc_recording",
    "mlc_search",
    "mlc_work",
    "songstats",
    "saved_socials",
    "catalog_valuation",
    "company_research",
    "campaign_context",
    "release_expansion",
    "spotify_release",
    "material_extraction",
    "songwriter_research",
  ]);
  modulePlan.module.enum[4] = "legacy_platform_module";

  const operation = spec.paths["/api/context"].post;
  const request = operation.requestBody.content[
    "application/json"
  ].schema.oneOf.find(
    (schema: { properties: { action: { const: string } } }) =>
      schema.properties.action.const === "plan_catalog_members",
  );
  expect(request.properties.module.enum).toEqual([
    "recording_candidates",
    "recording_work_candidates",
    "platform_metadata",
    "musicbrainz",
    "mlc_recording",
    "songstats",
  ]);
  request.properties.module.enum[5] = "legacy_platform_module";
  operation.description = operation.description.replace(
    /^(\| `platform_metadata` \| [^|\n]* \| )`songstats`( \|)$/m,
    "$1`legacy_platform_module`$2",
  );

  const example =
    operation.responses["200"].content["application/json"].examples
      .catalogPlanPlatform.value.plan[0];
  expect(example.module).toBe("songstats");
  expect(example.executor).toBe("collectContextSongstats");
  expect(example.key).toBe(`${example.subjectId}:songstats`);
  example.module = "legacy_platform_module";
  example.executor = "legacy_platform_executor";
  example.key = `${example.subjectId}:legacy_platform_module`;
  const plan =
    operation.responses["200"].content["application/json"].examples
      .contextActionPlan.value.plan;
  const platform = plan.find(
    (item: { module: string }) => item.module === "songstats",
  );
  expect(platform.executor).toBe("collectContextSongstats");
  expect(platform.key).toBe(`${platform.subjectId}:songstats`);
  expect(platform.executionStarted).toBe(false);
  platform.module = "legacy_platform_module";
  platform.executor = "legacy_platform_executor";
  platform.key = `${platform.subjectId}:legacy_platform_module`;
  return JSON.stringify(spec);
}

describe("Recoup research documentation", () => {
  it("keeps provider branding and credential operations out of published contracts", () => {
    for (const path of publishedFiles(source)) {
      if (!/\.(mdx|json)$/.test(path)) continue;
      const text = readFileSync(path, "utf8");
      // #329 preserves exact legacy wire values; no other public copy is exempt.
      const copy = path.endsWith("openapi/context.json")
        ? contextWithoutCompatibilityIdentifiers(text)
        : text;
      expect(copy, path).not.toMatch(/songstats|production.{0,30}key/i);
      if (path.endsWith("openapi/research.json")) {
        expect(readFileSync(path, "utf8")).not.toMatch(/chartmetric|apify/i);
      }
    }
  });

  it("still rejects provider branding outside the exact Context compatibility fields", () => {
    const spec = JSON.parse(
      readFileSync(join(source, "api-reference/openapi/context.json"), "utf8"),
    );
    spec.paths["/api/context"].post.description += "\nPowered by Songstats.";
    expect(
      contextWithoutCompatibilityIdentifiers(JSON.stringify(spec)),
    ).toMatch(/songstats/i);
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
