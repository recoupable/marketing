import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

/**
 * Homepage — hero section with value prop, CTA, and latest blog posts.
 */
export default function HomePage() {
  // Show up to 4 latest posts on the homepage
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ── Hero Section ── */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6 max-w-3xl mx-auto leading-tight">
          Your AI marketing team —{" "}
          <span className="text-[var(--brand)]">always on</span>, always
          creating, always learning.
        </h1>
        <p className="text-xl text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto leading-relaxed">
          Recoupable is the AI agent that handles your music marketing — content
          creation, social distribution, and audience growth — so you can focus
          on making music.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href={siteConfig.appUrl}
            className="bg-[var(--brand)] text-white px-8 py-3 rounded-md text-base font-medium hover:bg-[var(--brand-light)] transition-colors"
          >
            Try Recoupable Free
          </Link>
          <Link
            href="/blog"
            className="border border-[var(--border)] text-[var(--foreground)] px-8 py-3 rounded-md text-base font-medium hover:bg-[var(--muted)] transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2">Tell the Agent</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Chat with your AI agent in plain language. Tell it about your
              artist, your release, your goals.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Agent Creates</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              The agent creates social posts, captions, video scripts, and
              marketing content — formatted for each platform.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Distribute & Learn</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Content goes out across your channels. The agent tracks what works
              and gets better over time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="bg-[var(--muted)] rounded-lg p-8 md:p-12 text-center">
          <blockquote className="text-lg md:text-xl italic text-[var(--foreground)] max-w-2xl mx-auto mb-4">
            &ldquo;I sat down at 10pm to make content. By midnight I had 22
            finished videos. Captioned. Formatted. Queued. I didn&apos;t edit a
            single one.&rdquo;
          </blockquote>
          <p className="text-sm text-[var(--muted-foreground)]">
            — Sidney Swift, Founder
          </p>
        </div>
      </section>

      {/* ── Latest from the Blog ── */}
      {latestPosts.length > 0 && (
        <section className="py-16 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest from the Blog</h2>
            <Link
              href="/blog"
              className="text-sm text-[var(--brand)] hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="py-20 text-center border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">
          Ready to stop grinding and start growing?
        </h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
          Join artists and labels using AI to handle their music marketing.
        </p>
        <Link
          href={siteConfig.appUrl}
          className="bg-[var(--brand)] text-white px-8 py-3 rounded-md text-base font-medium hover:bg-[var(--brand-light)] transition-colors"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
}
