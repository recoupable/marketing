/**
 * Convert a Paragraph epoch-millisecond timestamp string to an ISO date.
 */
export function timestampToISODate(timestamp: string): string {
  const milliseconds = Number(timestamp);
  if (!Number.isFinite(milliseconds)) return "";

  const date = new Date(milliseconds);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/**
 * Strip HTML tags to plain text — used for reading-time estimation.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Estimate reading time from plain-text content at 200 wpm.
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Self-contained info glyph that replaces Paragraph's login-gated callout icon.
 * Uses `currentColor` so callout CSS controls its color. data-callout-icon lets
 * our stylesheet size/position it like the original.
 */
const CALLOUT_ICON_SVG =
  '<svg data-callout-icon width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>' +
  '<path d="M12 11v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
  '<circle cx="12" cy="7.75" r="1.25" fill="currentColor"/></svg>';

/**
 * Normalize Paragraph's pre-rendered HTML for use on our domain.
 *
 * Paragraph embeds some assets from its own editor host
 * (`paragraph.com/editor/*`) that are gated behind login — e.g. the callout
 * info icon — so they 307 → login page and render as broken images for us.
 * We (1) strip `<link rel="preload">` tags (they reference those gated assets
 * and are meaningless mid-body) and (2) swap the gated callout icon for an
 * inline SVG. This is not XSS sanitization; `ContentArticle` sanitizes the final
 * HTML immediately before rendering.
 */
export function normalizeParagraphHtml(html: string): string {
  return (
    html
      // Drop preload <link> tags (gated asset hints, invalid inside body).
      .replace(/<link\b[^>]*rel=["']preload["'][^>]*>/gi, "")
      // Replace the gated callout icon <img> with a self-contained inline SVG.
      .replace(/<img\b[^>]*class=["'][^"']*callout-button[^"']*["'][^>]*>/gi, CALLOUT_ICON_SVG)
  );
}
