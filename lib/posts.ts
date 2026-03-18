import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { postFrontmatterSchema, type Post } from "./post-schema";

/** Directory where MDX blog posts live */
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Read and parse a single MDX post by slug.
 * Validates frontmatter against the Zod schema — throws if invalid.
 */
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  // Validate frontmatter — will throw a ZodError with details if invalid
  const frontmatter = postFrontmatterSchema.parse(data);

  return { ...frontmatter, content };
}

/**
 * Get all published posts, sorted by date (newest first).
 * Skips drafts unless includeDrafts is true.
 */
export function getAllPosts(
  options: { includeDrafts?: boolean } = {},
): Post[] {
  const { includeDrafts = false } = options;

  // Find all .mdx files in the posts directory
  const fileNames = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"));

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      try {
        return getPostBySlug(slug);
      } catch {
        // Skip posts with invalid frontmatter during listing
        return null;
      }
    })
    .filter((post): post is Post => {
      if (!post) return false;
      if (!includeDrafts && post.status === "draft") return false;
      return true;
    });

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Get all unique tags across published posts.
 * Useful for blog index filtering.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Get posts that share tags with the given post (for "Related Posts").
 * Excludes the post itself. Returns up to `limit` posts.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  const allPosts = getAllPosts();

  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => ({
      post,
      // Score = number of shared tags
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Get all unique post slugs — used by generateStaticParams() for SSG.
 */
export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}
