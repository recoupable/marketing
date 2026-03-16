import { Suspense } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

/**
 * Homepage — matches live recoupable.com positioning:
 * "Meet Your New AI Artist Services"
 * "Spend more time doing what you love. Let agents handle the rest."
 */
export default function HomePage() {
  // Show up to 4 latest posts on the homepage
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ── Hero Section ── */}
      <section className="py-24 text-center">
        {/* Badge — matches "Artist Intelligence | See how it works →" */}
        <div className="inline-flex items-center gap-2 bg-[var(--foreground)] text-white rounded-full px-4 py-2 text-sm mb-8">
          <span className="font-medium">🌐 Artist Intelligence</span>
          <Link
            href={siteConfig.appUrl}
            className="border-l border-white/30 pl-2 hover:underline"
          >
            See how it works ↗
          </Link>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-2 max-w-3xl mx-auto leading-tight">
          Meet Your New AI
        </h1>
        <p className="text-5xl md:text-6xl font-serif italic text-[var(--foreground)] mb-6">
          Artist Services
        </p>
        <p className="text-xl text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto leading-relaxed">
          Spend more time doing what you love. Let agents handle the rest.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href={siteConfig.appUrl}
            className="bg-[var(--foreground)] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[var(--foreground)]/90 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            href={siteConfig.appUrl}
            className="border border-[var(--border)] text-[var(--foreground)] px-8 py-3 rounded-full text-base font-medium hover:bg-[var(--muted)] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* ── What Agents Do ── */}
      <section className="py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold text-center mb-4">
          Unlock the potential of your roster
        </h2>
        <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-xl mx-auto">
          Intelligent, task-focused agents that Create, Connect, Report, Plan,
          and Research — so you can focus on the music.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              category: "Create",
              title: "Content & Creative",
              description:
                "Generate viral content ideas, brand redesigns, content calendars, and visual mockups.",
            },
            {
              category: "Connect",
              title: "Growth & Engagement",
              description:
                "Find cross-promotion partners, prioritize comments, and discover corporate partnerships.",
            },
            {
              category: "Research",
              title: "Intelligence & Insights",
              description:
                "Audit competitors, track daily social trends, and analyze fan segment revenue.",
            },
          ].map((agent) => (
            <div
              key={agent.category}
              className="border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand)] transition-colors"
            >
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-[var(--brand)] mb-2">
                {agent.category}
              </span>
              <h3 className="font-semibold text-lg mb-2">{agent.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {agent.description}
              </p>
            </div>
          ))}
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

      {/* ── Subscribe Section ── */}
      <section className="py-20 text-center border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
          Get insights on AI-powered music marketing, product updates, and
          artist growth strategies.
        </p>
        <div className="max-w-md mx-auto">
          <Suspense fallback={<div className="h-12" />}>
            <SubscribeForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
