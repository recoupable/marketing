import type { ApiObject } from "@/lib/docs-server";
import type { PlaygroundAuth } from "./types";

/**
 * Picks how the playground sends credentials: the first security requirement wins,
 * matching the reference curl. A silent spec means an x-api-key header; an explicit
 * empty list means the operation is public.
 */
export function resolvePlaygroundAuth(operation: ApiObject, spec: ApiObject): { auth: PlaygroundAuth; securitySchemes: string[] } {
  const security: ApiObject[] | undefined = operation.security ?? spec.security;
  if (Array.isArray(security) && security.length === 0) return { auth: { type: "none" }, securitySchemes: [] };
  const securitySchemes = [...new Set((security ?? []).flatMap((item) => Object.keys(item)))];
  const scheme = securitySchemes[0] ? spec.components?.securitySchemes?.[securitySchemes[0]] : undefined;
  if (scheme?.scheme === "bearer") return { auth: { type: "bearer" }, securitySchemes };
  return { auth: { type: "apiKey", header: scheme?.name || "x-api-key" }, securitySchemes };
}
