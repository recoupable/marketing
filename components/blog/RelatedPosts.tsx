import type { Post } from "@/lib/post-schema";
import { PostCard } from "./PostCard";

/**
 * Displays a grid of related posts below the main content.
 * Gets posts from getRelatedPosts() in lib/posts.ts.
 */
export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[var(--border)]">
      <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
