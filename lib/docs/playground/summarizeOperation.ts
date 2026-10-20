import { resolveReference, type ApiObject } from "@/lib/docs-server";
import { resolvePlaygroundAuth } from "./resolvePlaygroundAuth";
import { summarizeBody } from "./summarizeBody";
import type { PlaygroundOperation, PlaygroundParam } from "./types";

const LOCATIONS: PlaygroundParam["in"][] = ["path", "query", "header"];
const TEXTUAL = /json|text|xml|javascript|event-stream|markdown|csv|html|x-www-form-urlencoded/;

function paramType(schema: ApiObject | undefined): string {
  if (!schema) return "string";
  if (schema.$ref) return String(schema.$ref).split("/").pop() ?? "string";
  if (Array.isArray(schema.type)) return schema.type.join(" | ");
  return schema.type ?? (schema.properties ? "object" : "string");
}

function paramExample(param: ApiObject): string {
  const value = param.example ?? param.schema?.example ?? param.schema?.default;
  if (value === undefined) return "";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

/** Reduces one OpenAPI operation to the serializable shape the client playground renders. */
export function summarizeOperation({ method, path, spec }: { method: string; path: string; spec: ApiObject }): PlaygroundOperation {
  const pathItem: ApiObject = spec.paths?.[path] ?? {};
  const operation: ApiObject = pathItem[method.toLowerCase()] ?? {};
  const { auth, securitySchemes } = resolvePlaygroundAuth(operation, spec);
  const secretHeader = auth.type === "apiKey" ? auth.header.toLowerCase() : "authorization";
  // Operation-level definitions replace path-level ones with the same location and name.
  const merged = new Map<string, ApiObject>();
  for (const raw of [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]) {
    const param = resolveReference(raw, spec);
    merged.set(`${param.in}:${param.name}`, param);
  }
  const parameters = [...merged.values()]
    .filter((param) => LOCATIONS.includes(param.in))
    .filter((param) => param.in !== "header" || ![secretHeader, "authorization", "x-api-key"].includes(String(param.name).toLowerCase()))
    .map((param): PlaygroundParam => ({ name: param.name, in: param.in, required: Boolean(param.required), type: paramType(param.schema), example: paramExample(param) }));
  const body = summarizeBody(operation, spec);
  const responseTypes = Object.keys(resolveReference(operation.responses?.["200"], spec).content ?? {});
  const streams = responseTypes.includes("text/event-stream");
  const binary = responseTypes.length > 0 && responseTypes.every((type) => !TEXTUAL.test(type));
  const runnable = auth.type !== "unsupported" && body?.contentType !== "multipart/form-data" && !streams && !binary;
  return { method: method.toUpperCase(), path, parameters, body, auth, securitySchemes, runnable };
}
