import { resolveReference, schemaExample, type ApiObject } from "@/lib/docs-server";
import type { PlaygroundFormField } from "./types";

/** Lists the parts of a multipart body from its object schema; file parts are flagged binary. */
export function summarizeFormFields(schema: ApiObject, spec: ApiObject, example: unknown): PlaygroundFormField[] {
  const resolved = resolveReference(schema, spec);
  const given = example && typeof example === "object" ? (example as Record<string, unknown>) : {};
  return Object.entries(resolved.properties ?? {}).map(([name, raw]) => {
    const property = resolveReference(raw as ApiObject, spec);
    const binary = property.format === "binary" || property.items?.format === "binary";
    const value = binary ? undefined : (given[name] ?? property.example ?? schemaExample(property, spec));
    const example = value === undefined || value === "string" ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
    return { name, required: Boolean(resolved.required?.includes(name)), binary, example };
  });
}
