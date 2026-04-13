import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/posts";
import { buildPostMetadata, buildPostJsonLd } from "@/lib/seo";
import { markdownToHtml } from "@/lib/markdown";
import { PostBody } from "@/components/blog/PostBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

/**
 * Generate static params for all posts — enables SSG.
 */
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/**
 * Generate per-post SEO metadata (title, description, OG tags, canonical).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return buildPostMetadata(post);
  } catch {
    return { title: "Post Not Found" };
  }
}

/**
 * Blog post page — renders MDX content with full SEO + JSON-LD.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(post.content);

  // Get related posts for the sidebar/footer
  const relatedPosts = getRelatedPosts(slug);

  // Build JSON-LD structured data
  const jsonLd = buildPostJsonLd(post);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Post header */}
        <header className="mb-10">
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-[var(--brand)] mb-3">
            {post.type}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

        {/* Post body */}
        <PostBody content={htmlContent} />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
}
