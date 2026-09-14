import { SubscribeCard } from "@/components/marketing-migration/subscribe-card";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, formatBlogDate } from "@/lib/blog";
import { blogDescription, blogIndexJsonLd } from "@/lib/editorial-seo";
import { siteConfig } from "@/lib/config";
import { BlogArt } from "./blog-art";
import { BlogArchive } from "./blog-archive";
import { SkyArrow } from "@/components/sky/arrow";

export const metadata: Metadata = {
  title: "Blog: Practical guides to AI and music",
  description: "Ideas and practical guides from Recoup on AI strategy, music operations, artist marketing, and putting agents to work.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": `${siteConfig.url}/feed.xml` } },
  openGraph: { title: "Recoup blog: Practical guides to AI and music", description: "Ideas and practical guides from Recoup on AI strategy, music operations, artist marketing, and putting agents to work.", url: `${siteConfig.url}/blog`, type: "website", siteName: "Recoup", images: [{ url: `${siteConfig.url}/opengraph-image`, alt: "Recoup: AI transformation for music" }] },
  twitter: { card: "summary_large_image", title: "Recoup blog: Practical guides to AI and music", description: "Ideas and practical guides from Recoup on AI strategy, music operations, artist marketing, and putting agents to work.", images: [`${siteConfig.url}/opengraph-image`] },
};

export default function BlogPage() {
  const [featured, ...remaining] = blogPosts;
  const posts = [...remaining].sort((a, b) => b.date.localeCompare(a.date));
  return <div className="blog-index">
    <header className="blog-intro"><p className="blog-eyebrow">The Recoup blog</p><h1>Practical guides to<br /><span>AI and music.</span></h1><p>Workflows, tools, and ideas for managing artists, marketing releases, and running catalogs.</p></header>
    <Link href={`/blog/${featured.slug}`} className="blog-feature">
      <BlogArt slug={featured.slug} feature />
      <div className="blog-feature-copy"><p className="blog-eyebrow">Featured · {featured.category}</p><h2>{featured.title}</h2><p>{blogDescription(featured)}</p><div className="blog-post-meta"><span>{featured.author}</span><span>{featured.readingMinutes} min read</span></div><span className="blog-read">Read the article <SkyArrow /></span></div>
    </Link>
    <SubscribeCard source="/blog" />
    <BlogArchive entries={posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: blogDescription(post),
      category: post.category,
      card: <article key={post.slug}><Link href={`/blog/${post.slug}`} className="blog-card"><BlogArt slug={post.slug} image={post.coverImage} /><div className="blog-card-copy"><p className="blog-eyebrow">{post.category}</p><h3>{post.title}</h3><p>{blogDescription(post)}</p><div className="blog-post-meta"><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span>{post.readingMinutes} min read</span></div></div></Link></article>,
    }))} />
    <section className="blog-cta"><div><p className="blog-eyebrow">Put an idea to work</p><h2>What would you build?</h2><p>Bring us a project, or a part of your business you want to improve.</p></div><Link className="blog-talk" href="/start-project">Get a Free Audit <SkyArrow /></Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd([featured, ...posts], siteConfig.url)).replace(/</g, "\\u003c") }} />
  </div>;
}
