import { agentToolDefinitions } from "../agent-tools/agentToolDefinitions.ts";
import { siteConfig } from "../config.ts";
import { absoluteUrl } from "../seo.ts";
import { discoveryPaths } from "./discoveryPaths.ts";

export function getArdManifest() {
  const publisher = new URL(siteConfig.url).hostname;
  const entry = (
    name: string,
    displayName: string,
    type: string,
    url: string,
    description: string,
    representativeQueries: string[],
  ) => ({
    "@context": "https://agenticresourcediscovery.org/context/v1",
    identifier: `urn:air:${publisher}:recoup:${name}`,
    displayName,
    type,
    url,
    description,
    representativeQueries,
  });
  return {
    entries: [
      {
        ...entry(
          "website-api",
          "Recoup website API",
          "application/vnd.oai.openapi+json;version=3.1",
          absoluteUrl(discoveryPaths.openapi),
          "Public website search, reading, workflow calculations, and project inquiry drafts. No private account access or submission.",
          [
            "Find Recoup services for royalty operations",
            "Prepare a project brief for AI consulting",
            "Estimate the value of time saved on a workflow",
          ],
        ),
        capabilities: agentToolDefinitions.map((tool) => tool.name),
      },
      entry(
        "platform-api",
        "Recoup platform API documentation",
        "text/html",
        absoluteUrl("/docs/api-reference"),
        "Published platform endpoint references and OpenAPI specifications. Follow each endpoint authentication and permission requirements.",
        [
          "Find the Recoup API for catalog search",
          "How do I authenticate a Recoup platform request?",
        ],
      ),
      entry(
        "platform-mcp-guide",
        "Connect to Recoup platform MCP",
        "text/html",
        absoluteUrl("/docs/mcp"),
        "Connection instructions for the separate authenticated platform MCP server; this resource is an HTML guide.",
        [
          "Connect my AI client to Recoup MCP",
          "Which credentials does Recoup MCP require?",
        ],
      ),
      entry(
        "skills",
        "Recoup Skills",
        "text/html",
        absoluteUrl("/skills"),
        "Learn about Recoup music-business Skills and find the published installation and source instructions.",
        [
          "Use Recoup music-business Skills in my AI tool",
          "Find Recoup Skills installation instructions",
        ],
      ),
      entry(
        "website-context",
        "Recoup website reading index",
        "text/plain",
        absoluteUrl(discoveryPaths.navigation),
        "Navigation and access guidance for public Recoup services, products, and documentation.",
        [
          "What does Recoup offer music funds?",
          "Find Recoup documentation and services",
        ],
      ),
    ],
  };
}
