export const createObjectSchema = (
  properties: Record<string, unknown>,
  required: string[],
) => ({
  type: "object",
  properties,
  required,
  additionalProperties: false,
});
