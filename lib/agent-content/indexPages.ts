import { blogEntries } from "./blogEntries.ts";
import { docsEntries } from "./docsEntries.ts";
import { playbookEntries } from "./playbookEntries.ts";
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

export const indexPages: AgentContentEntry[] = [
  {
    metadata: {
      id: "page:/blog",
      type: "page",
      title: "The Recoup blog",
      description: "Ideas and practical notes on AI in music companies.",
      url: absoluteUrl("/blog"),
      representation: "full",
    },
    keywords: "blog articles archive",
    searchable: "Recoup blog published articles",
    markdown: async () =>
      [
        "# The Recoup blog",
        `Source: ${absoluteUrl("/blog")}`,
        "Ideas and practical notes on AI in music companies.",
        ...blogEntries.map(
          ({ metadata: post }) =>
            `## [${post.title}](${post.url})\n\nPublished: ${post.publishedAt}\n\n${post.description}\n\n[Read Markdown](${post.url}.md)`,
        ),
      ].join("\n\n") + "\n",
  },
  {
    metadata: {
      id: "page:/playbook/download",
      type: "page",
      title: "The AI Music Marketing Playbook",
      description:
        "The complete guide to reusable AI workflows for music teams.",
      url: absoluteUrl("/playbook/download"),
      representation: "full",
    },
    keywords: "playbook guide chapters prompts",
    searchable: "Complete AI music marketing playbook",
    markdown: async () =>
      [
        "# The AI Music Marketing Playbook",
        `Source: ${absoluteUrl("/playbook/download")}`,
        ...(await Promise.all(
          playbookEntries.map((entry) => entry.markdown()),
        )),
      ].join("\n\n") + "\n",
  },
  {
    metadata: {
      id: "page:/docs/api-reference",
      type: "page",
      title: "The Recoup API",
      description:
        "Artist data, research, content creation, and tools to connect them.",
      url: absoluteUrl("/docs/api-reference"),
      representation: "full",
    },
    keywords: "API reference endpoints overview",
    searchable: "Recoup API reference endpoint index",
    markdown: async () =>
      [
        "# The Recoup API",
        `Source: ${absoluteUrl("/docs/api-reference")}`,
        "Artist data, research, content creation, and the tools to connect them. Find the endpoint you need and start building.",
        ...docsEntries
          .filter((entry) => entry.metadata.api)
          .map(
            ({ metadata: page }) =>
              `- [${page.title}](${page.url}) — ${page.api!.method} ${page.api!.path}`,
          ),
      ].join("\n\n") + "\n",
  },
];
