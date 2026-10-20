import { expect, test } from "vitest";
import { GET as unknownApi, POST as unknownApiPost, OPTIONS as apiOptions } from "../app/api/[[...path]]/route";
import { GET as unknownAgentApi, OPTIONS as agentApiOptions } from "../app/agent-api/[[...path]]/route";
import { GET as missingDocs } from "../app/docs/raw/[...slug]/route";
import { handleAgentRead, handleAgentSearch } from "../lib/agent-http";
import { websiteOpenAPI } from "../lib/agent-openapi";
import { getMcpManifest } from "../lib/agent-discovery/getMcpManifest";
import { nextConfig } from "../next.config";
import { siteConfig } from "../lib/config";

test("unknown API routes and invalid public reads return typed JSON recovery", async () => {
  for (const response of [
    unknownApi(), unknownApiPost(), unknownAgentApi(),
    await handleAgentRead(new Request("https://recoupable.dev/agent-api/v1/read?id=page:/missing")),
    await handleAgentSearch(new Request("https://recoupable.dev/agent-api/v1/search")),
  ]) {
    expect([400, 404]).toContain(response.status);
    expect(response.headers.get("content-type")).toContain("application/json");
    const { error } = await response.json();
    expect(error).toEqual(expect.objectContaining({ code: expect.any(String), message: expect.any(String), resolution: expect.stringContaining("/openapi.json") }));
  }
  const spec = websiteOpenAPI();
  expect(spec.components.schemas.ErrorResponse.properties.error).toMatchObject({ required: ["code", "message", "resolution"] });
  expect(spec.paths["/agent-api/v1/read"].get.responses[404].content["application/json"].schema).toEqual({ $ref: "#/components/schemas/ErrorResponse" });
  expect(spec.security).toEqual([]);
});

test("missing documentation offers Markdown recovery links with a real 404", async () => {
  const response = await missingDocs(new Request("https://recoupable.dev/docs/raw/missing.md"), { params: Promise.resolve({ slug: ["missing.md"] }) });
  expect(response.status).toBe(404);
  expect(response.headers.get("content-type")).toContain("text/markdown");
  expect(await response.text()).toContain("/sitemap.xml)");
});

test("unknown-route preflight supports anonymous JSON clients for each supported method", () => {
  for (const response of [apiOptions(), agentApiOptions()]) {
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe("*");
    expect(response.headers.get("access-control-allow-headers")?.toLowerCase()).toBe("content-type");
    expect(response.headers.get("access-control-allow-methods")?.split(", ")).toEqual(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]);
  }
});

test("OAuth discovery points to the existing issuer and MCP advertises its real transport", async () => {
  const redirects = await nextConfig.redirects!();
  expect(redirects).toContainEqual({ source: "/.well-known/oauth-authorization-server", destination: siteConfig.platformOAuthMetadataUrl, permanent: true });
  expect(redirects).toContainEqual({ source: "/.well-known/oauth-protected-resource", destination: siteConfig.platformResourceMetadataUrl, permanent: true });
  expect(getMcpManifest().remotes).toEqual([{ type: "streamable-http", url: "https://api.recoupable.dev/mcp" }]);
});
