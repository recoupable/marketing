"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { HeroDemo } from "@/components/home/HeroDemo";
import { ResearchCard } from "@/components/home/ResearchCard";
import { ContentGrid } from "@/components/home/ContentGrid";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { CUSTOMER_LOGOS } from "@/lib/customerLogos";
import {
  Check,
  ArrowUpRight,
  User,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: `transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` };
}

function useStagger(n: number, ms = 130) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return {
    ref,
    item: (i: number) => ({
      className: `transition-all duration-[800ms] ease-[cubic-bezier(.16,1,.3,1)] ${go ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
      style: { transitionDelay: go ? `${i * ms}ms` : "0ms" } as React.CSSProperties,
    }),
  };
}

const HERO_WORDS = ["Music", "Catalog", "Artist", "Fan"] as const;

interface PixelCharFragment {
  offsetX: number;
  offsetY: number;
  inverseOffsetX: number;
  inverseOffsetY: number;
  delayMs: number;
  sliceTop: number;
  sliceBottom: number;
}

function buildPixelFragments(word: string): PixelCharFragment[] {
  return word
    .split("")
    .map((_, index) => ({
      offsetX: Math.floor(Math.random() * 7) - 3,
      offsetY: 0,
      inverseOffsetX: Math.floor(Math.random() * 7) - 3,
      inverseOffsetY: 0,
      delayMs: index * 14 + Math.floor(Math.random() * 90),
      sliceTop: Math.floor(Math.random() * 55),
      sliceBottom: Math.floor(Math.random() * 55),
    }));
}

export default function HomePage() {
  const [show, setShow] = useState(false);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroDisplayWord, setHeroDisplayWord] = useState<string>(HERO_WORDS[0]);
  const [heroWordClassName, setHeroWordClassName] = useState("pixel-swap-in");
  const [heroPixelFragments, setHeroPixelFragments] = useState<PixelCharFragment[]>(() =>
    buildPixelFragments(HERO_WORDS[0]),
  );
  const heroWordSwapTimeoutRef = useRef<number | null>(null);
  const heroWordShuffleIntervalRef = useRef<number | null>(null);
  const heroWordIndexRef = useRef(0);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    heroWordIndexRef.current = heroWordIndex;
  }, [heroWordIndex]);
  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentWordIndex = heroWordIndexRef.current;
      setHeroWordClassName("pixel-swap-out");
      setHeroPixelFragments(buildPixelFragments(HERO_WORDS[currentWordIndex]));
      if (heroWordShuffleIntervalRef.current) {
        window.clearInterval(heroWordShuffleIntervalRef.current);
      }
      heroWordShuffleIntervalRef.current = window.setInterval(() => {
        setHeroPixelFragments(buildPixelFragments(HERO_WORDS[currentWordIndex]));
      }, 65);
      heroWordSwapTimeoutRef.current = window.setTimeout(() => {
        if (heroWordShuffleIntervalRef.current) {
          window.clearInterval(heroWordShuffleIntervalRef.current);
          heroWordShuffleIntervalRef.current = null;
        }
        const nextIndex = (currentWordIndex + 1) % HERO_WORDS.length;
        heroWordIndexRef.current = nextIndex;
        setHeroWordIndex(nextIndex);
        setHeroDisplayWord(HERO_WORDS[nextIndex]);
        setHeroPixelFragments(buildPixelFragments(HERO_WORDS[nextIndex]));
        setHeroWordClassName("pixel-swap-in");
      }, 300);
    }, 2500);

    return () => {
      window.clearInterval(interval);
      if (heroWordShuffleIntervalRef.current) {
        window.clearInterval(heroWordShuffleIntervalRef.current);
      }
      if (heroWordSwapTimeoutRef.current) {
        window.clearTimeout(heroWordSwapTimeoutRef.current);
      }
    };
  }, []);

  const problem = useReveal();
  const how = useReveal();
  const layer = useReveal();
  const catalog = useReveal();
  const research = useReveal();
  const content = useReveal();
  const arch = useReveal();
  const price = useReveal();
  const priceC = useStagger(3);
  const cta = useReveal();

  return (
    <div className="bg-(--background) text-(--foreground) overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
          ══════════════════════════════════════ */}
      <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 flex flex-col justify-center">
        <div className="absolute inset-0 z-0" aria-hidden="true" style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.04,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 42%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 42%, black 20%, transparent 80%)",
        }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="pb-8 flex flex-col items-center text-center">

            <div className="hero-text max-w-[820px] mx-auto flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)] origin-top">
              <span className={`inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-pixel text-(--foreground)/50 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms", boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)" }}>
                For labels, managers, artists, and funds
              </span>

              <h1 className={`font-pixel text-[clamp(3rem,9vw,6rem)] text-(--foreground) leading-[0.95] tracking-[-0.01em] mb-5 transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "350ms" }}>
                <span
                  className={`pixel-word-cycle inline-block min-w-[7ch] text-center ${heroWordClassName}`}
                >
                  {heroDisplayWord.split("").map((char, index) => {
                    const fragment = heroPixelFragments[index];
                    const fragmentStyle = {
                      "--pixel-delay": `${fragment?.delayMs ?? index * 25}ms`,
                      "--pixel-x": `${fragment?.offsetX ?? 0}px`,
                      "--pixel-y": `${fragment?.offsetY ?? 0}px`,
                      "--pixel-x-inverse": `${fragment?.inverseOffsetX ?? 0}px`,
                      "--pixel-y-inverse": `${fragment?.inverseOffsetY ?? 0}px`,
                      "--pixel-top": `${fragment?.sliceTop ?? 20}%`,
                      "--pixel-bottom": `${fragment?.sliceBottom ?? 20}%`,
                    } as React.CSSProperties;

                    return (
                      <span key={`${heroDisplayWord}-${index}-${fragment?.delayMs ?? index}`} className="pixel-char" style={fragmentStyle}>
                        <span className="pixel-char-main">{char}</span>
                        <span className="pixel-char-noise" aria-hidden>
                          {char}
                        </span>
                      </span>
                    );
                  })}
                </span>
                <span className="block">Intelligence</span>
              </h1>

              <p className={`text-(--foreground) text-[clamp(1.0625rem,1.6vw,1.25rem)] mb-3 leading-[1.4] max-w-[520px] mx-auto font-ui font-medium transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "550ms" }}>
                The open source AI lab for the music industry.
              </p>

              <p className={`text-(--foreground)/45 text-[14px] mb-9 leading-[1.5] max-w-[520px] mx-auto transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
                Skills, plugins, and custom builds for Claude, Codex, and Cursor.
              </p>

              <div className={`mb-12 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "700ms" }}>
                <Link
                  href={siteConfig.appUrl}
                  className="font-ui font-semibold bg-(--foreground) text-(--background) px-7 py-3.5 rounded-full text-[14px] hover:opacity-90 transition-opacity"
                >
                  Install in Claude
                </Link>
              </div>
            </div>

            <div className={`w-full transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: show ? "750ms" : "0ms" }} id="hero-demo-wrapper">
              <HeroDemo />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          2. LOGOS
          ══════════════════════════════════════ */}
      <section className="py-8 border-y border-(--border)">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-center gap-x-4 sm:gap-x-5">
          <span className="shrink-0 font-ui text-[10px] text-(--foreground)/35 uppercase tracking-[0.15em]">Used by</span>
          {CUSTOMER_LOGOS.map((logo) => (
            <span
              key={logo.slug}
              className="flex h-8 w-12 sm:w-16 items-center justify-center"
            >
              <img
                src={`/api/customer-logos/${logo.slug}`}
                alt={logo.alt}
                className={`${logo.className ?? "max-h-5 sm:max-h-6"} customer-logo-image`}
                loading="lazy"
                decoding="async"
              />
            </span>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          3. ARCHITECTURE — proves agent-layer claim early
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 dark-section text-white relative overflow-hidden">
        <div ref={arch.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10 ${arch.cls}`}>
          <div className="text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
              {["Claude", "Codex", "Cursor", "Slack", "MCP", "API"].map(m => (
                <span key={m} className="text-[10px] font-pixel text-white/30 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">{m}</span>
              ))}
            </div>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white mb-5">
              Works inside the agents<br />your team already uses.
            </h2>
            <p className="text-[15px] text-white/35 max-w-lg mx-auto leading-relaxed">
              Install once. Available in any MCP-compatible agent.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {[
                { v: "40+", k: "agent tools" },
                { v: "50+", k: "research sources" },
                { v: "22 / 2h", k: "videos at Fat Beats" },
                { v: "9", k: "music customers" },
              ].map((stat) => (
                <div key={stat.k} className="text-center">
                  <p className="font-pixel text-[28px] text-white leading-none mb-1">{stat.v}</p>
                  <p className="text-[10px] font-pixel text-white/40 uppercase tracking-[0.15em]">{stat.k}</p>
                </div>
              ))}
            </div>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>


      {/* ══════════════════════════════════════
          3b. PULL QUOTE — real customer voice
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-display italic text-(--foreground)/80 text-[clamp(1.5rem,3vw,2rem)] leading-[1.4] mb-6">
            &ldquo;Catalog diligence is one of the biggest pain points I have. If we can cut that into five minutes, this is really interesting.&rdquo;
          </p>
          <p className="font-ui text-[12px] text-(--foreground)/40 uppercase tracking-[0.16em]">
            Founder, Rostrum Records
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          4. PROBLEM — the gap agent tools leave
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={problem.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${problem.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The gap</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05]">
            Your team has Claude.<br />It still can&apos;t do the work.
          </h2>

          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-6 mt-14">
            {[
              { k: "No music context", v: "Doesn\u2019t know your roster or catalog." },
              { k: "No safe access", v: "Can\u2019t touch Drive, royalties, distributors." },
              { k: "No music workflows", v: "Diligence, content, A&R — none of it built in." },
            ].map((item) => (
              <div key={item.k}>
                <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mb-2">{item.k}</p>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          5. HOW IT WORKS — 3 steps
          ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 border-t border-(--border)">
        <div ref={how.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${how.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-10 text-center">How it works</p>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { n: "01", k: "Install", v: "Add Recoup to Claude, Codex, or Cursor in one command." },
              { n: "02", k: "Connect", v: "Wire up your roster, catalog, and team permissions." },
              { n: "03", k: "Ask", v: "Your agent now does the music work, with the right context." },
            ].map((step) => (
              <div key={step.n}>
                <p className="font-pixel text-[14px] text-(--foreground)/25 tracking-tight mb-3">{step.n}</p>
                <p className="font-ui font-bold text-[16px] text-(--foreground) mb-1.5">{step.k}</p>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">{step.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          6. RECOUP LAYER — what we add on top
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/40">
        <div ref={layer.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${layer.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The layer</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight mb-14 leading-[1.05]">
            Recoup is the music layer<br />for your agents.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { k: "Artist context", v: "A living folder per artist.", stat: "Bio, sound, sacred rules" },
              { k: "Catalog data", v: "Splits, royalties, deal terms.", stat: "Every track, one source" },
              { k: "Research", v: "50+ sources, one call.", stat: "Streams to fan psychology" },
              { k: "Content", v: "Videos, images, captions, press.", stat: "22 videos in 2 hours" },
              { k: "Diligence", v: "Deal rooms to 80% pass.", stat: "Weeks of analyst work \u2192 minutes" },
              { k: "Guardrails", v: "Acts inside each user\u2019s permissions.", stat: "Human-approves destructive actions" },
            ].map((item) => (
              <div
                key={item.k}
                className="bg-(--background) rounded-xl p-5"
                style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
              >
                <p className="font-ui font-bold text-[14px] text-(--foreground) mb-1.5">{item.k}</p>
                <p className="text-[13px] text-(--foreground)/55 leading-relaxed mb-3">{item.v}</p>
                <p className="text-[11px] text-(--foreground)/35 font-ui">{item.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          7. USE CASES — Research / Diligence / Content
          ══════════════════════════════════════ */}
      <section className="pt-24 sm:pt-32 pb-6 sm:pb-8">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em]">Use cases</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div ref={research.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${research.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Research</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
                Know everything about any artist.
              </h2>
              <p className="text-[15px] text-(--foreground)/45 leading-relaxed max-w-md">
                Streams, audience, playlists, socials. 50+ sources, one call.
              </p>
            </div>
            <div>
              <ResearchCard />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          7b. CATALOG DILIGENCE — Benjy's pain point
          ══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-(--muted)/40">
        <div ref={catalog.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${catalog.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Diligence</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
                Deal room to 80% pass.
              </h2>
              <p className="text-[15px] text-(--foreground)/45 leading-relaxed max-w-md">
                Parses files, flags conflicts, models the deal. Minutes, not weeks.
              </p>
            </div>
            <div>
              <div
                className="rounded-xl bg-(--background) p-5"
                style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-(--border)">
                  <p className="font-ui font-bold text-[14px] text-(--foreground)">Q4 publishing catalog</p>
                  <span className="text-[10px] font-pixel uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Ready</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { l: "Downside", v: "$1.8M", c: "text-(--foreground)/50" },
                    { l: "Base", v: "$2.4M", c: "text-(--foreground)" },
                    { l: "Upside", v: "$3.1M", c: "text-emerald-500" },
                  ].map((m) => (
                    <div key={m.l}>
                      <p className="text-[10px] font-ui text-(--foreground)/30 uppercase tracking-wider mb-1">{m.l}</p>
                      <p className={`font-pixel text-[20px] leading-none ${m.c}`}>{m.v}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-[12px]">
                  {[
                    { k: "147 songs parsed", ok: true },
                    { k: "3 publisher share conflicts flagged", ok: false },
                    { k: "12 missing recording ledgers", ok: false },
                    { k: "Top track concentration: 14%", ok: true },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${row.ok ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="text-(--foreground)/65">{row.k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          7c. CONTENT — show don't tell
          ══════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div ref={content.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${content.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ContentGrid />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Content</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
                Content you&apos;d hire a team for.
              </h2>
              <p className="text-[15px] text-(--foreground)/45 leading-relaxed max-w-md">
                Fat Beats: 22 finished videos in 2 hours.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          7d. WHAT IS RECOUP — company identity
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">What is Recoup</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-6">
            The open source AI lab<br />for the music industry.
          </h2>
          <p className="text-[16px] text-(--foreground)/55 leading-relaxed max-w-[640px] mb-5">
            We open source the skills, plugins, and data your agent uses to run a label. For teams that need more, we build custom AI workflows against your roster, catalog, and ops.
          </p>
          <p className="text-[14px] text-(--foreground)/40 leading-relaxed max-w-[640px]">
            We run our own labels and artists so the work ships into production every day, not into slides.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          8. PRICING
          ══════════════════════════════════════ */}
      <section id="pricing" className="py-24 sm:py-32 bg-(--muted)/60 scroll-mt-20">
        <div ref={price.ref} className={`max-w-[1200px] mx-auto px-6 sm:px-10 ${price.cls}`}>
          <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3">
            One artist to a full roster.
          </h2>
          <p className="text-[15px] text-(--foreground)/40 mb-14">
            No card. Bring your own agent.
          </p>

          <div ref={priceC.ref} className="grid md:grid-cols-3 gap-5 items-start">
            {/* Free */}
            <Link href={siteConfig.appUrl} className={`group block rounded-2xl bg-(--background) p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_0px_1px_var(--border),0px_8px_24px_rgba(0,0,0,0.08)] ${priceC.item(0).className}`} style={{ ...priceC.item(0).style, boxShadow: "0px 0px 0px 1px var(--border)" }}>
              <div className="w-10 h-10 rounded-xl bg-(--muted) flex items-center justify-center mb-5" style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}>
                <User size={18} className="text-(--foreground)/35" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">Free</h3>
              <p className="text-[10px] text-(--foreground)/30 mb-5 uppercase tracking-wide font-pixel">For artists</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7">$0</p>
              <ul className="space-y-2.5 text-[13px] text-(--foreground)/50 mb-8">
                {["1 artist workspace", "Limited credits", "Community support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 block">Start free</span>
            </Link>

            {/* Pro */}
            <Link href={`${siteConfig.appUrl}?intent=subscribe&plan=pro`} className={`group block bg-[#080808] text-white rounded-2xl p-7 md:-mt-3 md:mb-[-12px] relative transition-all duration-300 hover:-translate-y-2 ${priceC.item(1).className}`} style={{ ...priceC.item(1).style, boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-[9px] uppercase tracking-wider bg-white text-black px-4 py-1.5 rounded-full shadow-lg font-pixel">Popular</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5 mt-1">
                <Users size={18} className="text-white/50" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">Pro</h3>
              <p className="text-[10px] text-white/25 mb-5 uppercase tracking-wide font-pixel">For managers</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7 text-white">$99<span className="text-base text-white/20 font-ui not-italic">/mo</span></p>
              <ul className="space-y-2.5 text-[13px] text-white/50 mb-8">
                {["Full artist roster", "More credits", "All models", "Unlimited seats", "Priority support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-white/35" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold bg-white text-black text-center py-3 rounded-xl text-sm group-hover:bg-white/90 transition-colors block">Start 30-day free trial</span>
            </Link>

            {/* Partner */}
            <Link href={siteConfig.appUrl} className={`group block rounded-2xl bg-(--muted)/40 p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_0px_1px_var(--border),0px_8px_24px_rgba(0,0,0,0.08)] ${priceC.item(2).className}`} style={{ ...priceC.item(2).style, boxShadow: "0px 0px 0px 1px var(--border), 0px 4px 16px rgba(0,0,0,0.04)" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-(--foreground)" />
              <div className="w-10 h-10 rounded-xl bg-(--foreground)/8 flex items-center justify-center mb-5" style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}>
                <Building2 size={18} className="text-(--foreground)/45" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">Partner</h3>
              <p className="text-[10px] text-(--foreground)/30 mb-5 uppercase tracking-wide font-pixel">For labels</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7">$499<span className="text-base text-(--foreground)/20 font-ui not-italic">/mo</span></p>
              <ul className="space-y-2.5 text-[13px] text-(--foreground)/50 mb-8">
                {["Everything in Pro", "High-volume credits", "Custom skills", "Unlimited seats", "Dedicated support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 block">Start Partner plan</span>
            </Link>
          </div>

          {/* Enterprise banner */}
          <div className={`mt-8 rounded-2xl bg-[#080808] text-white p-8 sm:p-10 relative overflow-hidden transition-all duration-700 ${price.cls}`} style={{ boxShadow: "0 25px 60px -15px rgba(0,0,0,0.4)" }}>
            <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{
              backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 size={18} className="text-white/50" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wide font-pixel">Custom build</p>
                  </div>
                </div>
                <h3 className="font-ui font-bold text-xl mb-3">Bring the lab in-house.</h3>
                <p className="text-[14px] text-white/40 leading-relaxed max-w-lg mb-5">
                  For labels and funds. We embed with your team, build custom skills against your catalog, and ship the AI workflows your business runs on.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Custom skills", "Catalog-specific agents", "Embedded team", "3\u20136 month engagements"].map(tag => (
                    <span key={tag} className="text-[11px] font-ui text-white/35 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                href={`mailto:${siteConfig.contactEmail}`}
                className="shrink-0 font-ui font-semibold bg-white text-black px-8 py-3.5 rounded-xl text-sm hover:bg-white/90 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                Talk to sales <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          8. CTA
          ══════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 overflow-hidden dark-section-cta">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

        <div ref={cta.ref} className={`max-w-[760px] mx-auto px-6 text-center relative z-10 ${cta.cls}`}>
          <h2 className="font-pixel text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[0.95] text-white mb-8">
            Install {siteConfig.name} in your agent.
          </h2>

          <div className="flex items-center justify-center gap-2 mb-10">
            <code className="font-mono text-[12px] text-white/70 bg-white/[0.06] px-3 py-1.5 rounded-md border border-white/10">
              <span className="text-white/35">$</span> npx skills add recoupable/skills
            </code>
            <span className="text-[11px] text-white/35 font-ui">~30s</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={siteConfig.appUrl} className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:-translate-y-0.5">
              Get started free
            </Link>
            <Link href={siteConfig.docsUrl} className="font-ui font-medium text-sm text-white/25 hover:text-white/50 transition-colors flex items-center gap-1.5">
              Read the docs <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
