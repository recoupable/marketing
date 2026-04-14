"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { HeroDemo } from "@/components/home/HeroDemo";
import { ResearchCard } from "@/components/home/ResearchCard";
import { ContentGrid } from "@/components/home/ContentGrid";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
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

const LOGOS = ["Atlantic", "Rostrum", "300", "Warner", "Parlophone", "Fat Beats"];

const FLOATING_AGENTS = [
  { label: "Artist Research", x: "8%", y: "18%", delay: 200, size: "text-[12px]", opacity: 0.35 },
  { label: "Content Creator", x: "78%", y: "14%", delay: 400, size: "text-[12px]", opacity: 0.32 },
  { label: "Fan Segments", x: "7%", y: "44%", delay: 600, size: "text-[11px]", opacity: 0.28 },
  { label: "Release Report", x: "83%", y: "40%", delay: 300, size: "text-[12px]", opacity: 0.35 },
  { label: "Catalog Analyzer", x: "11%", y: "66%", delay: 800, size: "text-[11px]", opacity: 0.28 },
  { label: "Social Poster", x: "82%", y: "64%", delay: 500, size: "text-[11px]", opacity: 0.3 },
  { label: "Genre Trends", x: "19%", y: "28%", delay: 700, size: "text-[11px]", opacity: 0.25 },
  { label: "Comment Checker", x: "74%", y: "26%", delay: 900, size: "text-[11px]", opacity: 0.25 },
  { label: "Playlist Pitcher", x: "6%", y: "56%", delay: 1000, size: "text-[11px]", opacity: 0.28 },
  { label: "Fan Newsletter", x: "86%", y: "54%", delay: 450, size: "text-[11px]", opacity: 0.28 },
  { label: "Revenue Tracker", x: "16%", y: "74%", delay: 1100, size: "text-[11px]", opacity: 0.22 },
  { label: "A&R Scanner", x: "76%", y: "74%", delay: 650, size: "text-[11px]", opacity: 0.22 },
];

