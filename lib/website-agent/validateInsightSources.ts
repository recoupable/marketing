export function validateInsightSources(
  sources: { url: string; quote: string }[],
  pages: Record<string, string>,
): string | undefined {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[“”‘’"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  for (const source of sources) {
    if (!pages[source.url]) return `Read ${source.url} before citing it.`;
    if (
      !normalize(source.quote) ||
      !normalize(pages[source.url]).includes(normalize(source.quote))
    )
      return `The quote from ${source.url} does not match the retrieved page. Use a short exact excerpt.`;
  }
}
