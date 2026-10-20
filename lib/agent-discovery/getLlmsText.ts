import { siteConfig } from "../config.ts";
import { absoluteUrl } from "../seo.ts";
import { accessNotes } from "./accessNotes.ts";
import type { DiscoveryContent } from "./DiscoveryContent.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
import { getWhenToUseGuidance } from "./getWhenToUseGuidance.ts";
import { introduction } from "./introduction.ts";
import { markdownLabel } from "./markdownLabel.ts";
import { oneLine } from "./oneLine.ts";

export function getLlmsText(index: readonly DiscoveryContent[]) {
  const pages = index.filter((item) => item.type === "page");
  const pageLinks = pages
    .map(
      (item) =>
        `- [${markdownLabel(item.title)}](${absoluteUrl(item.url)}): ${oneLine(item.description)}`,
    )
    .join("\n");
  return `# Recoup

> ${introduction}

${getWhenToUseGuidance()}

## Start here

- [Agent instructions](${absoluteUrl(discoveryPaths.instructions)}): When to use Recoup, tool selection, examples, and human review.
- [Browser agent guide](${absoluteUrl(discoveryPaths.hub)}): Human-readable overview and connection options.
- [Public content and tool catalog](${absoluteUrl(discoveryPaths.catalog)}): Content IDs, canonical URLs, and tool input schemas.
- [Public website MCP manifest](${absoluteUrl("/.well-known/mcp.json")}): Five anonymous website tools at /mcp.
- [Website OpenAPI](${absoluteUrl(discoveryPaths.openapi)}): Public search, reading, and utility endpoints; no account key required.
- [Documentation](${absoluteUrl("/docs")}): Platform guides and endpoint references.
- [Recoup SDKs](${absoluteUrl("/docs/sdks")}): Official Go release, Python source installation, and the npm CLI, with authentication and response handling.
- [Recoup Go SDK v0.1.0](https://pkg.go.dev/github.com/recoupable/marketing/sdk/go@v0.1.0): Published Go module and API reference.
- [Complete documentation index](${absoluteUrl("/docs/llms.txt")}): A link to every platform guide and API operation. Use website search to find a specific task.
- [API catalog](${absoluteUrl(discoveryPaths.apiCatalog)}): Website API and the platform's published OpenAPI specifications.
- [Marketing context summaries and full documentation](${absoluteUrl(discoveryPaths.summaries)}): Expanded navigation context followed by every documentation page as markdown.

## Find and read

Search: GET ${absoluteUrl("/agent-api/v1/search")}?query=royalty&type=all&limit=5
Read: GET ${absoluteUrl("/agent-api/v1/read")}?id=<ID_FROM_SEARCH>&offset=0&maxLength=6000

Search returns IDs and continuation cursors. Reading returns a bounded text representation with continuation offsets. Follow those when more content is needed; retain the returned canonical URL when citing a page. The catalog's representation field distinguishes page summaries from article or documentation text.

## Services and public pages

${pageLinks}

## Further reading

- [Blog](${absoluteUrl("/blog")}): Product announcements and music-business articles.
- [Playbook](${absoluteUrl("/playbook")}): Practical guidance for applying AI in music.
- [Skills](${absoluteUrl("/skills")}): Reusable music-business instructions for compatible AI tools.
- [Skills source](${siteConfig.githubUrl}): The published Skills repository.
- [Privacy](${absoluteUrl("/privacy")}) and [Terms](${absoluteUrl("/terms")}): Published policies.

${accessNotes()}
`;
}
