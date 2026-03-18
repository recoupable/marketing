import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Convert raw MDX/markdown content to HTML string.
 * Uses remark with GFM (tables, strikethrough, etc.) support.
 */
export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return result.toString();
}
