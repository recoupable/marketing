import { z } from "zod";

/**
 * Zod schema for blog post frontmatter.
 * This is the single data model that content, distribution, SEO,
 * and analytics all read from. See PLAN.md Foundation 3 for design rationale.
 */

/** Content types — drives layout, JSON-LD schema, and distribution strategy */
export const postTypeSchema = z.enum([
  "article",
  "case-study",
  "tutorial",
  "announcement",
  "pillar",
]);

export type PostType = z.infer<typeof postTypeSchema>;

/** Post status — controls what's live vs. draft */
export const postStatusSchema = z.enum(["draft", "published"]);

export type PostStatus = z.infer<typeof postStatusSchema>;

/** SEO metadata — drives generateMetadata(), JSON-LD, OG tags */
const seoSchema = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(170),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
});

/** Topic cluster — drives internal linking + topical authority */
const clusterSchema = z.object({
  /** null = this IS the pillar page; "slug" = belongs to that pillar */
  pillar: z.string().nullable(),
});

/** Performance data — added after 30+ days to close the learning loop */
const performanceSchema = z
  .object({
    views: z.number().optional(),
    subscribes: z.number().optional(),
    avg_time_on_page: z.string().optional(),
    top_referrer: z.string().optional(),
    notes: z.string().optional(),
  })
  .optional();

/** The complete post frontmatter schema */
export const postFrontmatterSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(2),
  date: z.string(), // ISO date string e.g. "2026-03-16"
  updatedAt: z.string().optional(),
  author: z.string(),
  excerpt: z.string().min(20).max(300),
  coverImage: z.string().optional(),

  type: postTypeSchema,
  seo: seoSchema,
  tags: z.array(z.string()),
  category: z.string(),
  cluster: clusterSchema.optional(),
  status: postStatusSchema,
  performance: performanceSchema,
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

/** A parsed post = validated frontmatter + the raw MDX content body */
export type Post = PostFrontmatter & {
  content: string;
};
