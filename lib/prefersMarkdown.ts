const quality = (accept: string, mediaType: string) =>
  accept.split(",").reduce((best, entry) => {
    const [type, ...parameters] = entry.split(";").map(part => part.trim().toLowerCase());
    if (type !== mediaType) return best;
    const q = Number(parameters.find(parameter => parameter.startsWith("q="))?.slice(2) ?? 1);
    return Math.max(best, Number.isFinite(q) ? q : 0);
  }, 0);

/**
 * Whether an Accept header asks for Markdown: text/markdown at least as much as
 * text/html, or text/plain over text/html. A q=0 text/markdown is a refusal.
 */
export function prefersMarkdown(accept: string | null): boolean {
  const header = accept ?? "";
  const [markdown, plain, html] = ["text/markdown", "text/plain", "text/html"].map(type => quality(header, type));
  const refusesMarkdown = markdown === 0 && header.split(",").some(entry => entry.split(";")[0].trim().toLowerCase() === "text/markdown");
  return !refusesMarkdown && ((markdown > 0 && markdown >= html) || (plain > 0 && plain > html));
}
