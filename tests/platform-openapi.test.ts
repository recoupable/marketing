import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const directory = join(
  process.cwd(),
  "content/docs/source/api-reference/openapi",
);
const methods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
]);

test("every platform operation has a stable, unambiguous function-calling identity", () => {
  const identities = new Map<string, string>();
  for (const filename of readdirSync(directory).filter((name) =>
    name.endsWith(".json"),
  )) {
    const spec = JSON.parse(readFileSync(join(directory, filename), "utf8"));
    for (const [path, item] of Object.entries(
      spec.paths as Record<
        string,
        Record<string, { operationId?: string; description?: string }>
      >,
    )) {
      for (const [method, operation] of Object.entries(item)) {
        if (!methods.has(method)) continue;
        const identity = `${method.toUpperCase()} ${path}`;
        expect(operation.operationId, `${filename}: ${identity}`).toMatch(
          /^[a-zA-Z][a-zA-Z0-9_]*$/,
        );
        expect(
          operation.description?.trim(),
          `${identity} needs an operation description`,
        ).toBeTruthy();
        const previous = identities.get(operation.operationId!);
        expect(
          previous === undefined || previous === identity,
          `${operation.operationId} identifies different operations`,
        ).toBe(true);
        identities.set(operation.operationId!, identity);
      }
    }
  }
  expect(identities.size).toBeGreaterThan(200);
});
