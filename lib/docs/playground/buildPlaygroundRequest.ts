import { joinApiUrl } from "./joinApiUrl";
import type { PlaygroundOperation, PlaygroundRequest, PlaygroundValues } from "./types";

/** Turns the visitor's inputs into a fetch-ready request. Blank path params keep their `{name}` placeholder. */
export function buildPlaygroundRequest(operation: PlaygroundOperation, values: PlaygroundValues, base: string): PlaygroundRequest {
  const read = (location: string, name: string) => values.params[`${location}:${name}`]?.trim() ?? "";
  const route = operation.path.replace(/\{([^}]+)\}/g, (placeholder, name) => {
    const value = read("path", name);
    return value ? encodeURIComponent(value) : placeholder;
  });
  const query = new URLSearchParams();
  for (const param of operation.parameters.filter((item) => item.in === "query")) {
    const value = read("query", param.name);
    if (value) query.append(param.name, value);
  }
  const headers: Record<string, string> = {};
  const key = values.apiKey.trim();
  if (key && operation.auth.type === "apiKey") headers[operation.auth.header] = key;
  if (key && operation.auth.type === "bearer") headers.Authorization = `Bearer ${key}`;
  for (const param of operation.parameters.filter((item) => item.in === "header")) {
    const value = read("header", param.name);
    if (value) headers[param.name] = value;
  }
  const url = joinApiUrl(base, route) + (query.size ? `?${query}` : "");
  if (!operation.body) return { method: operation.method, url, headers };
  headers["Content-Type"] = operation.body.contentType;
  return { method: operation.method, url, headers, body: values.body };
}
