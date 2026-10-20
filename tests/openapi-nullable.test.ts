import { expect, test } from "vitest";
import { normalizeOpenApiNullable } from "../lib/agent-discovery/normalizeOpenApiNullable";

test.each([
  [{ type: "string", nullable: true }, { type: ["string", "null"] }],
  [
    { type: "integer", minimum: 0, nullable: true },
    { type: ["integer", "null"], minimum: 0 },
  ],
  [
    { type: "string", enum: ["active"], nullable: true },
    { type: ["string", "null"], enum: ["active", null] },
  ],
  [
    { type: "array", items: { type: "string" }, nullable: true },
    { type: ["array", "null"], items: { type: "string" } },
  ],
  [
    { nullable: true, description: "Unknown payload" },
    { description: "Unknown payload" },
  ],
  [{ nullable: false, type: "string" }, { type: "string" }],
  [
    {
      $ref: "#/components/schemas/Artist",
      nullable: true,
      description: "Null when absent",
    },
    {
      description: "Null when absent",
      anyOf: [{ $ref: "#/components/schemas/Artist" }, { type: "null" }],
    },
  ],
  [
    { nullable: true, oneOf: [{ type: "string" }, { type: "object" }] },
    {
      anyOf: [
        { oneOf: [{ type: "string" }, { type: "object" }] },
        { type: "null" },
      ],
    },
  ],
])("preserves the declared nullable contract %#", (input, expected) => {
  const before = JSON.stringify(input);
  expect(normalizeOpenApiNullable(input)).toEqual(expected);
  expect(JSON.stringify(input)).toBe(before);
});

test("keeps literal example payloads and schema property names intact", () => {
  const schema = {
    type: "object",
    properties: {
      nullable: { type: "boolean" },
      example: { type: "string", nullable: true },
    },
    example: { nullable: true, type: "string" },
    enum: [{ nullable: true }],
  };
  expect(normalizeOpenApiNullable(schema)).toEqual({
    ...schema,
    properties: {
      nullable: { type: "boolean" },
      example: { type: ["string", "null"] },
    },
  });
});
