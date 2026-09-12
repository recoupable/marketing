import { absoluteUrl } from "../seo.ts";
import { accessNotes } from "./accessNotes.ts";
import type { DiscoveryContent } from "./DiscoveryContent.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
import { introduction } from "./introduction.ts";
import { oneLine } from "./oneLine.ts";

export function getLlmsFullText(
  index: readonly DiscoveryContent[],
  summaries: Record<string, string> = {},
) {
  const pages = index.filter((item) => item.type === "page");
  return `# Recoup: marketing context summaries

> ${introduction}

Scope: this file opens with the marketing page summaries used by the public content index, then carries the complete platform documentation, page by page, as served at each page's Source URL. The summaries are not the full text of the website, blog, or playbook. For authoritative detail on those, read the canonical page or use the content reading endpoint with an ID from search.

${pages.map((item) => `## ${oneLine(item.title)}\n\nContent ID: ${item.id}\n\n${summaries[item.id]?.replace(/^# [^\n]+\n*/, "") || `Canonical page: ${absoluteUrl(item.url)}\n\n${oneLine(item.description)}`}`).join("\n\n")}

## Read the complete topic

[Search published content](${absoluteUrl("/agent-api/v1/search")}?query=royalty&type=all&limit=5), then pass a returned ID to ${absoluteUrl("/agent-api/v1/read")}. A response states its representation and provides a continuation offset when applicable.

[Tool and content catalog](${absoluteUrl(discoveryPaths.catalog)}) | [Documentation](${absoluteUrl("/docs")}) | [Website OpenAPI](${absoluteUrl(discoveryPaths.openapi)})

${accessNotes()}
`;
}
