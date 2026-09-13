import postsSource from "../../content/blog/posts.json" with { type: "json" };
import { readableAgentMarkdown } from "../agent-markdown.ts";
import type { BlogPost } from "../blog";
import { blogDescription } from "../editorial-seo.ts";
import { absoluteUrl } from "../seo.ts";
import type { AgentContentEntry } from "./types.ts";

export const blogEntries: AgentContentEntry[] = (postsSource as BlogPost[]).map(
  (post) => {
    const url = absoluteUrl(`/blog/${post.slug}`);
    return {
      metadata: {
        id: `blog:${post.slug}`,
        type: "blog",
        title: post.title,
        description: blogDescription(post),
        url,
        representation: "full",
        publishedAt: post.date,
        ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}),
      },
      searchable: `${post.title} ${blogDescription(post)} ${post.body}`,
      keywords: post.category,
      markdown: async () =>
        [
          `# ${post.title}`,
          `Source: ${url}`,
          `Author: ${post.author}\n\nPublished: ${post.date}${post.updatedAt ? `\n\nUpdated: ${post.updatedAt}` : ""}`,
          readableAgentMarkdown(post.body, url),
        ].join("\n\n") + "\n",
    };
  },
);
