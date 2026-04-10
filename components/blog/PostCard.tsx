import Link from "next/link";
import type { PostFrontmatter } from "@/lib/post-schema";

/**
 * A card preview for a blog post — used on the blog index page.
 * Shows title, excerpt, date, tags, and post type.
 */
export function PostCard({ post }: { post: PostFrontmatter }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand-muted)] transition-colors duration-200 border-l-4 border-l-[var(--brand)]">
      <Link
        href={`/blog/${post.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-inset rounded-lg"
      >
        {/* Post type badge */}
        <span className="inline-block text-xs font-medium uppercase tracking-wider text-[var(--brand)] mb-2">
          {post.type}
        </span>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors mb-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Meta row: date + tags */}
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <time dateTime={post.date}>{formattedDate}</time>
          <div className="flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-[var(--muted)] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
