import type { ApiObject } from "@/lib/docs-server";
import type { PlaygroundAuth } from "./types";

function fromScheme(scheme: ApiObject | undefined): PlaygroundAuth | null {
  if (scheme?.type === "http" && scheme.scheme === "bearer") return { type: "bearer" };
  if (scheme?.type === "apiKey" && (scheme.in ?? "header") === "header" && scheme.name) return { type: "apiKey", header: scheme.name };
  return null;
}

/**
 * Picks the credential the single key field can supply. OpenAPI security is a list of
 * alternatives (OR), each a set of schemes that all apply (AND). An anonymous `{}`
 * alternative means the call works without credentials, so it wins; otherwise the first
 * single-scheme alternative the playground understands is used. A silent operation
 * follows the spec's declared schemes, and is public only when the spec declares none.
 */
export function resolvePlaygroundAuth(operation: ApiObject, spec: ApiObject): { auth: PlaygroundAuth; securitySchemes: string[] } {
  const declared: Record<string, ApiObject> = spec.components?.securitySchemes ?? {};
  const security: ApiObject[] | undefined = operation.security ?? spec.security;
  if (security === undefined) {
    const fallback = Object.values(declared).map(fromScheme).find((auth) => auth?.type === "apiKey") ?? Object.values(declared).map(fromScheme).find(Boolean);
    return { auth: fallback ?? { type: "none" }, securitySchemes: [] };
  }
  const securitySchemes = [...new Set(security.flatMap((item) => Object.keys(item)))];
  if (security.length === 0 || security.some((item) => Object.keys(item).length === 0)) return { auth: { type: "none" }, securitySchemes };
  for (const alternative of security) {
    const names = Object.keys(alternative);
    const auth = names.length === 1 ? fromScheme(declared[names[0]]) : null;
    if (auth) return { auth, securitySchemes };
  }
  return { auth: { type: "unsupported", schemes: securitySchemes }, securitySchemes };
}
