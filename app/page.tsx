import { Suspense } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { homeCopy } from "@/lib/copy/home";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

/**
 * Homepage — copy from lib/copy/home (single source for human + machine view).
 * Layout: asymmetric, editorial rhythm, no generic card grids (Impeccable frontend-design).
 */
export default function HomePage() {
  const c = homeCopy;
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero — left-aligned, asymmetric */}
      <section className="section-spacing max-w-3xl">
        <h1 className="text-display font-bold tracking-tight text-[var(--foreground)] mb-6 leading-tight">
          {c.hero.headline}
        </h1>
        <p className="text-lead text-[var(--muted-foreground)] mb-10 max-w-xl leading-relaxed">
          {c.hero.subheader}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={c.hero.ctaHref}
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full text-base font-medium hover:bg-black/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {c.hero.ctaPrimary}
          </Link>
        </div>
      </section>

      {/* Pain — list with rhythm, not centered block */}
      <section className="section-spacing-tight border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          {c.pain.title}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl text-[var(--muted-foreground)] text-body">
          {c.pain.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--brand)] shrink-0" aria-hidden>—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* What we do — asymmetric: one outcome emphasized, rest in list/grid mix */}
      <section className="section-spacing border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          {c.whatWeDo.title}
        </h2>
        <p className="text-[var(--muted-foreground)] text-body mb-10 max-w-xl">
          {c.whatWeDo.subtitle}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {c.whatWeDo.outcomes.map((item, i) => (
            <div
              key={item.title}
              className={
                i === 0
                  ? "sm:col-span-2 border-l-4 border-[var(--brand)] pl-5 pr-4 py-4 bg-[var(--muted)]/50 rounded-r-lg"
                  : "border border-[var(--border)] rounded-lg p-5 hover:border-[var(--brand-muted)] transition-colors duration-200"
              }
            >
              <h3 className="font-semibold text-lg text-[var(--foreground)] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases — horizontal segments, not identical cards */}
      <section className="section-spacing border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
          {c.useCases.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {c.useCases.segments.map((seg) => (
            <div key={seg.title} className="md:first:pt-0">
              <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
                {seg.title}
              </h3>
              <p className="text-body text-[var(--muted-foreground)]">
                {seg.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — numbered steps, minimal chrome */}
      <section className="section-spacing border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
          {c.howItWorks.title}
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 max-w-3xl">
          {c.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm font-semibold"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8">
          <Link
            href={c.howItWorks.platformLink}
            className="text-body font-medium text-[var(--brand)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 rounded"
          >
            {c.howItWorks.platformLinkLabel} →
          </Link>
        </p>
      </section>

      {/* Proof — editorial blockquote, no generic card */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="max-w-2xl">
          <blockquote className="text-lead italic text-[var(--foreground)] border-l-4 border-[var(--brand)] pl-6 py-2">
            &ldquo;{c.proof.quote}&rdquo;
          </blockquote>
          <p className="text-sm text-[var(--muted-foreground)] mt-4">
            {c.proof.attribution}
          </p>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="section-spacing border-t border-[var(--border)]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              {c.blog.title}
            </h2>
            <Link
              href={c.blog.viewAllHref}
              className="text-body font-medium text-[var(--brand)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 rounded"
            >
              {c.blog.viewAllLabel} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Subscribe — clear CTA, single column */}
      <section className="section-spacing border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          {c.subscribe.title}
        </h2>
        <p className="text-lead text-[var(--muted-foreground)] mb-8 max-w-xl">
          {c.subscribe.description}
        </p>
        <div className="max-w-md">
          <Suspense fallback={<div className="h-12" />}>
            <SubscribeForm />
          </Suspense>
        </div>
      </section>

      {/* Closing — confident one-liner */}
      <section className="section-spacing border-t border-[var(--border)]">
        <p className="text-lead font-medium text-[var(--foreground)]">
          {c.closing.line1}
        </p>
        <p className="text-body text-[var(--muted-foreground)] mt-1">
          {c.closing.line2}
        </p>
        <Link
          href={c.closing.ctaHref}
          className="inline-flex items-center justify-center mt-6 bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {c.closing.ctaLabel}
        </Link>
      </section>
    </div>
  );
}
