/**
 * Content negotiation for /docs pages. Returns the raw-markdown path a request
 * should be rewritten to, or null when the ordinary HTML page should be served.
 *
 * Markdown is served when the path ends in .md, when the client accepts
 * text/markdown at least as much as text/html, or when it prefers text/plain
 * over text/html. A q=0 type is a refusal and never selects markdown. Raw and
 * spec paths already serve machine formats, and the API reference overview has
 * no markdown source, so those never rewrite.
 */
const quality = (accept: string, mediaType: string) =>
  accept.split(",").reduce((best, entry) => {
    const [type, ...parameters] = entry.split(";").map(part => part.trim().toLowerCase());
    if (type !== mediaType) return best;
    const q = Number(parameters.find(parameter => parameter.startsWith("q="))?.slice(2) ?? 1);
    return Math.max(best, Number.isFinite(q) ? q : 0);
  }, 0);

export function negotiateDocsMarkdown(pathname: string, accept: string | null): string | null {
  const match = /^\/docs(?:\/(.*))?$/.exec(pathname);
  if (!match) return null;
  const rest = (match[1] ?? "").replace(/\/+$/, "");
  if (/^(raw|spec)(\/|$)/.test(rest)) return null;
  const explicit = rest.endsWith(".md");
  const slug = (explicit ? rest.slice(0, -3) : rest) || "index";
  if (slug === "api-reference") return null;
  const header = accept ?? "";
  const [markdown, plain, html] = ["text/markdown", "text/plain", "text/html"].map(type => quality(header, type));
  const wantsMarkdown = explicit || (markdown > 0 && markdown >= html) || (plain > 0 && plain > html);
  return wantsMarkdown ? `/docs/raw/${slug}.md` : null;
}
