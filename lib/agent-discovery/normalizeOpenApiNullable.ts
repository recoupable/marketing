import type { ApiObject } from "../docs-server";

/** Translate legacy nullable declarations in published schemas to OpenAPI 3.1. */
export function normalizeOpenApiNullable(
  value: unknown,
  schemaMap = false,
): unknown {
  if (Array.isArray(value))
    return value.map((child) => normalizeOpenApiNullable(child));
  if (!value || typeof value !== "object") return value;
  const schema: ApiObject = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      !schemaMap &&
      ["example", "examples", "default", "const", "enum"].includes(key)
        ? structuredClone(child)
        : normalizeOpenApiNullable(
            child,
            [
              "properties",
              "patternProperties",
              "$defs",
              "definitions",
              "schemas",
            ].includes(key),
          ),
    ]),
  );
  const nullable = schema.nullable;
  if (schemaMap || typeof nullable !== "boolean") return schema;
  delete schema.nullable;
  if (!nullable) return schema;
  if (typeof schema.type === "string" || Array.isArray(schema.type)) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    schema.type = [...new Set([...types, "null"])];
    if (schema.enum && !schema.enum.includes(null))
      schema.enum = [...schema.enum, null];
    return schema;
  }
  if (schema.$ref || schema.oneOf || schema.anyOf || schema.allOf) {
    const { description, ...validation } = schema;
    return {
      ...(description === undefined ? {} : { description }),
      anyOf: [validation, { type: "null" }],
    };
  }
  // An unconstrained schema already accepts null.
  return schema;
}
