import { resolveReference, schemaExample, type ApiObject } from "@/lib/docs-server";
import { summarizeFormFields } from "./summarizeFormFields";
import type { PlaygroundBody } from "./types";

/** Picks the JSON media type when offered, prefills the editor from the example (an explicit null included), the schema, or `{}`, and lists multipart parts. */
export function summarizeBody(operation: ApiObject, spec: ApiObject): PlaygroundBody | undefined {
  const body = resolveReference(operation.requestBody, spec);
  if (!body.content) return undefined;
  const contentType = body.content["application/json"] ? "application/json" : Object.keys(body.content)[0];
  const media: ApiObject = body.content[contentType] ?? {};
  const named = media.examples ? resolveReference(Object.values(media.examples)[0] as ApiObject, spec).value : undefined;
  const example = media.example !== undefined ? media.example : named !== undefined ? named : media.schema ? schemaExample(media.schema, spec) : undefined;
  const text = example === undefined ? "{}" : typeof example === "string" ? example : JSON.stringify(example, null, 2);
  const form = contentType === "multipart/form-data" && media.schema ? summarizeFormFields(media.schema, spec, example) : undefined;
  return { contentType, example: text, required: Boolean(body.required), ...(form ? { form } : {}) };
}
