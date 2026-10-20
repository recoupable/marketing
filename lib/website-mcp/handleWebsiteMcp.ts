import { createMcpHandler } from "@modelcontextprotocol/server";
import { withAgentRateLimit } from "../agent-tools/withAgentRateLimit.ts";
import { siteConfig } from "../config.ts";
import { createWebsiteMcp } from "./createWebsiteMcp.ts";

// Each HTTP exchange receives its own server; no session depends on a warm function.
const handler = createMcpHandler(createWebsiteMcp, {
  maxRequestBodySize: 16_384,
});
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, MCP-Session-Id",
  "Access-Control-Expose-Headers":
    "MCP-Protocol-Version, MCP-Session-Id, RateLimit-Limit, RateLimit-Policy, Retry-After",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export async function handleWebsiteMcp(request: Request) {
  const hosts = [
    new URL(siteConfig.url).host,
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];
  const url = new URL(request.url);
  const trustedHost = (host: string) => {
    if (hosts.includes(host)) return true;
    if (process.env.VERCEL === "1") return false;
    try {
      return ["localhost", "127.0.0.1", "[::1]"].includes(
        new URL(`http://${host}`).hostname,
      );
    } catch {
      return false;
    }
  };
  if (
    !trustedHost(url.host) ||
    (request.headers.has("host") && !trustedHost(request.headers.get("host")!))
  ) {
    return Response.json(
      { error: "Unrecognized MCP host." },
      { status: 403, headers: cors },
    );
  }
  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: cors });
  const response = await withAgentRateLimit(request, () =>
    handler.fetch(request),
  );
  for (const [name, value] of Object.entries(cors))
    response.headers.set(name, value);
  return response;
}
