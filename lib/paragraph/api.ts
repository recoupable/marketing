import type { ParagraphPost } from "./types";

/**
 * Public Paragraph.com content API. No auth required — posts are public.
 * Research essays are authored on Paragraph and synced here at request time,
 * so paragraph.com stays the single source of truth for the body.
 */
const PARAGRAPH_API_BASE = "https://public.api.paragraph.com/api/v1";

/**
 * Fetch a single Paragraph post by its 20-char post ID.
 * ISR-cached for 1 hour. Returns null on any failure so callers can 404
 * gracefully instead of crashing the page.
 */
export async function getParagraphPost(
  postId: string,
): Promise<ParagraphPost | null> {
  try {
    const response = await fetch(
      `${PARAGRAPH_API_BASE}/posts/${postId}?includeContent=true`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      console.error(`Failed to fetch Paragraph post ${postId}: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching Paragraph post ${postId}:`, error);
    return null;
  }
}
