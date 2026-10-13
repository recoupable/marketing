import { readFileSync, readdirSync } from "node:fs";
import { expect, test } from "vitest";
import { validateOpenApiSecuritySchemes } from "../lib/docs/validateOpenApiSecuritySchemes";

const directory = new URL(
  "../content/docs/source/api-reference/openapi/",
  import.meta.url,
);

test("every maintained specification declares its security scheme references", () => {
  const names = readdirSync(directory).filter((name) => name.endsWith(".json"));
  expect(names.length).toBeGreaterThan(0);
  for (const name of names) {
    const spec = JSON.parse(readFileSync(new URL(name, directory), "utf8"));
    expect(validateOpenApiSecuritySchemes(spec), name).toEqual([]);
  }
});

test("removing the real callback scheme is caught", () => {
  const spec = JSON.parse(
    readFileSync(new URL("content.json", directory), "utf8"),
  );
  delete spec.components.securitySchemes.callbackSecret;
  expect(validateOpenApiSecuritySchemes(spec)).toContain(
    "POST /api/content-agent/callback: undefined security scheme callbackSecret",
  );
});

test("root security references resolve, while public operations and example fields are ignored", () => {
  const spec = {
    security: [{ unknown: [] }],
    paths: {
      "/public": {
        get: {
          security: [],
          responses: { "200": { example: { security: [{ arbitrary: [] }] } } },
        },
      },
    },
  };
  expect(validateOpenApiSecuritySchemes(spec)).toEqual([
    "root: undefined security scheme unknown",
  ]);
});

test("alternative declared schemes and anonymous requirements are valid", () => {
  expect(
    validateOpenApiSecuritySchemes({
      components: { securitySchemes: { apiKey: {}, oauth: {} } },
      paths: {
        "/private": {
          post: { security: [{ apiKey: [] }, { oauth: ["read"] }, {}] },
        },
      },
    }),
  ).toEqual([]);
});
