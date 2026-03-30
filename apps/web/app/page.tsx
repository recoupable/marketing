import { Suspense } from "react";
import Link from "next/link";
import { homeCopy } from "@/lib/copy/home";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { Marquee } from "@/components/home/Marquee";
import { IngestFeed } from "@/components/home/IngestFeed";

export default function HomePage() {
  const c = homeCopy;
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-40">
        {/* Radial warm glow — laptop screen in the dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(212, 168, 67, 0.06) 0%, transparent 70%)",
          }}
        />

        {/* System metadata — subtle, ambient */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--brand) animate-blink" />
          <span className="text-[11px] font-mono tracking-widest text-(--muted-foreground)">
            SYS.ONLINE
          </span>
        </div>
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          <span className="text-[11px] font-mono tracking-widest text-(--muted-foreground)">
            v2.1
          </span>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--background) pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* Headline: serif italic × sans bold — music meets machine */}
          <h1 className="mix text-hero mb-10">
            <span className="s">Your</span>{" "}
            <span className="p">label.</span>
            <br />
            <span className="s">Run by</span>{" "}
            <span className="p">agents.</span>
          </h1>

          {/* Subheader — first-person, intimate, serif italic */}
          <p
            className="text-editorial text-xl sm:text-2xl md:text-3xl mb-14 max-w-2xl leading-relaxed"
            style={{ color: "rgba(240, 235, 227, 0.6)" }}
          >
            {c.hero.subheader}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={c.hero.ctaHref}
              className="inline-flex items-center justify-center bg-(--brand) text-[#0c0f14] px-8 py-3.5 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-(--brand-hover) hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--brand) focus:ring-offset-2 focus:ring-offset-(--background)"
            >
              {c.hero.ctaPrimary}
            </Link>
            <Link
              href={c.hero.ctaSecondaryHref}
              className="inline-flex items-center justify-center border border-(--border) text-(--foreground) px-8 py-3.5 text-sm font-bold uppercase tracking-wider rounded-sm hover:border-(--muted-foreground) transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--brand) focus:ring-offset-2 focus:ring-offset-(--background)"
            >
              {c.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. MODULES ───────────────────────────────────────── */}
      <section className="relative fade-in-up bg-(--muted) py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section label — editorial serif */}
          <h2 className="text-2xl sm:text-3xl text-(--muted-foreground) mb-12">
            <span className="text-editorial">The</span>{" "}
            <span className="font-bold text-(--brand)">system</span>
          </h2>

          <div className="grid gap-px md:grid-cols-3 border border-(--border) rounded-lg overflow-hidden">
            {c.modules.map((mod) => (
              <div
                key={mod.tag}
                className="relative bg-(--background) p-8 md:p-10 border-t-2 border-t-(--brand)/20 hover:border-t-(--brand) hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Module number in amber */}
                <span className="block text-4xl sm:text-5xl font-mono font-bold text-(--brand) mb-6 leading-none">
                  {mod.tag}
                </span>

                <h3 className="text-xl font-bold text-(--foreground) mb-3">
                  {mod.title}
                </h3>
                <p className="text-sm text-(--muted-foreground) leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SPLIT PROOF ───────────────────────────────────── */}
      <section className="relative fade-in-up bg-(--background) border-y border-(--border) py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left: stat + attribution */}
            <div>
              <span
                className="block text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-(--brand) glow-brand"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(212, 168, 67, 0.25))",
                }}
              >
                {c.proof.stat}
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-(--foreground) mt-4 mb-6">
                {c.proof.label}
              </p>
              <p className="text-sm font-mono text-(--muted-foreground)">
                — {c.proof.attribution}
              </p>
              <p className="text-xs font-mono text-(--brand) mt-3 tracking-wider uppercase">
                {c.proof.aside}
              </p>
            </div>

            {/* Right: IngestFeed */}
            <IngestFeed lines={c.ingestFeed.lines} />
          </div>
        </div>
      </section>

      {/* ── 4. MARQUEE ───────────────────────────────────────── */}
      <Marquee />

      {/* ── 5. CTA + SUBSCRIBE + BLOG ────────────────────────── */}
      <section className="fade-in-up bg-(--background) py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          {/* Headline — serif/sans tension */}
          <h2 className="mix text-3xl sm:text-5xl mb-8 tracking-tight">
            <span className="s">Your</span>{" "}
            <span className="p">label.</span>{" "}
            <span className="s">Run by</span>{" "}
            <span className="p">agents.</span>
          </h2>

          {/* Install command */}
          <div className="code-block inline-block mb-10">
            <span className="text-(--muted-foreground)">$ </span>
            {c.cta.installCmd}
          </div>

          {/* CTA */}
          <div className="mb-16">
            <Link
              href={c.cta.ctaHref}
              className="inline-flex items-center justify-center bg-(--brand) text-[#0c0f14] px-10 py-4 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-(--brand-hover) transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--brand) focus:ring-offset-2 focus:ring-offset-(--background)"
            >
              {c.cta.ctaLabel}
            </Link>
          </div>

          {/* Subscribe */}
          <div className="mb-16">
            <h3 className="text-editorial text-2xl text-(--foreground) mb-2">
              {c.subscribe.title}
            </h3>
            <p className="text-(--muted-foreground) text-body mb-6">
              {c.subscribe.description}
            </p>
            <div className="max-w-md mx-auto">
              <Suspense fallback={<div className="h-12" />}>
                <SubscribeForm />
              </Suspense>
            </div>
          </div>

          {/* Blog (compact) */}
          {latestPosts.length > 0 && (
            <div className="text-left">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
                <h3 className="text-lg font-bold text-(--foreground)">
                  {c.blog.title}
                </h3>
                <Link
                  href={c.blog.viewAllHref}
                  className="text-sm font-mono font-bold text-(--brand) hover:underline"
                >
                  {c.blog.viewAllLabel} →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {latestPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
