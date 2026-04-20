import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";
import { PostCard } from "@/components/blog/PostCard";

/**
 * SEO metadata for the blog index page.
 */
export const metadata: Metadata = buildPageMetadata({
  title: `Blog | ${siteConfig.name}`,
  description:
    "Insights on AI-powered music marketing, content creation, and artist growth. Tutorials, case studies, and building-in-public updates.",
  path: "/blog",
});

/**
 * Blog index page — lists all published posts, newest first.
 */
export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3">
          Blog
        </h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Insights on AI-powered music marketing, content creation, and artist
          growth.
        </p>
      </header>

      {/* Post grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)]">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  );
}
