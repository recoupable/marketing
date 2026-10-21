import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const source = join(process.cwd(), "content/docs/source");
const unsupported = [
  ["accounts", "get", "/api/admins/agent/signups"],
  ["releases", "get", "/api/catalogs/{catalogId}/valuations"],
  ["releases", "post", "/api/songs"],
  ...[
    "compose",
    "compose/detailed",
    "plan",
    "stream",
    "video-to-music",
    "stem-separation",
  ].map((name) => ["content", "post", `/api/music/${name}`]),
];

test("unimplemented contracts cannot generate executable API discovery", () => {
  const manifest = JSON.parse(
    readFileSync("content/docs/manifest.json", "utf8"),
  );
  for (const [name, method, path] of unsupported) {
    const spec = JSON.parse(
      readFileSync(join(source, `api-reference/openapi/${name}.json`), "utf8"),
    );
    expect(spec.paths[path]?.[method], `${method} ${path}`).toBeUndefined();
    expect(
      manifest.some(
        (page: { api?: { method: string; path: string } }) =>
          page.api?.method === method.toUpperCase() && page.api.path === path,
      ),
      `${method} ${path} in generated discovery`,
    ).toBe(false);
  }
});

test("existing help URLs retain unfinished outcomes and scoped alternatives", () => {
  const manifest = JSON.parse(
    readFileSync("content/docs/manifest.json", "utf8"),
  );
  for (const slug of [
    "songs/create",
    "songs/catalog-valuations",
    "admins/agent-signups",
  ]) {
    const page = manifest.find(
      (item: { slug: string }) => item.slug === `api-reference/${slug}`,
    );
    expect(page.api).toBeUndefined();
    expect(page.body).toContain("not available");
    expect(page.body).toContain("github.com/recoupable/mono/issues/");
  }
  const music = manifest.find(
    (page: { slug: string }) => page.slug === "api-reference/music/legacy",
  );
  expect(music.api).toBeUndefined();
  expect(music.body).toContain("POST /api/music");
  expect(music.body).toContain("not equivalent");
  for (const [, , path] of unsupported.filter(([name]) => name === "content")) {
    expect(music.body).toContain(path);
  }
});
