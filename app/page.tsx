"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/config";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { ResearchCard } from "@/components/home/ResearchCard";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
   Open tools shelf (mid-page builder proof). Ported from the agent-layer
   branch; reframed here as "what we build in the open," not the hero.
   ────────────────────────────────────────────────────────────────────── */

interface SkillPack {
  id: string;
  title: [string, string];
  desc: string;
  install: string;
  gradient: string;
}

const SKILL_PACKS: readonly SkillPack[] = [
  {
    id: "diligence",
    title: ["Agentic", "Diligence"],
    desc: "Skills, agents, and templates for catalog audits and deal rooms.",
    install: "npx skills add recoupable/diligence",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 60%, #115e59 100%)",
  },
  {
    id: "ar",
    title: ["Agentic", "A&R"],
    desc: "Scouting and signing workflows for artist research.",
    install: "npx skills add recoupable/ar",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #2563eb 60%, #1e3a8a 100%)",
  },
  {
    id: "content",
    title: ["Agentic", "Content"],
    desc: "Videos, images, captions, and press from your catalog.",
    install: "npx skills add recoupable/content",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 60%, #9a3412 100%)",
  },
  {
    id: "operator",
    title: ["Agentic", "Operator"],
    desc: "The day-to-day of running a label, wired for agents.",
    install: "npx skills add recoupable/operator",
    gradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 60%, #881337 100%)",
  },
  {
    id: "fan",
    title: ["Agentic", "Fan"],
    desc: "Fan analytics and audience growth playbooks.",
    install: "npx skills add recoupable/fan",
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
  return (
    <motion.button
      layout
      transition={{ layout: BOOK_TRANSITION }}
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
      whileHover={{ y: -6 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/15" aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        {isActive ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="absolute inset-0"
          >
            <div className="absolute top-4 left-5 sm:top-5 sm:left-6">
              <div className="w-3 h-3 rounded-full border border-white/65" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
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

const LOGOS = ["Atlantic", "Rostrum", "300", "Warner", "Parlophone", "Fat Beats"];

const LANES = [
  {
    k: "Research",
    h: "We publish what we learn.",
    v: "Field notes from working with labels, catalogs, and platforms — shared in public, not behind a sales call.",
    href: siteConfig.researchUrl,
    cta: "Read our research",
    external: true,
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
    href: "/consulting",
    cta: "Talk to us",
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
          <h1 className={`font-pixel text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.02] tracking-tight mb-6 text-(--foreground) transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "350ms" }}>
            Put AI to work inside<br className="hidden sm:block" /> your music business.
          </h1>
          <p className={`text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.3rem)] font-ui leading-[1.55] max-w-[680px] mx-auto mb-10 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "550ms" }}>
            Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "700ms" }}>
            <Link href="/consulting" className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5">
              Talk to us
            </Link>
            <Link href={siteConfig.researchUrl} target="_blank" rel="noopener noreferrer" className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5">
              Read our research <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          2. LOGOS
          ══════════════════════════════════════ */}
      <section className="py-8 border-y border-(--border)">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center flex-wrap gap-x-8 gap-y-3">
          <span className="font-ui text-[10px] text-(--foreground)/25 uppercase tracking-[0.15em]">Trusted by teams at</span>
          {LOGOS.map((n) => (
            <span key={n} className="font-ui font-bold text-[12px] text-(--foreground)/25 uppercase tracking-[0.06em] select-none">{n}</span>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          3. LANES — Research / Build / Partner
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={lanes.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${lanes.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">How we work</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[720px]">
            Research in public. Tools in the open. Implementation with your team.
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
          4. RESEARCH — what we publish
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/40">
        <div ref={research.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${research.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Research</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4 leading-[1.05]">
                We learn in the open, with real operators.
              </h2>
              <p className="text-[15px] text-(--foreground)/50 leading-relaxed mb-6 max-w-md">
                Catalog diligence, label operations, agent rollouts — we publish what actually works (and what doesn&apos;t) as we build with labels and catalogs.
              </p>
              <Link href={siteConfig.researchUrl} target="_blank" rel="noopener noreferrer" className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group">
                Read the latest <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div>
              <ResearchCard />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          5. PROBLEM — state the gap
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={problem.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${problem.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The gap</p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05]">
            Your team has Claude.<br />It still can&apos;t do the work.
          </h2>

          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-6 mt-14">
            {[
              { k: "No music context", v: "It doesn\u2019t know your roster, catalog, or deal terms." },
              { k: "No safe access", v: "It can\u2019t touch Drive, royalty data, or distributors on its own." },
              { k: "No music workflows", v: "Diligence, A&R, content ops — none of it built in." },
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
          6. BUILD — one harness, many workflows
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 dark-section text-white relative overflow-hidden">
        <div ref={arch.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10 ${arch.cls}`}>
          <div className="text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
              {["Claude", "Cursor", "API", "MCP", "Chat"].map((m) => (
                <span key={m} className="text-[10px] font-pixel text-white/30 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">{m}</span>
              ))}
            </div>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white mb-5">
              One harness, many workflows.
            </h2>
            <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
              Chat is a hosted workspace. The API and open skills are how you embed music intelligence in Claude, Cursor, and your own tools — bring your own agent, Recoup plugs in.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>


      {/* ══════════════════════════════════════
          7. OPEN TOOLS SHELF — builder proof (C′)
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-t border-(--border)">
        <div ref={shelf.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${shelf.cls}`}>
          <div className="text-center mb-12 sm:mb-14">
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">In the open</p>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-4">
              The tools we build, free to install.
            </h2>
            <p className="text-[15px] text-(--foreground)/50 max-w-lg mx-auto leading-relaxed">
              Every engagement sharpens the open skills we ship. Pick a pack, install in seconds, see how we work.
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
                <p className="font-ui font-bold text-[15px]">Install Recoup {activePack.title[1]}</p>
                <span className="text-[10px] font-pixel text-(--foreground)/40 uppercase tracking-wider whitespace-nowrap">open source</span>
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
              <AnimatePresence mode="wait">
                <motion.code
                  key={`${activePack.id}-install`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block font-mono text-[12px] bg-(--background) px-3 py-2.5 rounded-md text-(--foreground)/80"
                  style={{ boxShadow: "0 0 0 1px var(--border)" }}
                >
                  <span className="text-(--foreground)/35">$</span> {activePack.install}
                </motion.code>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          8. CONSULTING BAND — D's tension hook
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/60">
        <div ref={consulting.ref} className={`max-w-[820px] mx-auto px-6 sm:px-10 text-center ${consulting.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-5">Consulting</p>
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
          9. PULL QUOTE — anonymized
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-display italic text-(--foreground)/80 text-[clamp(1.5rem,3vw,2rem)] leading-[1.4] mb-6">
            &ldquo;Catalog diligence is one of the biggest pain points I have. Cut it down to minutes and it changes how we buy.&rdquo;
          </p>
          <p className="font-ui text-[12px] text-(--foreground)/40 uppercase tracking-[0.16em]">
            Catalog fund operator
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          10. PROOF — we run our own labels
          ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div ref={proof.ref} className={`max-w-[820px] mx-auto px-6 sm:px-10 ${proof.cls}`}>
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">The proof</p>
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
          11. FINAL CTA — consulting + research
          ══════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 overflow-hidden dark-section-cta">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

        <div ref={cta.ref} className={`max-w-[760px] mx-auto px-6 text-center relative z-10 ${cta.cls}`}>
          <h2 className="font-pixel text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[0.95] text-white mb-10">
            Let&apos;s build it<br />in your stack.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/consulting" className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:-translate-y-0.5">
              Talk to us
            </Link>
            <Link href={siteConfig.researchUrl} target="_blank" rel="noopener noreferrer" className="font-ui font-medium text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5">
              Read our research <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
