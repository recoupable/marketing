import { describe, expect, it } from "vitest";
import { summarizeOperation } from "@/lib/docs/playground/summarizeOperation";

const spec = {
  components: {
    securitySchemes: {
      apiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
      bearerAuth: { type: "http", scheme: "bearer" },
    },
    schemas: {
      Body: { type: "object", required: ["name"], properties: { name: { type: "string", example: "Nena" }, tags: { type: "array", items: { type: "string" } } } },
    },
  },
  paths: {
    "/api/artists/{id}/profile": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
      get: {
        parameters: [{ name: "org_id", in: "query", schema: { type: "string" }, example: "org_123" }, { name: "x-api-key", in: "header", required: true, schema: { type: "string" } }],
        security: [{ apiKeyAuth: [] }, { bearerAuth: [] }],
        responses: { "200": { content: { "application/json": {} } } },
      },
    },
    "/api/artists": { post: { requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Body" } } } }, responses: { "200": {} } } },
    "/api/upload": { post: { requestBody: { content: { "multipart/form-data": { schema: { type: "object" } } } }, responses: { "200": {} } } },
    "/api/chat": { post: { security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { example: { prompt: "hi" } } } }, responses: { "200": { content: { "text/event-stream": {} } } } } },
    "/api/public": { get: { security: [], responses: { "200": {} } } },
    "/api/empty": { post: { requestBody: { content: { "application/json": {} } }, responses: { "200": {} } } },
    "/api/null": { post: { requestBody: { required: true, content: { "application/json": { example: null, schema: { $ref: "#/components/schemas/Body" } } } }, responses: { "200": {} } } },
    "/api/override/{id}": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }, { name: "limit", in: "query", schema: { type: "integer" } }],
      get: { parameters: [{ name: "limit", in: "query", required: true, schema: { type: "integer" }, example: "5" }], responses: { "200": {} } },
    },
    "/api/hook": { post: { security: [{ callbackSecret: [] }], responses: { "200": {} } } },
    "/api/audio": { post: { responses: { "200": { content: { "audio/mpeg": {} } } } } },
    "/api/form": { post: { requestBody: { content: { "multipart/form-data": { schema: { type: "object", required: ["audio", "title"], properties: { audio: { type: "string", format: "binary" }, title: { type: "string", example: "Demo" }, notes: { type: "string" } } } } } }, responses: { "200": {} } } },
  },
};
const summarize = (method: string, path: string) => summarizeOperation({ method, path, spec });

describe("summarizeOperation", () => {
  it("merges path-level and operation parameters, drops the auth header, and resolves api-key auth", () => {
    const op = summarize("GET", "/api/artists/{id}/profile");
    expect(op.method).toBe("GET");
    expect(op.path).toBe("/api/artists/{id}/profile");
    expect(op.parameters).toEqual([
      { name: "id", in: "path", required: true, type: "string", example: "" },
      { name: "org_id", in: "query", required: false, type: "string", example: "org_123" },
    ]);
    expect(op.auth).toEqual({ type: "apiKey", header: "x-api-key" });
    expect(op.securitySchemes).toEqual(["apiKeyAuth", "bearerAuth"]);
    expect(op.body).toBeUndefined();
    expect(op.runnable).toBe(true);
  });
  it("prefills a JSON body from the schema and defaults auth to x-api-key when the spec is silent", () => {
    const op = summarize("POST", "/api/artists");
    expect(op.body).toEqual({ contentType: "application/json", example: JSON.stringify({ name: "Nena" }, null, 2), required: false });
    expect(op.auth).toEqual({ type: "apiKey", header: "x-api-key" });
    expect(op.securitySchemes).toEqual([]);
  });
  it("uses the media example when present and marks event streams as not runnable with bearer auth", () => {
    const op = summarize("POST", "/api/chat");
    expect(op.body?.example).toBe(JSON.stringify({ prompt: "hi" }, null, 2));
    expect(op.auth).toEqual({ type: "bearer" });
    expect(op.runnable).toBe(false);
  });
  it("marks multipart uploads as not runnable and lists their form fields", () => {
    const op = summarize("POST", "/api/upload");
    expect(op.body?.contentType).toBe("multipart/form-data");
    expect(op.runnable).toBe(false);
    expect(summarize("POST", "/api/form").body?.form).toEqual([
      { name: "audio", required: true, binary: true, example: "" },
      { name: "title", required: true, binary: false, example: "Demo" },
      { name: "notes", required: false, binary: false, example: "" },
    ]);
  });
  it("keeps an explicit null example and reports a required body", () => {
    expect(summarize("POST", "/api/null").body).toEqual({ contentType: "application/json", example: "null", required: true });
  });
  it("lets an operation parameter override the path-level one with the same location and name", () => {
    expect(summarize("GET", "/api/override/{id}").parameters).toEqual([
      { name: "id", in: "path", required: true, type: "string", example: "" },
      { name: "limit", in: "query", required: true, type: "integer", example: "5" },
    ]);
  });
  it("is not runnable when the credential cannot be supplied or the 200 body is binary", () => {
    const hook = summarize("POST", "/api/hook");
    expect(hook.auth).toEqual({ type: "unsupported", schemes: ["callbackSecret"] });
    expect(hook.runnable).toBe(false);
    expect(summarize("POST", "/api/audio").runnable).toBe(false);
  });
  it("reports no auth for an explicitly public operation", () => {
    expect(summarize("GET", "/api/public").auth).toEqual({ type: "none" });
  });
  it("falls back to an empty object when the JSON body has no schema or example", () => {
    expect(summarize("POST", "/api/empty").body?.example).toBe("{}");
  });
});
