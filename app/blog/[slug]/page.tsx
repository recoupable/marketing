import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, formatBlogDate, getBlogPost } from "@/lib/blog";
import { site } from "@/lib/site";
import { blogAuthorContext, blogDescription, blogPostJsonLd, blogPostMetadata, relatedBlogPosts } from "@/lib/editorial-seo";
import { BlogBody } from "../blog-body";
import { SkyArrow } from "@/components/sky/arrow";

export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return blogPostMetadata(post, site.url);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const related = relatedBlogPosts(post, blogPosts);
  const authorContext = blogAuthorContext(post.author);
  return <div className="blog-reader">
    <Link href="/blog" className="blog-back"><span className="blog-back-arrow"><SkyArrow direction="right" /></span> All articles</Link>
    <article>
      <header className="blog-article-header"><p className="blog-eyebrow">{post.category}</p><h1>{post.title}</h1><p className="blog-article-deck">{blogDescription(post)}</p><div className="blog-author"><div><strong>{authorContext ? <Link href={authorContext.href} rel="author">{post.author}</Link> : post.author}</strong>{authorContext && <p>{authorContext.description}</p>}<p><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span aria-hidden="true"> · </span>{post.readingMinutes} min read{post.updatedAt && post.updatedAt.slice(0, 10) !== post.date.slice(0, 10) && <><span aria-hidden="true"> · </span>Updated <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time></>}</p></div></div></header>
      {post.coverImage && <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="blog-cover" src={post.coverImage} alt="" />
      </>}
      <BlogBody body={post.body} />
    </article>
    <section className="blog-related" aria-labelledby="blog-related-title"><h2 id="blog-related-title">Keep reading</h2>{related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><span className="blog-eyebrow">{item.category}</span><h3>{item.title}</h3><SkyArrow /></Link>)}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post, site.url)).replace(/</g, "\\u003c") }} />
  </div>;
}
