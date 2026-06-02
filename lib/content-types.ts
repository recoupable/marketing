/**
 * Pure types and constants for the unified /blog content hub.
 *
 * This module has NO node (`fs`/`path`) imports so it can be safely imported by
 * client components (e.g. ContentList) without dragging the server-only content
 * loader into the browser bundle. The data-loading logic lives in `content.ts`.
 */

/** Where an entry's body comes from — tells the detail route how to render it. */
export type ContentSource = "post" | "research-mdx" | "paragraph";

/** Reader-facing buckets used by the index filter tabs. */
export type ContentCategory = "essay" | "guide" | "tutorial" | "update";

/** Singular labels — used on cards and the article eyebrow. */
export const CONTENT_CATEGORY_LABELS: Record<ContentCategory, string> = {
  essay: "Essay",
  guide: "Guide",
  tutorial: "Tutorial",
  update: "Update",
};

/** Plural labels — used on the filter tabs. */
export const CONTENT_CATEGORY_TAB_LABELS: Record<ContentCategory, string> = {
  essay: "Essays",
  guide: "Guides",
  tutorial: "Tutorials",
  update: "Updates",
};

/** Display order for the filter tabs. */
export const CONTENT_CATEGORY_ORDER: readonly ContentCategory[] = [
  "essay",
  "guide",
  "tutorial",
  "update",
];

/** Normalized card shape, identical regardless of pipeline. */
export interface ContentEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  category: ContentCategory;
  source: ContentSource;
}
