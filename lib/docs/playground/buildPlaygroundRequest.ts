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
    // Array parameters repeat the name once per value, the form the api expects.
    const parts = param.type === "array" ? value.split(",").map((part) => part.trim()).filter(Boolean) : value ? [value] : [];
    for (const part of parts) query.append(param.name, part);
  }
  const headers: Record<string, string> = {};
  const key = values.apiKey.trim();
  let secretHeader: string | undefined;
  if (key && operation.auth.type === "apiKey") headers[(secretHeader = operation.auth.header)] = key;
  if (key && operation.auth.type === "bearer") headers[(secretHeader = "Authorization")] = `Bearer ${key}`;
  for (const param of operation.parameters.filter((item) => item.in === "header")) {
    const value = read("header", param.name);
    if (value) headers[param.name] = value;
  }
  const url = joinApiUrl(base, route) + (query.size ? `?${query}` : "");
  const request: PlaygroundRequest = { method: operation.method, url, headers, ...(secretHeader ? { secretHeader } : {}) };
  if (!operation.body) return request;
  if (operation.body.form) {
    const form = operation.body.form.map((field): [string, string] => [field.name, field.binary ? "@YOUR_FILE_PATH" : read("form", field.name)]).filter(([, value]) => value);
    return { ...request, form };
  }
  headers["Content-Type"] = operation.body.contentType;
  return { ...request, body: values.body };
}
