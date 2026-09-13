import { documentationAgentMarkdown } from "../agent-markdown.ts";
import { resolveDescriptionLinks } from "../resolve-description-links.ts";
import { docs } from "../docs";
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

export const docsEntries: AgentContentEntry[] = docs.map((page) => {
  const url = absoluteUrl(page.slug ? `/docs/${page.slug}` : "/docs");
  return {
    metadata: {
      id: `docs:${page.slug || "index"}`,
      type: "docs",
      title: page.title,
      description: resolveDescriptionLinks(page.description),
      url,
      representation: "full",
      ...(page.api?.spec
        ? {
            api: {
              method: page.api.method,
              path: page.api.path,
              specificationUrl: absoluteUrl(`/docs/spec/${page.api.spec}`),
            },
          }
        : {}),
    },
    searchable: page.searchText,
    keywords: `${page.category} ${page.group}`,
    markdown: () => documentationAgentMarkdown(page),
  };
});
