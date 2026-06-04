import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Drop a leading `# Heading` from markdown content.
 *
 * MDX posts repeat their title as a top-level H1 at the start of the body, but
 * the article layout already renders the title in its header. Without this,
 * the title shows twice. Only the FIRST line is stripped, and only if it's an
 * H1, so in-body headings are untouched.
 */
export function stripLeadingH1(content: string): string {
  return content.replace(/^\s*#\s+.*(?:\r?\n)+/, "");
}

/**
 * Convert raw MDX/markdown content to HTML string.
 * Uses remark with GFM (tables, strikethrough, etc.) support.
 */
export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return result.toString();
}
