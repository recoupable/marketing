import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { postFrontmatterSchema, type Post } from "./post-schema";

/**
 * Research = our long-form / thought-leadership surface at /research.
 *
 * It has two content pipelines (same split the standalone research site used):
 *  1. Paragraph-synced essays — body lives on paragraph.com, fetched at request
 *     time. We cache lightweight card metadata here so the index stays fast and
 *     resilient even if Paragraph is briefly unreachable; the body is still
 *     fetched live on the detail page.
 *  2. In-repo MDX — authored directly in content/research/*.mdx.
 */

const RESEARCH_DIR = path.join(process.cwd(), "content", "research");

/** A Paragraph-backed research essay. `id` is the Paragraph post ID. */
export interface ParagraphResearch {
  slug: string;
  paragraphId: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

/**
 * Card metadata for Paragraph essays. The body is fetched live by slug on the
 * detail page; this cache only powers the index cards + ordering.
 */
export const PARAGRAPH_RESEARCH: readonly ParagraphResearch[] = [
  {
    slug: "install-marketplace-claude-desktop",
    paragraphId: "dqsem6sqIVt1wEDNYepW",
    title: "Install the Recoup Skills & Plugins Marketplace on Claude Desktop",
    excerpt:
      "A step-by-step walkthrough for installing the Recoup skills and plugins marketplace inside Claude Desktop.",
    date: "2026-05-15",
    author: "Sidney Swift",
    tags: ["tutorial", "claude", "marketplace", "skills", "plugins"],
  },
  {
    slug: "open-labels",
    paragraphId: "OtnUfbEiWEwz6y5Ee4ks",
    title: "Open Labels",
    excerpt:
      "The record label is no longer a set of tools — it's a programmable system your agent can run.",
    date: "2026-04-22",
    author: "Sidney Swift",
    tags: ["sandboxes", "recoup", "labels", "agents", "vercel"],
  },
  {
    slug: "sandbox-for-record-labels",
    paragraphId: "k12WiMLKQlt4hVtK5zOA",
    title: "Sandbox for Record Labels",
    excerpt:
      "A file system and bash for your mood boards, docs, and rules — a sandbox built for how record labels actually work.",
    date: "2026-01-26",
    author: "Recoupable Team",
    tags: ["engineering", "ai"],
  },
  {
    slug: "recoup-in-2026",
    paragraphId: "JPd97vsPc118HjFwEUux",
    title: "Recoup in 2026",
    excerpt:
      "In 2026 we're optimizing Recoup for enterprise label teams: recurring value for every seat, measurable time saved, and clearer outcomes per campaign.",
    date: "2026-01-05",
    author: "Recoupable Team",
    tags: ["roadmap", "2026"],
  },
];

/** Normalized shape used by index cards, regardless of pipeline. */
export interface ResearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  source: "paragraph" | "mdx";
}

/** Read and parse a single MDX research post by slug. */
export function getResearchPostBySlug(slug: string): Post {
  const filePath = path.join(RESEARCH_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const frontmatter = postFrontmatterSchema.parse(data);
  return { ...frontmatter, content };
}

/** All in-repo MDX research posts (published only), newest first. */
export function getMdxResearchPosts(): Post[] {
  if (!fs.existsSync(RESEARCH_DIR)) return [];

  return fs
    .readdirSync(RESEARCH_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      try {
        return getResearchPostBySlug(name.replace(/\.mdx$/, ""));
      } catch {
        return null;
      }
    })
    .filter((post): post is Post => post !== null && post.status !== "draft");
}

/**
 * Every research entry (Paragraph + MDX) as normalized cards, newest first.
 */
export function getAllResearchEntries(): ResearchEntry[] {
  const paragraphEntries: ResearchEntry[] = PARAGRAPH_RESEARCH.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    author: p.author,
    tags: p.tags,
    source: "paragraph",
  }));

  const mdxEntries: ResearchEntry[] = getMdxResearchPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    tags: post.tags,
    source: "mdx",
  }));

  return [...paragraphEntries, ...mdxEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** All research slugs — used by generateStaticParams(). */
export function getAllResearchSlugs(): string[] {
  const paragraphSlugs = PARAGRAPH_RESEARCH.map((p) => p.slug);
  const mdxSlugs = getMdxResearchPosts().map((post) => post.slug);
  return [...paragraphSlugs, ...mdxSlugs];
}

/** Resolve a slug to its pipeline so the route knows how to render it. */
export function resolveResearch(
  slug: string,
):
  | { kind: "paragraph"; config: ParagraphResearch }
  | { kind: "mdx" }
  | null {
  const config = PARAGRAPH_RESEARCH.find((p) => p.slug === slug);
  if (config) return { kind: "paragraph", config };

  const mdxPath = path.join(RESEARCH_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) return { kind: "mdx" };

  return null;
}
