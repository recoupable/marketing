import { siteConfig } from "../config.ts";
import { absoluteUrl } from "../seo.ts";
import { accessNotes } from "./accessNotes.ts";
import type { DiscoveryContent } from "./DiscoveryContent.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
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

## Start here

- [Agent guide](${absoluteUrl(discoveryPaths.hub)}): Available actions, examples, and human review.
- [Public content and tool catalog](${absoluteUrl(discoveryPaths.catalog)}): Content IDs, canonical URLs, and tool input schemas.
- [Website OpenAPI](${absoluteUrl(discoveryPaths.openapi)}): Public search, reading, and utility endpoints; no account key required.
- [Documentation](${absoluteUrl("/docs")}): Platform guides and endpoint references. Use website search to find specific documentation.
- [API catalog](${absoluteUrl(discoveryPaths.apiCatalog)}): Website API and the platform's published OpenAPI specifications.
- [Marketing context summaries](${absoluteUrl(discoveryPaths.summaries)}): Expanded navigation context; not the complete documentation corpus.

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
