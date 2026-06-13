"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { ResearchCard } from "@/components/home/ResearchCard";
import { LogoBar } from "@/components/marketing/LogoBar";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { Testimonials } from "@/components/marketing/Testimonials";
import { MantraClose } from "@/components/marketing/MantraClose";
import { HOMEPAGE_STATS } from "@/lib/copy/stats";
import { homepageFaq } from "@/lib/copy/consultingFaq";
import { track } from "@/lib/track";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
   Open tools shelf (mid-page builder proof). Ported from the agent-layer
   branch; reframed here as "what we build in the open," not the hero.

   Every pack below maps to a REAL skill folder in github.com/recoupable/skills.
   One install command (`npx skills add recoupable/skills`) pulls the whole
   open repo; each card deep-links to its skill on GitHub so the claim is
   verifiable on first contact.
   ────────────────────────────────────────────────────────────────────── */

interface SkillPack {
  id: string;
  title: [string, string];
  /** One verb per pack (W-31) — the stamp identity, Every-style. */
  verb: string;
  desc: string;
  /** Real skill folder name in recoupable/skills */
  skill: string;
  gradient: string;
}

const SKILL_PACKS: readonly SkillPack[] = [
  {
    id: "research",
    title: ["Music", "Research"],
    verb: "Research",
    desc: "Artist analytics, people search, competitive analysis, and web intelligence — the groundwork for catalog and deal research.",
    skill: "music-industry-research",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 60%, #115e59 100%)",
  },
  {
    id: "chartmetric",
    title: ["Chart", "Metrics"],
    verb: "Track",
    desc: "Query and analyze streaming, chart, and audience data to scout, track, and compare artists.",
    skill: "chart-metric",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #2563eb 60%, #1e3a8a 100%)",
  },
  {
    id: "content",
    title: ["Content", "Creation"],
    verb: "Create",
    desc: "Generate social videos, TikToks, Reels, and visual content from your catalog.",
    skill: "content-creation",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 60%, #9a3412 100%)",
  },
  {
    id: "release",
    title: ["Release", "Management"],
    verb: "Release",
    desc: "Plan and execute release campaigns end to end — the day-to-day of running a label, wired for agents.",
    skill: "release-management",
    gradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 60%, #881337 100%)",
  },
  {
    id: "growth",
    title: ["Streaming", "Growth"],
    verb: "Grow",
    desc: "Grow a new artist past the streaming milestones that unlock platform tools and audience.",
    skill: "streaming-growth",
    gradient: "linear-gradient(135deg, #c084fc 0%, #9333ea 60%, #581c87 100%)",
  },
] as const;

const BOOK_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

