export const objectSchema = (
  properties: Record<string, unknown>,
  required: string[],
) => ({
  type: "object",
  properties,
  required,
  additionalProperties: false,
});
