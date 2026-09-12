import { describe, expect, it } from "vitest";
import { buildPlaygroundRequest } from "@/lib/docs/playground/buildPlaygroundRequest";
import type { PlaygroundOperation } from "@/lib/docs/playground/types";

const base = "https://test-recoup-api.vercel.app/api";
const get: PlaygroundOperation = {
  method: "GET", path: "/api/artists/{id}/profile", runnable: true, securitySchemes: [],
  parameters: [
    { name: "id", in: "path", required: true, type: "string", example: "" },
    { name: "org_id", in: "query", required: false, type: "string", example: "" },
    { name: "empty", in: "query", required: false, type: "string", example: "" },
    { name: "x-trace", in: "header", required: false, type: "string", example: "" },
  ],
  auth: { type: "apiKey", header: "x-api-key" },
};

describe("buildPlaygroundRequest", () => {
  it("substitutes encoded path params, appends only filled query params, and sends the api key header", () => {
    const request = buildPlaygroundRequest(get, { params: { "path:id": "a b", "query:org_id": "o&1", "query:empty": "", "header:x-trace": "t1" }, body: "", apiKey: "sk" }, base);
    expect(request).toEqual({
      method: "GET",
      url: "https://test-recoup-api.vercel.app/api/artists/a%20b/profile?org_id=o%261",
      headers: { "x-api-key": "sk", "x-trace": "t1" },
    });
  });
  it("uses a bearer header for bearer auth and none for public operations", () => {
    const bearer = buildPlaygroundRequest({ ...get, auth: { type: "bearer" } }, { params: { "path:id": "1" }, body: "", apiKey: "tok" }, base);
    expect(bearer.headers).toEqual({ Authorization: "Bearer tok" });
    const open = buildPlaygroundRequest({ ...get, auth: { type: "none" } }, { params: { "path:id": "1" }, body: "", apiKey: "tok" }, base);
    expect(open.headers).toEqual({});
  });
  it("adds the content type and body for operations with a request body", () => {
    const post: PlaygroundOperation = { ...get, method: "POST", path: "/api/artists", parameters: [], body: { contentType: "application/json", example: "{}" } };
    const request = buildPlaygroundRequest(post, { params: {}, body: '{"name":"Nena"}', apiKey: "sk" }, base);
    expect(request.url).toBe("https://test-recoup-api.vercel.app/api/artists");
    expect(request.headers).toEqual({ "x-api-key": "sk", "Content-Type": "application/json" });
    expect(request.body).toBe('{"name":"Nena"}');
  });
  it("leaves a placeholder when a path param is blank so the caller can block the send", () => {
    const request = buildPlaygroundRequest(get, { params: {}, body: "", apiKey: "" }, base);
    expect(request.url).toBe("https://test-recoup-api.vercel.app/api/artists/{id}/profile");
    expect(request.headers).toEqual({});
  });
});
