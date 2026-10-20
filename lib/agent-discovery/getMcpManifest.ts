import { siteConfig } from "../config.ts";

/** Advertise the existing authenticated platform, not a second website server. */
export function getMcpManifest() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: "dev.recoupable/recoup",
    title: "Recoup",
    description: "Music business tools for your Recoup account. Connect with OAuth and approve the required scopes.",
    version: "1.0.0",
    websiteUrl: `${siteConfig.url}/docs/mcp-oauth`,
    remotes: [{ type: "streamable-http", url: siteConfig.platformMcpUrl }],
  };
}
