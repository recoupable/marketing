/** Extract bounded public evidence and navigable links, excluding executable content. */
export function extractCompanyPage(html: string, pageUrl: string) {
  const clean = html.replace(
    /<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );
  const textOf = (value: string) =>
    value
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#(?:39|x27);/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  const metadata = new Map<string, string>();
  for (const [tag] of clean.matchAll(/<meta\b[^>]*>/gi)) {
    const key = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    const value = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (key && value) metadata.set(key.toLowerCase(), textOf(value));
  }
  const declaredDate =
    metadata.get("article:published_time") ?? metadata.get("datepublished");
  const publishedAt =
    declaredDate &&
    /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(declaredDate) &&
    Number.isFinite(Date.parse(declaredDate))
      ? declaredDate
      : undefined;
  const links = new Map<string, { url: string; label: string }>();
  for (const match of clean.matchAll(
    /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
  )) {
    try {
      const url = new URL(match[1].replace(/&amp;/g, "&"), pageUrl);
      if (
        url.protocol !== "https:" ||
        url.username ||
        url.password ||
        (url.port && url.port !== "443")
      )
        continue;
      url.hash = "";
      if (/\.(?:jpg|jpeg|png|gif|svg|mp3|mp4|zip|pdf)$/i.test(url.pathname))
        continue;
      const label = textOf(match[2]).slice(0, 160);
      if (label && url.href !== pageUrl)
        links.set(url.href, { url: url.href, label });
    } catch {
      /* Malformed links are not research candidates. */
    }
  }
  const text = textOf(clean);
  return {
    url: pageUrl,
    title: textOf(clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ""),
    siteName: metadata.get("og:site_name")?.slice(0, 100),
    publishedAt,
    text: text.slice(0, 20000),
    truncated: text.length > 20000,
    links: [...links.values()].slice(0, 60),
    retrievedAt: new Date().toISOString(),
  };
}
