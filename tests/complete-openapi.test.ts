import { expect, test } from "vitest";
import inventory from "../content/docs/inventory.json";
import { websiteOpenAPI } from "../lib/agent-openapi";
import { getCompleteOpenAPI } from "../lib/agent-discovery/getCompleteOpenAPI";
import { namespaceOpenApiComponents } from "../lib/agent-discovery/namespaceOpenApiComponents";
import { normalizeOpenApiNullable } from "../lib/agent-discovery/normalizeOpenApiNullable";
import { getDocSpec, type ApiObject } from "../lib/docs-server";

const methods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
]);

test("the complete contract preserves all source operations, URLs, security and request/response shapes", async () => {
  const combined = await getCompleteOpenAPI();
  const sources = [
    { namespace: "website", spec: websiteOpenAPI() as ApiObject },
    ...(await Promise.all(
      inventory.specifications.map(async (name) => ({
        namespace: name.replace(".json", ""),
        spec: await getDocSpec(name),
      })),
    )),
  ];
  let count = 0;
  for (const { namespace, spec } of sources) {
    const serializedBefore = JSON.stringify(spec);
    for (const [path, rawItem] of Object.entries(spec.paths)) {
      const item = rawItem as ApiObject;
      for (const [method, rawOperation] of Object.entries(item)) {
        if (!methods.has(method)) continue;
        count++;
        const original = rawOperation as ApiObject;
        const operation = combined.paths[path][method];
        // Restore names solely to compare the complete operation with its source.
        const restored = JSON.parse(
          JSON.stringify(operation).replaceAll(`${namespace}__`, ""),
        );
        delete restored["x-source-specification"];
        expect(restored).toEqual(
          normalizeOpenApiNullable({
            ...original,
            servers: original.servers ?? item.servers ?? spec.servers,
            security: original.security ?? spec.security ?? [],
          }),
        );
      }
    }
    {
      for (const [kind, entries] of Object.entries(spec.components ?? {})) {
        for (const [name, component] of Object.entries(entries as ApiObject)) {
          const key = namespace === "website" ? name : `${namespace}__${name}`;
          const restored = JSON.parse(
            JSON.stringify(combined.components[kind][key]).replaceAll(
              `${namespace}__`,
              "",
            ),
          );
          expect(restored, `${namespace}: ${kind}/${name}`).toEqual(
            normalizeOpenApiNullable(component),
          );
        }
      }
    }
    expect(JSON.stringify(spec)).toBe(serializedBefore);
  }
  expect(count).toBe(217);
  expect(
    Object.values(combined.paths).flatMap((item) =>
      Object.keys(item as ApiObject).filter((method) => methods.has(method)),
    ),
  ).toHaveLength(count);
  expect(combined.paths["/batch"].post.servers[0].url).toBe(
    "https://recoupable.dev/agent-api/v1",
  );
  expect(combined["x-api-versioning"].scope).toContain("website");
  expect(combined["x-api-versioning"].deprecation.scheduled).toBe(false);
});

test("all bundled references and security requirements resolve without schema-name collisions", async () => {
  const combined = await getCompleteOpenAPI();
  const visit = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    const record = value as ApiObject;
    if (record.$ref) {
      let resolved = combined;
      for (const key of record.$ref.slice(2).split("/")) {
        resolved = resolved?.[key.replaceAll("~1", "/").replaceAll("~0", "~")];
      }
      expect(resolved, record.$ref).toBeDefined();
    }
    Object.values(record).forEach(visit);
  };
  visit(combined);
  for (const item of Object.values(combined.paths) as ApiObject[]) {
    for (const [method, operation] of Object.entries(item)) {
      if (!methods.has(method)) continue;
      for (const requirement of (operation as ApiObject).security) {
        for (const name of Object.keys(requirement)) {
          expect(combined.components.securitySchemes[name], name).toBeDefined();
        }
      }
    }
  }
  expect(combined.components.schemas.ErrorResponse).toEqual(
    websiteOpenAPI().components.schemas.ErrorResponse,
  );
  expect(
    combined.components.schemas.projects__ProjectTask.properties.description,
  ).toMatchObject({
    type: ["string", "null"],
  });
});

test("component names are isolated and unsupported references fail visibly", () => {
  const source = {
    openapi: "3.1.0",
    paths: {},
    components: { schemas: { Error: { type: "string" } } },
  };
  expect(
    namespaceOpenApiComponents(source, "one").components.schemas.one__Error,
  ).toEqual({ type: "string" });
  expect(
    namespaceOpenApiComponents(source, "two").components.schemas.two__Error,
  ).toEqual({ type: "string" });
  expect(() =>
    namespaceOpenApiComponents(
      {
        ...source,
        paths: { "/read": { $ref: "external.json#/paths/read" } },
      },
      "one",
    ),
  ).toThrow("Unsupported reference");
});
