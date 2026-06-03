import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes article HTML from Markdown and Paragraph before rendering.
 * Keep this allowlist small: article prose needs semantic tags, links, images,
 * and the inline callout SVG we inject while normalizing Paragraph HTML.
 */
export function sanitizeContentHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "svg",
      "circle",
      "path",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id", "aria-hidden"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
      svg: [
        "data-callout-icon",
        "width",
        "height",
        "viewBox",
        "fill",
        "xmlns",
        "aria-hidden",
      ],
      circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
      path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });
}
