import { describe, expect, it } from "vitest";
import { resolvePlaygroundAuth } from "@/lib/docs/playground/resolvePlaygroundAuth";

const spec = {
  components: {
    securitySchemes: {
      apiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
      bearerAuth: { type: "http", scheme: "bearer" },
      hookSecret: { type: "apiKey", in: "header", name: "x-callback-secret" },
    },
  },
};

describe("resolvePlaygroundAuth", () => {
  it("treats an anonymous {} alternative as public even when a key alternative is listed first", () => {
    expect(resolvePlaygroundAuth({ security: [{ apiKeyAuth: [] }, {}] }, spec).auth).toEqual({ type: "none" });
  });
  it("skips an AND entry that needs two credentials and uses the next complete alternative", () => {
    const { auth } = resolvePlaygroundAuth({ security: [{ apiKeyAuth: [], bearerAuth: [] }, { bearerAuth: [] }] }, spec);
    expect(auth).toEqual({ type: "bearer" });
  });
  it("uses the scheme's own header name for a non x-api-key api key", () => {
    expect(resolvePlaygroundAuth({ security: [{ hookSecret: [] }] }, spec).auth).toEqual({ type: "apiKey", header: "x-callback-secret" });
  });
  it("marks a requirement the playground cannot satisfy as unsupported instead of guessing x-api-key", () => {
    expect(resolvePlaygroundAuth({ security: [{ callbackSecret: [] }] }, spec).auth).toEqual({ type: "unsupported", schemes: ["callbackSecret"] });
    expect(resolvePlaygroundAuth({ security: [{ apiKeyAuth: [], bearerAuth: [] }] }, spec).auth).toEqual({ type: "unsupported", schemes: ["apiKeyAuth", "bearerAuth"] });
  });
  it("defaults a silent operation to the spec's api key scheme, and to public when the spec declares no schemes", () => {
    expect(resolvePlaygroundAuth({}, spec).auth).toEqual({ type: "apiKey", header: "x-api-key" });
    expect(resolvePlaygroundAuth({}, { components: {} }).auth).toEqual({ type: "none" });
  });
});
