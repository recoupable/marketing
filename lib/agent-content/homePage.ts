import { homeHeroCopy } from "../copy/home-hero.ts";
import { homeToMarkdown } from "../copy/homeToMarkdown.ts";
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

export const homePage: AgentContentEntry = {
  metadata: {
    id: "page:/",
    type: "page",
    title: `Recoup: ${homeHeroCopy.title.join(" ")}`,
    description: homeHeroCopy.description,
    url: absoluteUrl("/"),
    representation: "full",
  },
  keywords:
    "music funds rightsholders catalog owners consulting transformation strategy systems training",
  searchable: homeToMarkdown(),
  markdown: async () => homeToMarkdown(),
};
