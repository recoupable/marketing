import chaptersSource from "../../content/playbook/chapters.json" with { type: "json" };
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

type Chapter = {
  slug: string;
  title: string;
  description: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    items?: string[];
    steps?: string[];
    prompts?: { label: string; text: string }[];
  }[];
};

export const playbookEntries: AgentContentEntry[] = (
  chaptersSource as Chapter[]
).map((chapter) => {
  const url = absoluteUrl(`/playbook/download#${chapter.slug}`);
  const markdown =
    [
      `# ${chapter.title}`,
      `Source: ${url}`,
      chapter.description,
      ...chapter.sections.flatMap((section) => [
        `## ${section.heading}`,
        ...(section.paragraphs || []),
        ...(section.items || []).map((item) => `- ${item}`),
        ...(section.steps || []).map((step, i) => `${i + 1}. ${step}`),
        ...(section.prompts || []).flatMap((prompt) => [
          `### ${prompt.label}`,
          prompt.text,
        ]),
      ]),
    ].join("\n\n") + "\n";
  return {
    metadata: {
      id: `playbook:${chapter.slug}`,
      type: "playbook",
      title: chapter.title,
      description: chapter.description,
      url,
      representation: "full",
    },
    searchable: markdown,
    keywords: "playbook guide workflow prompts",
    markdown: async () => markdown,
  };
});
