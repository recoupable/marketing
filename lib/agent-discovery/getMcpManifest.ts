import { siteConfig } from "../config.ts";

/** Public website tools have their own anonymous protocol endpoint. */
export function getMcpManifest() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: "dev.recoupable/website",
    title: "Recoup public website",
    icons: [{ src: `${siteConfig.url}/icons/android-chrome-192x192.png`, mimeType: "image/png", sizes: ["192x192"] }],
    description: "Search and read public Recoup content, calculate workflow scenarios, and prepare unsubmitted project briefs. No account or API key required.",
    version: "1.0.0",
    websiteUrl: `${siteConfig.url}/agents`,
    remotes: [{ type: "streamable-http", url: `${siteConfig.url}/mcp` }],
  };
}
