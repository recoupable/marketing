"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { HeroDemo } from "@/components/home/HeroDemo";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { CUSTOMER_LOGOS } from "@/lib/customerLogos";
import {
  Check,
  ArrowUpRight,
  Package,
  Code2,
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

  const stats = useReveal();
  const problem = useReveal();
  const arch = useReveal();
  const how = useReveal();
  const layer = useReveal();
  const proof = useReveal();
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
              <h1 className={`font-pixel text-[clamp(3.5rem,10vw,7rem)] text-(--foreground) leading-[0.95] tracking-[-0.01em] mb-5 transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "350ms" }}>
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

              <p className={`text-(--foreground) text-[clamp(1.25rem,2vw,1.5rem)] mb-9 leading-[1.35] max-w-[640px] mx-auto font-ui font-semibold transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "550ms" }}>
                AI research and tools for the music industry.
              </p>

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
          <span className="shrink-0 font-ui text-[10px] text-(--foreground)/35 uppercase tracking-[0.15em]">Used by teams at</span>
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
          3. STAT BAR — at-a-glance proof
          ══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-b border-(--border)">
        <div ref={stats.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${stats.cls}`}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { v: "9", k: "labels using Recoup" },
              { v: "50+", k: "research sources" },
              { v: "40+", k: "agent tools" },
              { v: "22 / 2h", k: "videos at Fat Beats" },
            ].map((stat) => (
              <div key={stat.k} className="text-center">
                <p className="font-pixel text-[24px] text-(--foreground) leading-none mb-1">{stat.v}</p>
                <p className="text-[10px] font-pixel text-(--foreground)/40 uppercase tracking-[0.15em]">{stat.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          4. PROBLEM — state the gap first
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
              { k: "No safe access", v: "Can\u2019t touch Google Drive, royalty data, or distributors." },
              { k: "No music workflows", v: "Diligence, content, talent scouting \u2014 none of it built in." },
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
          5. ARCHITECTURE — here's how we fit in
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 dark-section text-white relative overflow-hidden">
        <div ref={arch.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10 ${arch.cls}`}>
          <div className="text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
              {["Claude", "Codex", "Cursor", "Slack"].map(m => (
                <span key={m} className="text-[10px] font-pixel text-white/30 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">{m}</span>
              ))}
            </div>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white mb-5">
              Bring your own agent.<br />Recoup plugs in.
            </h2>
            <p className="text-[15px] text-white/35 max-w-lg mx-auto leading-relaxed">
              One install. Available in every agent your team uses.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>


      {/* ══════════════════════════════════════
          6. PULL QUOTE — real customer voice
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
          7. HOW IT WORKS — 3 steps
          ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 border-t border-(--border)">
        <div ref={how.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${how.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-10 text-center">How it works</p>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { n: "01", k: "Install", v: "Add Recoup to Claude, Codex, or Cursor in one command." },
              { n: "02", k: "Wire it up", v: "Connect your roster, catalog, Google Drive, and the tools your team already pays for." },
              { n: "03", k: "Let it run", v: "Your agent researches artists, audits catalogs, builds content, and reports back." },
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
          8. BENTO — six skills we ship
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/40">
        <div ref={layer.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${layer.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">In the box</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight mb-14 leading-[1.05]">
            Six skills we ship<br />to your agent.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 auto-rows-fr">
            {/* CONTENT — feature card (wide, dark) */}
            <div
              className="bg-[#0f0f10] dark:bg-[#1a1a1c] text-white rounded-2xl p-6 overflow-hidden relative sm:col-span-2 lg:col-span-3 row-span-2 flex flex-col"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.45)" }}
            >
              <div className="flex-1 grid grid-cols-3 gap-2.5 mb-6">
                {[
                  { bg: "from-violet-500/35 to-violet-700/20", icon: "▶" },
                  { bg: "from-blue-500/35 to-blue-700/20", icon: "▶" },
                  { bg: "from-amber-500/35 to-amber-700/20", icon: "■" },
                  { bg: "from-rose-500/35 to-rose-700/20", icon: "▶" },
                  { bg: "from-emerald-500/35 to-emerald-700/20", icon: "T" },
                  { bg: "from-pink-500/35 to-pink-700/20", icon: "▶" },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${tile.bg} rounded-xl aspect-square flex items-center justify-center text-white/55 text-[20px]`}
                  >
                    {tile.icon}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-pixel text-[10px] text-white/40 uppercase tracking-[0.18em] mb-2">Content</p>
                <p className="font-ui font-bold text-[18px] mb-1.5">Videos, images, captions, press.</p>
                <p className="text-[13px] text-white/45 leading-relaxed">One prompt, dozens of finished assets.</p>
              </div>
            </div>

            {/* ARTIST CONTEXT */}
            <div
              className="bg-(--background) rounded-2xl p-5 overflow-hidden relative sm:col-span-1 lg:col-span-3 flex flex-col"
              style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
            >
              <div className="h-36 sm:h-36 mb-5 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-(--muted)/40 p-4 flex flex-col justify-end relative overflow-hidden">
                <div className="bg-(--background) rounded-lg p-3" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-400" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-ui font-semibold text-(--foreground) leading-tight">Static Bloom</span>
                      <span className="text-[9px] font-pixel uppercase tracking-wider text-(--foreground)/35">12.4k monthly</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["indie-pop", "bedroom-pop", "intimate"].map((tag) => (
                      <span key={tag} className="text-[9px] font-ui text-(--foreground)/50 bg-(--muted) px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">Artist context</p>
                <p className="font-ui font-bold text-[15px] text-(--foreground) mb-1">A living folder per artist.</p>
                <p className="text-[12px] text-(--foreground)/50 leading-relaxed">Bio, sound, comparables, and the rules each artist plays by &mdash; updated as your roster grows.</p>
              </div>
            </div>

            {/* CATALOG DATA */}
            <div
              className="bg-(--background) rounded-2xl p-5 overflow-hidden relative sm:col-span-1 lg:col-span-3 flex flex-col"
              style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
            >
              <div className="h-36 sm:h-36 mb-5 rounded-xl bg-gradient-to-br from-emerald-500/8 via-blue-500/8 to-(--muted)/40 p-3 flex flex-col justify-center">
                <div className="bg-(--background) rounded-lg overflow-hidden" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
                  <div className="grid grid-cols-3 text-[8px] font-pixel uppercase tracking-wider text-(--foreground)/35 px-3 py-1 border-b border-(--border)">
                    <span>Track</span><span>Splits</span><span className="text-right">Royalty</span>
                  </div>
                  {[
                    { t: "Hiccups", s: "50/30/20", r: "$1.2K" },
                    { t: "Sundown", s: "70/30", r: "$840" },
                    { t: "All In", s: "100", r: "$520" },
                  ].map((row) => (
                    <div key={row.t} className="grid grid-cols-3 text-[10px] font-ui px-3 py-1 border-b border-(--border) last:border-b-0">
                      <span className="text-(--foreground)/70">{row.t}</span>
                      <span className="text-(--foreground)/50">{row.s}</span>
                      <span className="text-(--foreground) text-right font-medium">{row.r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">Catalog data</p>
                <p className="font-ui font-bold text-[15px] text-(--foreground) mb-1">Splits, royalties, deal terms.</p>
                <p className="text-[12px] text-(--foreground)/50 leading-relaxed">Every track, every right, in one place your agent can read.</p>
              </div>
            </div>

            {/* RESEARCH */}
            <div
              className="bg-(--background) rounded-2xl p-5 overflow-hidden relative sm:col-span-1 lg:col-span-2 flex flex-col"
              style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
            >
              <div className="h-28 mb-5 rounded-xl bg-gradient-to-br from-(--muted)/60 to-(--muted)/20 flex items-center justify-center p-3 overflow-hidden">
                <div className="grid grid-cols-10 gap-1.5">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-(--foreground)"
                      style={{ opacity: 0.15 + ((i * 7) % 80) / 100 }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">Research</p>
                <p className="font-ui font-bold text-[15px] text-(--foreground) mb-1">50+ sources, one call.</p>
                <p className="text-[12px] text-(--foreground)/50 leading-relaxed">From DSP data through to fan psychology.</p>
              </div>
            </div>

            {/* DILIGENCE */}
            <div
              className="bg-(--background) rounded-2xl p-5 overflow-hidden relative sm:col-span-1 lg:col-span-2 flex flex-col"
              style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
            >
              <div className="h-28 mb-5 rounded-xl bg-gradient-to-br from-emerald-500/12 via-(--muted)/40 to-(--muted)/20 p-3 flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-3 gap-1 w-full relative">
                  {[
                    { l: "Down", v: "$1.8M", c: "text-(--foreground)/45" },
                    { l: "Base", v: "$2.4M", c: "text-(--foreground)" },
                    { l: "Up", v: "$3.1M", c: "text-emerald-600 dark:text-emerald-400" },
                  ].map((m) => (
                    <div key={m.l} className="text-center">
                      <p className={`font-pixel text-[18px] sm:text-[19px] leading-none mb-1 ${m.c}`}>{m.v}</p>
                      <p className="text-[8px] font-pixel uppercase tracking-wider text-(--foreground)/35">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">Diligence</p>
                <p className="font-ui font-bold text-[15px] text-(--foreground) mb-1">Catalog diligence in minutes.</p>
                <p className="text-[12px] text-(--foreground)/50 leading-relaxed">Weeks of analyst work &rarr; minutes.</p>
              </div>
            </div>

            {/* GUARDRAILS */}
            <div
              className="bg-(--background) rounded-2xl p-5 overflow-hidden relative sm:col-span-2 lg:col-span-2 flex flex-col"
              style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}
            >
              <div className="h-28 mb-5 rounded-xl bg-gradient-to-br from-(--muted)/50 to-amber-500/8 p-3 flex flex-col justify-center gap-1.5">
                {[
                  { k: "Read roster", ok: true },
                  { k: "Write to Drive", ok: true },
                  { k: "Delete catalog", ok: false },
                  { k: "Send invoices", ok: false },
                ].map((row) => (
                  <div key={row.k} className="flex items-center gap-2 text-[11px] font-ui bg-(--background)/70 px-2.5 py-1 rounded-md" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
                    {row.ok ? (
                      <Check size={11} className="text-emerald-500 shrink-0" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full border border-amber-500 shrink-0 flex items-center justify-center">
                        <span className="w-0.5 h-0.5 rounded-full bg-amber-500" />
                      </span>
                    )}
                    <span className="text-(--foreground)/65 truncate">{row.k}</span>
                    <span className={`ml-auto text-[9px] font-pixel uppercase tracking-wider ${row.ok ? "text-emerald-600" : "text-amber-600"}`}>
                      {row.ok ? "auto" : "ask"}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">Guardrails</p>
                <p className="font-ui font-bold text-[15px] text-(--foreground) mb-1">Respects each user&apos;s role.</p>
                <p className="text-[12px] text-(--foreground)/50 leading-relaxed">Destructive actions need a human click.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          9. PROOF — we run our own labels
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div ref={proof.ref} className={`max-w-[820px] mx-auto px-6 sm:px-10 ${proof.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The proof</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-6">
            We run our own labels.
          </h2>
          <p className="text-[16px] text-(--foreground)/55 leading-relaxed max-w-[640px]">
            Recoup Records and our artist Gatsby Grace use these same skills every day &mdash; to write release plans, audit catalogs, pitch playlists, and run the business. Every skill on this site has shipped against a real roster before it shipped here.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          10. PRICING — three ways in
          ══════════════════════════════════════ */}
      <section id="pricing" className="py-24 sm:py-32 bg-(--muted)/60 scroll-mt-20">
        <div ref={price.ref} className={`max-w-[1200px] mx-auto px-6 sm:px-10 ${price.cls}`}>
          <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3">
            Three ways in.
          </h2>
          <p className="text-[15px] text-(--foreground)/40 mb-14">
            Install free skills &middot; Pay per API call &middot; Hire us to build it with you.
          </p>

          <div ref={priceC.ref} className="grid md:grid-cols-3 gap-5 items-start">
            {/* SKILLS — free, open source, install yourself */}
            <Link href="/platform" className={`group block rounded-2xl bg-(--background) p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_0px_1px_var(--border),0px_8px_24px_rgba(0,0,0,0.08)] ${priceC.item(0).className}`} style={{ ...priceC.item(0).style, boxShadow: "0px 0px 0px 1px var(--border)" }}>
              <div className="w-10 h-10 rounded-xl bg-(--muted) flex items-center justify-center mb-5" style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}>
                <Package size={18} className="text-(--foreground)/35" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">Skills</h3>
              <p className="text-[10px] text-(--foreground)/30 mb-5 uppercase tracking-wide font-pixel">Open source</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7">Free</p>
              <ul className="space-y-2.5 text-[13px] text-(--foreground)/50 mb-8">
                {["All skills, plugins, and agents", "Install in any agent", "MIT licensed", "Community support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 block">Install free</span>
            </Link>

            {/* API — pay as you go, the conversion point */}
            <Link href={siteConfig.docsUrl} target="_blank" rel="noopener noreferrer" className={`group block bg-[#080808] text-white rounded-2xl p-7 md:-mt-3 md:mb-[-12px] relative transition-all duration-300 hover:-translate-y-2 ${priceC.item(1).className}`} style={{ ...priceC.item(1).style, boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-[9px] uppercase tracking-wider bg-white text-black px-4 py-1.5 rounded-full shadow-lg font-pixel">For builders</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5 mt-1">
                <Code2 size={18} className="text-white/50" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">API</h3>
              <p className="text-[10px] text-white/25 mb-5 uppercase tracking-wide font-pixel">Pay as you go</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7 text-white">$20<span className="text-base text-white/20 font-ui not-italic"> credit pack</span></p>
              <ul className="space-y-2.5 text-[13px] text-white/50 mb-8">
                {["Top up credits anytime", "Real-time music data", "Per-call transparency", "No subscription required", "Used by every skill"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-white/35" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold bg-white text-black text-center py-3 rounded-xl text-sm group-hover:bg-white/90 transition-colors block">Get an API key</span>
            </Link>

            {/* SERVICES — custom builds */}
            <Link href={`mailto:${siteConfig.contactEmail}`} className={`group block rounded-2xl bg-(--muted)/40 p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_0px_1px_var(--border),0px_8px_24px_rgba(0,0,0,0.08)] ${priceC.item(2).className}`} style={{ ...priceC.item(2).style, boxShadow: "0px 0px 0px 1px var(--border), 0px 4px 16px rgba(0,0,0,0.04)" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-(--foreground)" />
              <div className="w-10 h-10 rounded-xl bg-(--foreground)/8 flex items-center justify-center mb-5" style={{ boxShadow: "0px 0px 0px 1px var(--border)" }}>
                <Building2 size={18} className="text-(--foreground)/45" />
              </div>
              <h3 className="font-ui font-bold text-lg mb-0.5">Services</h3>
              <p className="text-[10px] text-(--foreground)/30 mb-5 uppercase tracking-wide font-pixel">White glove</p>
              <p className="font-pixel text-[3rem] tracking-tight leading-none mb-7">Custom</p>
              <ul className="space-y-2.5 text-[13px] text-(--foreground)/50 mb-8">
                {["Custom skills for your roster", "Embedded with your team", "Integrates with your stack", "3\u20136 month engagements", "Direct line to the founder"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 flex items-center justify-center gap-1.5">Talk to us <ArrowRight size={13} /></span>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          11. CTA — one command, music AI installed
          ══════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 overflow-hidden dark-section-cta">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

        <div ref={cta.ref} className={`max-w-[760px] mx-auto px-6 text-center relative z-10 ${cta.cls}`}>
          <h2 className="font-pixel text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[0.95] text-white mb-8">
            One command.<br />Music AI, installed.
          </h2>

          <div className="flex items-center justify-center gap-2 mb-10">
            <code className="font-mono text-[12px] text-white/70 bg-white/[0.06] px-3 py-1.5 rounded-md border border-white/10">
              <span className="text-white/35">$</span> npx skills add recoupable/skills
            </code>
            <span className="text-[11px] text-white/35 font-ui">~30s</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/platform" className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:-translate-y-0.5">
              Browse skills
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
