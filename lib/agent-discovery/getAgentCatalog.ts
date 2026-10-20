import { maximumBatchOperations } from "../agent-tools/maximumBatchOperations.ts";
import { agentMarkdownPath } from "../agent-markdown-path.ts";
import { siteConfig } from "../config.ts";
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
    content: index.map((item) => ({
      ...item,
      url: absoluteUrl(item.url),
      ...(!new URL(absoluteUrl(item.url)).hash
        ? {
            markdownUrl: absoluteUrl(
              agentMarkdownPath(new URL(absoluteUrl(item.url)).pathname),
            ),
          }
        : {}),
    })),
    tools: agentToolDefinitions,
    interfaces: {
      http: {
        endpoint: absoluteUrl("/agent-api/v1/tools"),
        method: "POST",
        authentication: "none",
        effects:
          "Public reading, calculation, and draft generation. Does not submit inquiries or modify a platform account.",
      },
      mcp: {
        url: absoluteUrl("/mcp"),
        transport: "streamable-http",
        authentication: "none",
        manifest: absoluteUrl("/.well-known/mcp.json"),
      },
      batch: { endpoint: absoluteUrl("/agent-api/v1/batch"), method: "POST", maximumOperations: maximumBatchOperations },
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
        url: siteConfig.platformMcpUrl,
        transport: "streamable-http",
        documentation: absoluteUrl("/docs/mcp-oauth"),
        authentication: "Host-managed OAuth 2.0 with PKCE S256 and explicit user consent",
        apiKeyAuthentication: {
          header: "Authorization: Bearer <Recoup API key>",
          documentation: absoluteUrl("/docs/mcp"),
        },
        authorizationServerMetadata: absoluteUrl("/.well-known/oauth-authorization-server"),
        protectedResourceMetadata: absoluteUrl("/.well-known/oauth-protected-resource"),
      },
    },
    contact: absoluteUrl("/contact"),
  };
}
