import {
  musicVideosCopy,
  musicVideosToMarkdown,
} from "../copy/music-videos.ts";
import { absoluteUrl } from "../seo.ts";
import { caseStudyPages } from "./caseStudyPages.ts";
import { companyPages } from "./companyPages.ts";
import { legalPages } from "./legalPages.ts";
import { offerPages } from "./offerPages.ts";
import { podcastPages } from "./podcastPages.ts";
import { productPages } from "./productPages.ts";
import { toolPages } from "./toolPages.ts";
import { workflowPages } from "./workflowPages.ts";
import type { AgentContentEntry } from "./types.ts";

export const pageEntries: AgentContentEntry[] = [
  ...[
    ...offerPages,
    ...productPages,
    ...companyPages,
    ...podcastPages,
    ...toolPages,
    ...workflowPages,
    ...legalPages,
    ...caseStudyPages,
  ].map((page): AgentContentEntry => {
    const url = absoluteUrl(page.path);
    return {
      metadata: {
        id: `page:${page.path}`,
        type: "page",
        title: page.title,
        description: page.description,
        url,
        representation: "summary",
      },
      keywords: page.keywords,
      searchable: `${page.title} ${page.description} ${page.paragraphs.join(" ")} ${page.keywords}`,
      markdown: async () =>
        [
          `# ${page.title}`,
          `Source: ${url}`,
          "Representation: Summary of the public page. Follow the source for the complete page.",
          ...page.paragraphs,
          "## Next steps",
          ...page.links.map(
            ([label, href]) => `- [${label}](${absoluteUrl(href)})`,
          ),
        ].join("\n\n") + "\n",
    };
  }),
  {
    metadata: {
      id: "page:/music-videos",
      type: "page",
      title: musicVideosCopy.title,
      description: musicVideosCopy.description,
      url: absoluteUrl("/music-videos"),
      representation: "full",
    },
    keywords:
      "music video film generation skill download quote released recording artist",
    searchable: musicVideosToMarkdown(),
    markdown: async () => musicVideosToMarkdown(),
  },
];
