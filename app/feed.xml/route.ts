import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const items = posts.map((post) => `<item><title>${xml(post.title)}</title><link>${xml(`${siteConfig.url}/blog/${post.slug}`)}</link><guid isPermaLink="true">${xml(`${siteConfig.url}/blog/${post.slug}`)}</guid><description>${xml(post.excerpt)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate><category>${xml(post.category)}</category><dc:creator>${xml(post.author)}</dc:creator></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>Recoup: AI and the business of music</title><link>${xml(`${siteConfig.url}/blog`)}</link><description>Ideas and practical guides from Recoup on AI and the business of music.</description><language>en-us</language><atom:link href="${xml(`${siteConfig.url}/feed.xml`)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
