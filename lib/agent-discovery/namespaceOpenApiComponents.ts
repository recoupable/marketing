import type { ApiObject } from "../docs-server";
import { normalizeOpenApiNullable } from "./normalizeOpenApiNullable";

/** Isolate a source document's references before combining independent contracts. */
export function namespaceOpenApiComponents(
  source: ApiObject,
  namespace: string,
): ApiObject {
  const rewrite = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(rewrite);
    if (!value || typeof value !== "object") return value;
    const result: ApiObject = {};
    for (const [key, child] of Object.entries(value)) {
      if (key === "$ref" && typeof child === "string") {
        if (!child.startsWith("#/components/")) {
          throw new Error(`Unsupported reference in ${namespace}: ${child}`);
        }
        result[key] = child.replace(
          /^(#\/components\/[^/]+\/)/,
          `$1${namespace}__`,
        );
      } else {
        result[key] = rewrite(child);
      }
    }
    return result;
  };
  const document = rewrite(normalizeOpenApiNullable(source)) as ApiObject;
  document.components = Object.fromEntries(
    Object.entries(document.components ?? {}).map(([kind, entries]) => [
      kind,
      Object.fromEntries(
        Object.entries(entries as ApiObject).map(([name, value]) => [
          `${namespace}__${name}`,
          value,
        ]),
      ),
    ]),
  );
  const security = (requirements: Record<string, string[]>[]) =>
    requirements.map((requirement) =>
      Object.fromEntries(
        Object.entries(requirement).map(([name, scopes]) => [
          `${namespace}__${name}`,
          scopes,
        ]),
      ),
    );
  if (document.security) document.security = security(document.security);
  for (const item of Object.values(document.paths) as ApiObject[]) {
    for (const method of [
      "get",
      "post",
      "put",
      "patch",
      "delete",
      "head",
      "options",
      "trace",
    ]) {
      if (item[method]?.security)
        item[method].security = security(item[method].security);
    }
  }
  return document;
}
