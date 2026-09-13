import { agentToolDefinitions } from "../agent-tools/agentToolDefinitions.ts";
import { absoluteUrl } from "../seo.ts";
import type { DiscoveryContent } from "./DiscoveryContent.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
import { introduction } from "./introduction.ts";

export function getAgentCatalog(index: readonly DiscoveryContent[]) {
  return {
    name: "Recoup public website",
    version: "1.0",
    description: introduction,
    documentation: absoluteUrl(discoveryPaths.hub),
    openapi: absoluteUrl(discoveryPaths.openapi),
    content: index.map((item) => ({ ...item, url: absoluteUrl(item.url) })),
    tools: agentToolDefinitions,
    interfaces: {
      http: {
        endpoint: absoluteUrl("/agent-api/v1/tools"),
        method: "POST",
        authentication: "none",
        effects:
          "Public reading, calculation, and draft generation. Does not submit inquiries or modify a platform account.",
      },
      webmcp: {
        registration: "document.modelContext",
        scope: "top-level browser document",
        availability: "Compatible browsers only; proposed standard.",
        draftEffect:
          "prepare_project_brief opens a local review panel. Nothing is submitted.",
      },
    },
    platform: {
      rest: {
        baseUrl: "https://api.recoupable.dev/api",
        documentation: absoluteUrl("/docs/authentication"),
        apiKeyHeader: "x-api-key",
      },
      mcp: {
        url: "https://api.recoupable.dev/mcp",
        documentation: absoluteUrl("/docs/mcp"),
        authentication: "Authorization: Bearer <Recoup API key>",
      },
    },
    contact: absoluteUrl("/contact"),
  };
}
