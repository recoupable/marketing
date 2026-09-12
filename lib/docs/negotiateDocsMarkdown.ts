/**
 * Content negotiation for /docs pages. Returns the raw-markdown path a request
 * should be rewritten to, or null when the ordinary HTML page should be served.
 *
 * Markdown is served when the path ends in .md, when the client accepts
 * text/markdown, or when it accepts text/plain but not text/html. Raw and spec
 * paths already serve machine formats, and the API reference overview has no
 * markdown source, so those never rewrite.
 */
export function negotiateDocsMarkdown(pathname: string, accept: string | null): string | null {
  const match = /^\/docs(?:\/(.*))?$/.exec(pathname);
  if (!match) return null;
  const rest = (match[1] ?? "").replace(/\/+$/, "");
  if (/^(raw|spec)(\/|$)/.test(rest)) return null;
  const explicit = rest.endsWith(".md");
  const slug = (explicit ? rest.slice(0, -3) : rest) || "index";
  if (slug === "api-reference") return null;
  const types = (accept ?? "").toLowerCase();
  const wantsMarkdown = explicit || types.includes("text/markdown") || (types.includes("text/plain") && !types.includes("text/html"));
  return wantsMarkdown ? `/docs/raw/${slug}.md` : null;
}