function FloatingPills({ show }: { show: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 h-screen z-[1] pointer-events-none hidden lg:block" aria-hidden="true">
      {FLOATING_AGENTS.map((agent, i) => (
        <span
          key={agent.label}
          className={`absolute ${agent.size} font-pixel transition-all duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] cursor-default select-none`}
          style={{
            left: agent.x,
            top: agent.y,
            transitionDelay: show ? `${agent.delay}ms` : "0ms",
            opacity: show ? agent.opacity : 0,
            color: `rgba(10,10,10, ${agent.opacity})`,
            transform: show ? "translateY(0)" : "translateY(14px)",
            animation: show ? `float-pill ${4 + (i % 4)}s ease-in-out ${agent.delay}ms infinite alternate` : "none",
          }}
        >
          {agent.label}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

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

        <FloatingPills show={show} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="pb-8 flex flex-col items-center text-center">

            <div className="hero-text max-w-[800px] mx-auto flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)] origin-top">
              <span className={`inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-pixel text-(--foreground)/50 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms", boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)" }}>
                <span className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
                40+ agent tools
              </span>

              <h1 className={`font-pixel text-[clamp(3rem,9vw,6rem)] text-(--foreground) leading-[0.95] tracking-[-0.01em] mb-4 transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "350ms" }}>
                Music industry intelligence.
              </h1>

              <p className={`text-(--foreground)/50 text-[clamp(1.0625rem,1.6vw,1.25rem)] mb-9 leading-[1.6] font-display italic transition-all duration-900 ease-[cubic-bezier(.16,1,.3,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "550ms" }}>
                Your record label, run by AI agents.
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
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center flex-wrap gap-x-8 gap-y-3">
          <span className="font-ui text-[10px] text-(--foreground)/20 uppercase tracking-[0.15em]">Used by</span>
          {LOGOS.map(n => (
            <span key={n} className="font-ui font-bold text-[12px] text-(--foreground)/20 uppercase tracking-[0.06em] select-none">{n}</span>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          3. RESEARCH — show don't tell
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/40">
        <div ref={research.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${research.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Research</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
                Know everything about any artist.
              </h2>
              <p className="text-[15px] text-(--foreground)/45 leading-relaxed mb-6 max-w-md">
                Streaming metrics, audience demographics, playlist placements, social traction, career history — pulled from 50+ sources and delivered in seconds.
              </p>
              <p className="text-[13px] text-(--foreground)/30 italic">
                Works from our chat, your AI assistant, or a single API call.
              </p>
            </div>
            <div>
              <ResearchCard />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          5. CONTENT — show don't tell
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div ref={content.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 ${content.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ContentGrid />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">Content</p>
              <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
                Create content that would take a team weeks.
              </h2>
              <p className="text-[15px] text-(--foreground)/45 leading-relaxed mb-6 max-w-md">
                Videos, images, captions, press copy — generated in batches from your catalog. Fat Beats created 22 finished videos in 2 hours with zero editing.
              </p>
              <p className="text-[13px] text-(--foreground)/30 italic">
                One prompt. Dozens of assets. Ready to post.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          6. ARCHITECTURE — we come to you
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 dark-section text-white relative overflow-hidden">
        <div ref={arch.ref} className={`max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10 ${arch.cls}`}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              {["API", "MCP", "CLI"].map(m => (
                <span key={m} className="text-[10px] font-pixel text-white/30 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">{m}</span>
              ))}
            </div>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white mb-5">
              It works where you work.
            </h2>
            <p className="text-[15px] text-white/35 max-w-lg mx-auto leading-relaxed">
              Works with Claude, ChatGPT, Cursor, Windsurf, and any MCP-compatible agent. Or just use our chat.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>


      {/* ══════════════════════════════════════
          7. PRICING
          ══════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-(--muted)/60">
        <div ref={price.ref} className={`max-w-[1200px] mx-auto px-6 sm:px-10 ${price.cls}`}>
          <h2 className="font-pixel text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3">
            Start free. Scale when ready.
          </h2>
          <p className="text-[15px] text-(--foreground)/40 mb-14">
            No credit card required. Add credits anytime.
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
                {["1 artist workspace", "Limited credits", "Limited models", "Community support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 block">Get started</span>
            </Link>

            {/* Pro */}
            <Link href={siteConfig.appUrl} className={`group block bg-[#080808] text-white rounded-2xl p-7 md:-mt-3 md:mb-[-12px] relative transition-all duration-300 hover:-translate-y-2 ${priceC.item(1).className}`} style={{ ...priceC.item(1).style, boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }}>
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
              <span className="font-ui font-semibold bg-white text-black text-center py-3 rounded-xl text-sm group-hover:bg-white/90 transition-colors block">Start 14-day trial</span>
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
                {["Everything in Pro", "High-volume credits", "Customized agents", "Unlimited seats", "Dedicated support"].map(f => (
                  <li key={f} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-(--foreground)/20" />{f}</li>
                ))}
              </ul>
              <span className="font-ui font-semibold border border-(--border) text-(--foreground) text-center py-3 rounded-xl text-sm group-hover:bg-(--foreground) group-hover:text-(--background) group-hover:border-(--foreground) transition-all duration-300 block">Get started</span>
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
                    <p className="text-[10px] text-white/25 uppercase tracking-wide font-pixel">Enterprise</p>
                  </div>
                </div>
                <h3 className="font-ui font-bold text-xl mb-3">Built around your catalog and workflows.</h3>
                <p className="text-[14px] text-white/40 leading-relaxed max-w-lg mb-5">
                  Custom solutions tailored to your roster. Dedicated infrastructure, co-created campaigns, strategic support, and integrations designed for how your team works.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Custom agents", "Co-created IP", "Dedicated team", "White-glove onboarding"].map(tag => (
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

        <div ref={cta.ref} className={`max-w-[700px] mx-auto px-6 text-center relative z-10 ${cta.cls}`}>
          <h2 className="font-pixel text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[0.95] text-white mb-12">
            The agentic music industry runs on Recoupable.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={siteConfig.appUrl} className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:-translate-y-0.5">
              Get started free
            </Link>
            <Link href={siteConfig.docsUrl} className="font-ui font-medium text-sm text-white/25 hover:text-white/50 transition-colors flex items-center gap-1.5">
              Documentation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
