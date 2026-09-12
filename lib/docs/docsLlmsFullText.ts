import { documentationAgentMarkdown } from "../agent-markdown.ts";
import type { DocPage } from "../docs.ts";

/**
 * Every documentation page as the markdown /docs/raw serves, in navigation
 * order. Each page's markdown opens with its "# Title" heading and a
 * "Source: <canonical URL>" line.
 */
export async function docsLlmsFullText(pages: readonly DocPage[]): Promise<string> {
  const sections: string[] = [];
  for (const page of pages) sections.push((await documentationAgentMarkdown(page)).trimEnd());
  return `${sections.join("\n\n\n")}\n`;
}
