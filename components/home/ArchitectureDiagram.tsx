"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Video, Search } from "lucide-react";

function useStaggerIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Card({ children, delay, visible, className = "" }: { children: React.ReactNode; delay: number; visible: boolean; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-ui font-bold text-white/30 uppercase tracking-[0.12em] mb-3">{children}</p>
  );
}

export function ArchitectureDiagram() {
  const { ref, visible } = useStaggerIn();

  return (
    <div ref={ref} className="max-w-[1000px] mx-auto">
      <div className="grid grid-cols-4 gap-3 auto-rows-auto">

        {/* ── Left: MCP tool discovery ── */}
        <Card delay={0} visible={visible} className="row-span-2">
          <Label>Recoup MCP Tools</Label>
          <div className="text-[10px] font-pixel text-white/30 mb-4 flex items-center gap-1.5">
            <Search size={10} /> research artist analytics <span className="text-white/20 ml-auto">3 found</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "research_artist", desc: "Metrics, audience, playlists" },
              { name: "generate_content", desc: "Video, image, caption batches" },
              { name: "analyze_catalog", desc: "Catalog valuation + insights" },
            ].map(t => (
              <div key={t.name} className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-pixel text-[11px] text-white/60 block">{t.name}</span>
                  <span className="text-[10px] text-white/25 font-ui block mt-0.5">{t.desc}</span>
                </div>
                <span className="text-[8px] font-ui font-bold text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-2 py-0.5 rounded shrink-0 mt-0.5">match</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/8">
            <p className="text-[9px] text-white/20 font-ui uppercase tracking-wider mb-2">Plan</p>
            <ul className="text-[11px] text-white/35 space-y-1.5 font-ui">
              <li>1. Research artist metrics</li>
              <li>2. Analyze streaming trends</li>
              <li>3. Generate content batch</li>
              <li>4. Build release strategy</li>
            </ul>
          </div>
        </Card>

        {/* ── Center: Claude Code ── */}
        <Card delay={150} visible={visible} className="col-span-2 row-span-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-amber-600/40 flex items-center justify-center">
              <Check size={10} className="text-white/70" />
            </div>
            <span className="text-[13px] font-ui font-semibold text-white/70">Claude Code</span>
          </div>

          <div className="rounded-lg bg-white/[0.03] border border-white/8 overflow-hidden">
            <div className="px-4 py-3.5 border-b border-white/8">
              <div className="bg-amber-700/20 border border-amber-600/15 rounded-xl px-4 py-3 text-[13px] text-white/75 leading-relaxed">
                Research Billie Eilish&apos;s streaming data and create a 12-piece content batch for her next single.
              </div>
            </div>

            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-[11px] text-white/35 font-ui uppercase tracking-wider mb-1.5">Recoup Research &gt;</p>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  <strong className="text-white/80">Billie Eilish</strong> — 98.2M monthly listeners, +3% MoM. Top markets: US, UK, AU. 847 editorial playlists.
                </p>
              </div>

              <div>
                <p className="text-[11px] text-white/35 font-ui uppercase tracking-wider mb-1.5">Recoup Content &gt;</p>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  Generated 12 assets — 8 short-form videos, 3 cover variants, 1 press kit. Optimized for Reels + TikTok.
                </p>
              </div>

              <div>
                <p className="text-[11px] text-white/35 font-ui uppercase tracking-wider mb-1.5">Recoup Strategy &gt;</p>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  4-week rollout plan ready. Content scheduled, playlist targets set, press list compiled.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-white/25">+</span>
              <span className="text-[12px] text-white/25 font-ui">Reply...</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-white/20 font-ui">Sonnet 4.6 &gt;</span>
              <div className="w-7 h-7 rounded-full bg-amber-600/50 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Top right: Connected ── */}
        <Card delay={300} visible={visible}>
          <Label>Connected</Label>
          <div className="space-y-3">
            {[
              { name: "Spotify", ver: "API v1" },
              { name: "Instagram", ver: "Graph API" },
              { name: "TikTok", ver: "OAuth 2.0" },
            ].map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-white/60 font-ui block">{s.name}</span>
                  <span className="text-[9px] text-white/20 font-ui">{s.ver}</span>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] text-emerald-400/80 font-ui">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" /> Live
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Bottom right: API response ── */}
        <Card delay={400} visible={visible}>
          <Label>API Response</Label>
          <div className="font-pixel text-[10px] leading-[2.2] text-white/35">
            <div>{`{`}</div>
            <div className="pl-3">listeners: <span className="text-emerald-400/70">98.2M</span></div>
            <div className="pl-3">growth: <span className="text-emerald-400/70">&quot;+3%&quot;</span></div>
            <div className="pl-3">playlists: <span className="text-emerald-400/70">847</span></div>
            <div>{`}`}</div>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-[10px]">
            <Check size={10} className="text-emerald-400/70" />
            <span className="text-white/30">200 OK · 340ms</span>
          </div>
        </Card>

        {/* ── Bottom: sandbox code ── */}
        <Card delay={350} visible={visible} className="col-span-2">
          <Label>Recoup Sandbox</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[10px] text-white/35">Generate Videos</span>
                <span className="text-[9px] text-white/20 font-ui">8 assets</span>
              </div>
              <div className="font-pixel text-[10px] text-white/30 leading-[2.2] bg-white/[0.03] rounded-lg px-3 py-2.5 border border-white/6">
                <div>for track in album.tracks:</div>
                <div className="pl-3">video = recoup.content(</div>
                <div className="pl-6">artist=<span className="text-amber-300/60">&quot;billie&quot;</span>,</div>
                <div className="pl-6">type=<span className="text-amber-300/60">&quot;reel&quot;</span></div>
                <div className="pl-3">)</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[10px] text-white/35">Press Kit</span>
                <span className="text-[9px] text-white/20 font-ui">1 doc</span>
              </div>
              <div className="font-pixel text-[10px] text-white/30 leading-[2.2] bg-white/[0.03] rounded-lg px-3 py-2.5 border border-white/6">
                <div>kit = recoup.content(</div>
                <div className="pl-3">artist=<span className="text-amber-300/60">&quot;billie&quot;</span>,</div>
                <div className="pl-3">type=<span className="text-amber-300/60">&quot;press_kit&quot;</span>,</div>
                <div className="pl-3">bio=<span className="text-emerald-400/60">True</span></div>
                <div>)</div>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Bottom: output grid ── */}
        <Card delay={450} visible={visible} className="col-span-2">
          <Label>Output</Label>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-white/8 flex items-center justify-center">
                <Video size={10} className="text-white/20" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5">
              <Check size={10} className="text-emerald-400/70" />
              <span className="text-white/35">12/12 assets ready</span>
            </span>
            <span className="text-white/20 font-ui">2m 14s</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
