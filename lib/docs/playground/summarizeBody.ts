import { resolveReference, schemaExample, type ApiObject } from "@/lib/docs-server";
import type { PlaygroundOperation } from "./types";

/** Picks the JSON media type when offered, and prefills the editor from the example, the schema, or `{}`. */
export function summarizeBody(operation: ApiObject, spec: ApiObject): PlaygroundOperation["body"] {
  const body = resolveReference(operation.requestBody, spec);
  if (!body.content) return undefined;
  const contentType = body.content["application/json"] ? "application/json" : Object.keys(body.content)[0];
  const media: ApiObject = body.content[contentType] ?? {};
  const named = media.examples ? resolveReference(Object.values(media.examples)[0] as ApiObject, spec).value : undefined;
  const example = media.example ?? named ?? (media.schema ? schemaExample(media.schema, spec) : undefined) ?? {};
  return { contentType, example: typeof example === "string" ? example : JSON.stringify(example, null, 2) };
}
