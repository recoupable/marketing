import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { postFrontmatterSchema, type Post, type PostType } from "./post-schema";
import { getAllPosts, getPostBySlug } from "./posts";
import {
  type ContentCategory,
  type ContentEntry,
  type ContentSource,
} from "./content-types";

/**
 * Unified content layer for the /blog hub — the single source of truth for
 * every article, essay, guide, tutorial, and update on the marketing site.
 *
 * Three pipelines feed one hub:
 *  1. Blog MDX         — content/posts/*.mdx     (tactical guides, tutorials)
 *  2. Research MDX     — content/research/*.mdx  (in-repo essays)
 *  3. Paragraph-synced — bodies live on paragraph.com, fetched at request time
 *
 * Every entry is normalized to a ContentEntry and bucketed into a
 * ContentCategory so the index can offer Essays / Guides / Tutorials / Updates
 * filters from one list.
 *
 * Pure types and label constants live in `content-types.ts` (node-free) so
 * both server and client code import them from there directly. This module
 * holds the server-only data loaders.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const RESEARCH_DIR = path.join(process.cwd(), "content", "research");

/** A Paragraph-backed essay. `paragraphId` is the Paragraph post ID. */
export interface ParagraphResearch {
  slug: string;
  paragraphId: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  date: string;
  author: string;
  tags: string[];
}

/**
 * Card metadata for Paragraph essays. The body is fetched live by ID on the
 * detail page; this only powers the index cards + ordering, so the index stays
 * fast and resilient even if Paragraph is briefly unreachable.
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

/**
 * Bucket an entry into a reader-facing category.
 * A "tutorial" type/tag always wins; announcements are updates; everything from
 * the research pipelines reads as an essay; remaining blog posts are guides.
 */
export function categoryFor(params: {
  type?: PostType;
  tags: string[];
  source: ContentSource;
}): ContentCategory {
  const { type, tags, source } = params;
  if (type === "tutorial" || tags.includes("tutorial")) return "tutorial";
  if (type === "announcement") return "update";
  if (source === "paragraph" || source === "research-mdx") return "essay";
  return "guide";
}

/** Read + parse a single in-repo research MDX post by slug. */
export function getResearchPostBySlug(slug: string): Post {
  const filePath = path.join(RESEARCH_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const frontmatter = postFrontmatterSchema.parse(data);
  return { ...frontmatter, content };
}

/** All in-repo research MDX posts (published only). */
function getMdxResearchPosts(): Post[] {
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

/** Map a parsed MDX post to a normalized ContentEntry. */
function postToEntry(post: Post, source: ContentSource): ContentEntry {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    updatedAt: post.updatedAt,
    author: post.author,
    tags: post.tags,
    category: categoryFor({ type: post.type, tags: post.tags, source }),
    source,
  };
}

/** Every content entry across all three pipelines, newest first. */
export function getAllContent(): ContentEntry[] {
  const paragraphEntries: ContentEntry[] = PARAGRAPH_RESEARCH.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    author: p.author,
    tags: p.tags,
    category: categoryFor({ tags: p.tags, source: "paragraph" }),
    source: "paragraph",
  }));

  const blogEntries = getAllPosts().map((post) => postToEntry(post, "post"));
  const researchEntries = getMdxResearchPosts().map((post) =>
    postToEntry(post, "research-mdx"),
  );

  return [...paragraphEntries, ...blogEntries, ...researchEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** All slugs across pipelines — used by generateStaticParams(). */
export function getAllContentSlugs(): string[] {
  return getAllContent().map((entry) => entry.slug);
}

/**
 * Related entries by shared-tag overlap (excludes the entry itself).
 * Highest tag-overlap first; returns up to `limit`.
 */
export function getRelatedContent(slug: string, limit = 4): ContentEntry[] {
  const all = getAllContent();
  const current = all.find((entry) => entry.slug === slug);
  if (!current) return [];

  return all
    .filter((entry) => entry.slug !== slug)
    .map((entry) => ({
      entry,
      score: entry.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/** Resolve a slug to its pipeline so the detail route knows how to render it. */
export type ContentResolution =
  | { kind: "post"; post: Post }
  | { kind: "research-mdx"; post: Post }
  | { kind: "paragraph"; config: ParagraphResearch };

export function resolveContent(slug: string): ContentResolution | null {
  if (fs.existsSync(path.join(POSTS_DIR, `${slug}.mdx`))) {
    try {
      return { kind: "post", post: getPostBySlug(slug) };
    } catch {
      // Invalid frontmatter — fall through to the other pipelines.
    }
  }

  if (fs.existsSync(path.join(RESEARCH_DIR, `${slug}.mdx`))) {
    try {
      return { kind: "research-mdx", post: getResearchPostBySlug(slug) };
    } catch {
      // Invalid frontmatter — fall through.
    }
  }

  const config = PARAGRAPH_RESEARCH.find((p) => p.slug === slug);
  if (config) return { kind: "paragraph", config };

  return null;
}
