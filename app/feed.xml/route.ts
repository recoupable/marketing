import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/config";

/**
 * RSS feed — generated from every entry in the unified content hub
 * (essays, guides, tutorials, updates). Accessible at /feed.xml
 */
export function GET() {
  const entries = getAllContent();

  const itemsXml = entries
    .map(
      (entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${siteConfig.url}/blog/${entry.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${entry.slug}</guid>
      <description><![CDATA[${entry.excerpt}]]></description>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <author>${entry.author}</author>
      ${entry.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${siteConfig.description}</description>
    <language>${siteConfig.metadata.locale.replace("_", "-")}</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