function Book({
  pack,
  isActive,
  onClick,
}: {
  pack: SkillPack;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      layout={!shouldReduceMotion}
      transition={shouldReduceMotion ? { duration: 0 } : { layout: BOOK_TRANSITION }}
      onClick={() => onClick(pack.id)}
      aria-label={`Show ${pack.title.join(" ")} pack`}
      aria-pressed={isActive}
      className={`relative h-[280px] sm:h-[340px] rounded-r-md shrink-0 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) ${
        isActive ? "w-[200px] sm:w-[260px]" : "w-9 sm:w-11"
      }`}
      style={{
        background: pack.gradient,
        boxShadow: isActive
          ? "inset -14px 0 18px -14px rgba(0,0,0,0.55), 0 30px 60px -15px rgba(0,0,0,0.35)"
          : "inset -5px 0 8px -5px rgba(0,0,0,0.5), 0 15px 30px -10px rgba(0,0,0,0.25)",
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/15" aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        {isActive ? (
          <motion.div
            key="cover"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transition: { delay: 0.25, duration: 0.3 } }
            }
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transition: { duration: 0.1 } }}
            className="absolute inset-0"
          >
            <div className="absolute top-4 left-5 right-5 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between">
              <div className="w-3 h-3 rounded-full border border-white/65" />
              <span className="font-pixel text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/70">{pack.verb}</span>
            </div>
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <p className="font-display italic text-[20px] sm:text-[24px] leading-[1.05] mb-0.5 opacity-90">{pack.title[0]}</p>
              <p className="font-display italic text-[30px] sm:text-[40px] leading-none font-medium">{pack.title[1]}</p>
              <p className="text-[10px] sm:text-[11px] font-ui mt-3 opacity-65">Open source</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="spine"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transition: { delay: 0.25, duration: 0.3 } }
            }
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transition: { duration: 0.1 } }}
            className="absolute inset-0"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 sm:top-4">
              <div className="w-2 h-2 rounded-full border border-white/65" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 text-white text-[11px] sm:text-[12px] font-display italic whitespace-nowrap tracking-wide"
              style={{ writingMode: "vertical-rl", transform: "translate(-50%, -50%) rotate(180deg)" }}
            >
              {pack.title.join(" ")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Scroll-reveal helper ──────────────────────────────────────────────── */

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

/* ── Static content ────────────────────────────────────────────────────── */

const LANES = [
  {
    k: "Research",
    h: "We publish what we learn.",
    v: "Field notes from working with labels, catalogs, and platforms — shared in public, not behind a sales call.",
    href: siteConfig.researchUrl,
    cta: "Read our research",
    external: false,
  },
  {
    k: "Build",
    h: "We ship tools in the open.",
    v: "Open skills, plugins, and an API so your team can put music intelligence into Claude, Cursor, and your own stack.",
    href: "/platform",
    cta: "See the tools",
    external: false,
  },
  {
    k: "Partner",
    h: "We implement it with you.",
    v: "When you want us in the room: strategy, rollout, and custom agents built for your roster and workflows.",
    href: "/partners",
    cta: "See how we partner",
    external: false,
  },
] as const;

export default function HomePage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const [activePackId, setActivePackId] = useState<string>(SKILL_PACKS[0].id);
  const activePack = SKILL_PACKS.find((p) => p.id === activePackId) ?? SKILL_PACKS[0];
  const orderedPacks = [activePack, ...SKILL_PACKS.filter((p) => p.id !== activePack.id)];

  const lanes = useReveal();
  const research = useReveal();
  const problem = useReveal();
  const arch = useReveal();
  const shelf = useReveal();
  const consulting = useReveal();
  const proof = useReveal();
  const cta = useReveal();

  return (
    <div className="bg-(--background) text-(--foreground) overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO — H-text, consulting-first
          ══════════════════════════════════════ */}
      <section className="relative pt-40 sm:pt-52 pb-20 sm:pb-28 flex flex-col justify-center">
        <div className="absolute inset-0 z-0" aria-hidden="true" style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.04,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 42%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 42%, black 20%, transparent 80%)",
        }} />

        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <p className={`font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            Building the agentic music industry
          </p>
          <h1 className={`font-pixel text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.06] tracking-tight mb-6 text-(--foreground) transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "350ms" }}>
            AI agents that know your catalog,<br className="hidden sm:block" /> royalties, and roster.
          </h1>
          <p className={`text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.5] max-w-[560px] mx-auto mb-9 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "550ms" }}>
            A research lab and implementation partner. We build custom agents into your stack — and you own every one.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "700ms" }}>
            <Link href="/consulting" className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5">
              Talk to us
            </Link>
            <Link href={siteConfig.researchUrl} className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5">
              Read our research <ArrowRight size={15} />
            </Link>
          </div>
          <p className={`font-ui text-[13px] sm:text-[14px] text-(--foreground)/60 mt-7 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "850ms" }}>
            Your data stays yours — we never train on it.{" "}
            <Link href="/trust" className="underline decoration-(--foreground)/25 underline-offset-2 hover:text-(--foreground) hover:decoration-(--foreground)/50 transition-colors">
              See our data boundary
            </Link>
            .
          </p>

          {/* Hero showpiece — the committed illustration system (D-01) */}
          <div
            className={`mt-16 sm:mt-20 mx-auto max-w-[900px] overflow-hidden rounded-2xl transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ boxShadow: "0 0 0 1px var(--border), 0 30px 60px -25px rgba(0,0,0,0.35)", transitionDelay: "950ms" }}
          >
            <Image
              src="/art/art-hero-composer.jpg"
              alt="A marble composer bust in studio headphones beside a vintage tape machine and mixing console — music heritage meets AI agents."
              width={1800}
              height={1013}
              priority
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          2. LOGOS
          ══════════════════════════════════════ */}
      <section className="py-10 border-y border-(--border)">
        <div className="max-w-[1200px] mx-auto px-6">
          <LogoBar />
        </div>
      </section>


      {/* ══════════════════════════════════════
          3. PROBLEM — state the gap (problem-led)
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={problem.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${problem.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The gap</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05]">
            Your team has Claude.<br />It still can&apos;t do the work.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-(--foreground)/55 leading-relaxed max-w-[580px] mt-6">
            General AI knows everything about the world and nothing about your business. So the work that actually moves money — diligence, royalties, A&amp;R — still lands on your team.
          </p>

          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-6 mt-14">
            {[
              { k: "It doesn\u2019t know you", v: "Never seen your roster, your catalog, or your deal terms — so every answer is generic." },
              { k: "It can\u2019t reach in", v: "Can\u2019t open a royalty statement, query a distributor, or touch Drive without you driving every step." },
              { k: "It can\u2019t do the job", v: "Catalog diligence, royalty ops, A&R, content batches — none of the real workflows are built in." },
            ].map((item) => (
              <div key={item.k}>
                <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mb-2">{item.k}</p>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <StatsStrip items={HOMEPAGE_STATS} />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          4. LANES — Research / Build / Partner (the answer)
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={lanes.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${lanes.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">How we work</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[720px]">
            We research it, build it, and run it in your stack.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {LANES.map((lane) => (
              <div
                key={lane.k}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">{lane.k}</p>
                <h3 className="font-ui font-bold text-[19px] text-(--foreground) mb-2 leading-snug">{lane.h}</h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed mb-6 flex-1">{lane.v}</p>
                <Link
                  href={lane.href}
                  {...(lane.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-ui font-semibold text-[13px] text-(--foreground) inline-flex items-center gap-1.5 group"
                >
                  {lane.cta}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          4b. MANIFESTO — the honest diagnosis (W-19)
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/60">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <p className="font-pixel text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-tight leading-[1.12] mb-8">
            You could wire this up in-house. Our bet is{" "}
            <span className="italic font-display">you won&apos;t.</span>
          </p>
          <div className="space-y-5 text-[16px] sm:text-[17px] text-(--foreground)/60 leading-relaxed max-w-[640px]">
            <p>
              Not because your team isn&apos;t good enough — because they&apos;re
              shipping releases today. The model team, the data plumbing, the
              eval loop: it&apos;s a project that never reaches the top of the
              list when there&apos;s a record to put out this week.
            </p>
            <p>
              That&apos;s the work we do. We research what&apos;s working, build
              it in the open, and run it on our own label first — so the agents
              that land in your stack are already proven on a real roster.
            </p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          5. RESEARCH — what we publish
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/40">
        <div ref={research.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${research.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Research</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 leading-[1.05]">
                What&apos;s actually working in AI for music.
              </h2>
              <p className="text-[15px] text-(--foreground)/50 leading-relaxed mb-6 max-w-md">
                Catalog diligence, label operations, agent rollouts — we publish what actually works (and what doesn&apos;t) as we build with labels and catalogs.
              </p>
              <Link href={siteConfig.researchUrl} className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group">
                Read the latest <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div>
              <ResearchCard />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          6. BUILD — one harness, many workflows
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 dark-section text-white relative overflow-hidden">
        <div ref={arch.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10 ${arch.cls}`}>
          <div className="text-center mb-12">
            <p className="font-ui text-[11px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">Build</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
              {["Claude", "Cursor", "API", "MCP", "Chat"].map((m) => (
                <span key={m} className="text-[10px] font-pixel text-white/30 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">{m}</span>
              ))}
            </div>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white mb-5">
              One engine behind every workflow.
            </h2>
            <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
              This is the engine behind every implementation. Chat is a hosted workspace; the API and open skills let your team — or ours — embed music intelligence into Claude, Cursor, and your own stack.
            </p>
            <p className="text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed mt-3">
              <span className="text-white/45 font-medium">MCP</span> is the open standard that lets any agent — Claude, Cursor, or one you built — securely call Recoup&apos;s music tools without custom glue code.
            </p>
          </div>

          <ArchitectureDiagram />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-semibold bg-white text-[#0a0a0a] px-7 py-3 rounded-full text-[14px] hover:bg-white/90 transition-colors inline-flex items-center gap-1.5"
            >
              Read the API docs <ArrowUpRight size={14} />
            </a>
            <Link
              href="/partners"
              className="font-ui font-medium text-[14px] text-white/55 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              Talk to partnerships <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          6b. BUILD (cont.) — the open skills the engine runs
          ══════════════════════════════════════ */}
      <section className="pt-16 pb-24 sm:pt-20 sm:pb-32">
        <div ref={shelf.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${shelf.cls}`}>
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.125rem)] tracking-tight leading-[1.1] mb-4">
              The open skills it runs — free to install.
            </h2>
            <p className="text-[15px] text-(--foreground)/50 max-w-lg mx-auto leading-relaxed">
              Open-source skills our own agents run every day. Install them into Claude, Cursor, or your own stack in seconds. Your private work stays yours —{" "}
              <Link href="/trust" className="underline decoration-(--foreground)/20 underline-offset-2 hover:text-(--foreground) hover:decoration-(--foreground)/50 transition-colors">
                review our data boundary
              </Link>
              .
            </p>
          </div>

          {/* Interactive shelf */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 mb-10">
            {orderedPacks.map((pack) => (
              <Book
                key={pack.id}
                pack={pack}
                isActive={pack.id === activePack.id}
                onClick={setActivePackId}
              />
            ))}
          </div>

          {/* Active pack install */}
          <div className="max-w-[560px] mx-auto">
            <div className="bg-(--muted)/60 rounded-xl px-5 py-4 sm:px-6 sm:py-5 text-left" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <p className="font-ui font-bold text-[15px]">{activePack.title.join(" ")}</p>
                <a
                  href={`${siteConfig.skillsRepoUrl}/tree/main/skills/${activePack.skill}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-ui font-semibold text-(--foreground)/55 hover:text-(--foreground) transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                >
                  View on GitHub <ArrowUpRight size={12} />
                </a>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${activePack.id}-desc`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-[12px] text-(--foreground)/55 mb-4"
                >
                  {activePack.desc}
                </motion.p>
              </AnimatePresence>
              <code
                className="block font-mono text-[12px] bg-(--background) px-3 py-2.5 rounded-md text-(--foreground)/80"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <span className="text-(--foreground)/35">$</span> {siteConfig.skillsInstallCommand}
              </code>
            </div>
            <p className="text-center text-[12px] text-(--foreground)/40 mt-4">
              One command installs the whole open repo.{" "}
              <a
                href={siteConfig.skillsRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Skills Install Clicked", { source: "home-shelf" })}
                className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors inline-flex items-center gap-1"
              >
                Browse all skills <ArrowUpRight size={12} />
              </a>
            </p>
            <p className="text-center text-[13px] text-(--foreground)/55 mt-3">
              Prefer it done for you? The same skills run inside{" "}
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors"
              >
                Chat
              </a>
              , or{" "}
              <Link
                href="/consulting"
                className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors"
              >
                our team sets them up in your stack
              </Link>
              .
            </p>
          </div>

          {/* Marketplace teaser — surfaces the deeper API-backed plugins,
              incl. catalog diligence (W-16) */}
          <Link
            href="/platform#plugins"
            className="group mt-12 max-w-[640px] mx-auto flex items-center justify-between gap-4 rounded-2xl bg-(--background) p-6 transition-colors hover:bg-(--muted)/40"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <div>
              <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-2">
                Plugins marketplace
              </p>
              <p className="font-ui font-bold text-[16px] text-(--foreground) leading-snug mb-1">
                Going deeper? The native plugins add API-backed research and catalog-diligence workflows.
              </p>
              <p className="text-[13px] text-(--foreground)/55 leading-relaxed">
                Data-room ingestion, royalty normalization, IC memos, and valuation analysis — for Claude Code, Cowork, and Codex.
              </p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-(--foreground)/40 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════
          8. PROOF — we run our own labels (dogfood)
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div ref={proof.ref} className={`max-w-[820px] mx-auto px-6 sm:px-10 ${proof.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Proof</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-6">
            We run our own labels.
          </h2>
          <p className="text-[16px] text-(--foreground)/55 leading-relaxed max-w-[640px] mb-6">
            Recoup Records and our artist Gatsby Grace use these same tools every day — to write release plans, audit catalogs, pitch playlists, and run the business. Every skill we publish earns its keep on a real roster first.
          </p>
          <Link href="/company/recoup-records" className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group">
            See how we dogfood <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════
          9. CONSULTING BAND — start executing
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/60">
        <div ref={consulting.ref} className={`max-w-[820px] mx-auto px-6 sm:px-10 text-center ${consulting.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-5">Partner</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.08] mb-5">
            Most music teams are still <span className="italic font-display">planning</span> their AI strategy. Start executing it.
          </h2>
          <p className="text-[16px] text-(--foreground)/55 leading-relaxed max-w-[560px] mx-auto mb-9">
            Training and implementation from operators who build the tools — not slide decks. We work with labels, catalogs, and platforms inside their own stack.
          </p>
          <Link href="/consulting" className="font-ui font-semibold bg-(--foreground) text-(--background) px-8 py-3.5 rounded-full text-[15px] hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Talk to us <ArrowRight size={15} />
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════
          10. PULL QUOTE — operator voice (W-18 component, W-02 CTA fix)
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <Testimonials />
          <div className="mt-8">
            <Link href="/diligence" className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group">
              See a sample diligence report <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          10b. OBJECTIONS — answer the top questions (W-33)
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-(--muted)/40">
        <div className="max-w-[720px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight leading-[1.05] mb-10 text-center">
            Questions worth answering first.
          </h2>
          <div className="space-y-2">
            {homepageFaq.map((item) => (
              <details key={item.q} className="group border-b border-(--border) py-4">
                <summary className="cursor-pointer font-ui font-semibold text-[15px] flex items-center justify-between gap-4 list-none">
                  {item.q}
                  <span className="shrink-0 text-(--foreground)/40 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-(--foreground)/55 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          11. FINAL CTA — consulting + research
          ══════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 overflow-hidden dark-section-cta">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

        <div ref={cta.ref} className={`max-w-[760px] mx-auto px-6 text-center relative z-10 ${cta.cls}`}>
          <MantraClose tone="dark" />
          <h2 className="font-pixel text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[0.95] text-white mb-10">
            Let&apos;s build it<br />in your stack.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/consulting" className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:-translate-y-0.5">
              Talk to us
            </Link>
            <Link href={siteConfig.researchUrl} className="font-ui font-medium text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5">
              Read our research <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
