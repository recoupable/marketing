import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";
import { PostCard } from "@/components/blog/PostCard";
import { BlogCTA } from "@/components/blog/BlogCTA";

/**
 * SEO metadata for the blog index page.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Blog — AI Music Agents, Artist Growth & Music Ops",
  description:
    "Insights on AI-powered music marketing, content creation, and artist growth. Tutorials, case studies, and building-in-public updates from the Recoup team.",
  path: "/blog",
});

/**
 * Blog index page — lists all published posts, newest first.
 */
export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-36 sm:pt-44 pb-16">
      {/* Page header */}
      <header className="mb-12">
        <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45 mb-5">
          Blog
        </p>
        <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] tracking-tight leading-[1.05] text-[var(--foreground)] mb-4">
          Building in public.
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-xl">
          Notes on AI agents for music — research, open tools, and what we learn
          running our own label.
        </p>
        <Link
          href="/research"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-(--foreground) transition-colors hover:text-(--brand)"
        >
          Want the deeper essays? Read our research
          <ArrowRight className="h-4 w-4" />
        </Link>
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
      {/* Email capture */}
      <BlogCTA />
    </div>
  );
}
