/**
 * Shape of a post returned by the public Paragraph.com API.
 * Only the fields we render are typed.
 */
export interface ParagraphPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  imageUrl?: string;
  /** Epoch milliseconds as a string */
  publishedAt: string;
  /** Epoch milliseconds as a string */
  updatedAt: string;
  /** Pre-rendered HTML body */
  staticHtml?: string;
  markdown?: string;
}
