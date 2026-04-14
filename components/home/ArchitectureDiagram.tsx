"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronDown, Terminal } from "lucide-react";

/* ═══════════════════════════════════════════════
   Shared content — update here, both views sync
   ═══════════════════════════════════════════════ */

const DEMO = {
  artist: "Billie Eilish",
  prompt: "Research Billie Eilish's streaming data and create a 12-piece content batch for her next single.",
  research: {
    listeners: "98.2M",
    growth: "+3%",
    playlists: "847",
    markets: "US, UK, AU, DE, FR",
    platforms: "14",
  },
  content: {
    videos: 8,
    covers: 3,
    pressKits: 1,
    total: 12,
    time: "2m 14s",
  },
};

/* ═══════════════════════════════════════════════
   Scroll reveal
   ═══════════════════════════════════════════════ */

function useRevealIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ═══════════════════════════════════════════════
   Anthropic sparkle icon (simplified)
   ═══════════════════════════════════════════════ */

function AnthropicSparkle({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M16.5 3L12 21L9.5 12.5L3 9.5L12 7L16.5 3Z" fill="currentColor" opacity="0.7" />
      <path d="M16.5 3L21 9.5L12 12.5L16.5 3Z" fill="currentColor" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Terminal View
   ═══════════════════════════════════════════════ */

type Line = { prefix?: string; cmd?: string; arg?: string; output?: string; status?: string; blank?: boolean };

function buildTerminalLines(): Line[] {
  const d = DEMO;
  return [
    { prefix: "$", cmd: "npm install -g", arg: "@recoupable/cli" },
    { status: "added 1 package in 2.3s" },
    { blank: true },
    { prefix: "$", cmd: "recoup research", arg: `"${d.artist}"` },
    { blank: true },
    { output: `  ${d.artist}` },
    { output: `  ${d.research.listeners} monthly listeners  ·  ${d.research.growth} MoM  ·  ${d.research.playlists} playlists` },
    { output: `  Top markets: ${d.research.markets}` },
    { output: `  ${d.research.platforms} platforms connected  ·  data fresh as of today` },
    { blank: true },
    { prefix: "$", cmd: "recoup content create", arg: `--artist "${d.artist}" --batch ${d.content.total}` },
    { blank: true },
    { output: `  Generating ${d.content.total} assets...` },
    { output: `  ${d.content.videos} short-form videos  ·  ${d.content.covers} covers  ·  ${d.content.pressKits} press kit` },
    { status: `${d.content.total}/${d.content.total} assets ready · ${d.content.time}` },
  ];
}

function TerminalView({ visible }: { visible: boolean }) {
  const lines = buildTerminalLines();
  return (
    <>
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="flex-1" />
        <span className="text-[10px] font-pixel text-white/15">terminal</span>
      </div>

      <div className="px-5 py-5 font-pixel text-[12px] leading-[2] overflow-x-auto">
        {lines.map((line, i) => {
          if (line.blank) return <div key={i} className="h-2" />;

          return (
            <div
              key={i}
              className={`transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
              style={{ transitionDelay: visible ? `${300 + i * 60}ms` : "0ms" }}
            >
              {line.prefix && (
                <>
                  <span className="text-white/25">{line.prefix} </span>
                  <span className="text-white/55">{line.cmd} </span>
                  <span className="text-amber-300/70">{line.arg}</span>
                </>
              )}
              {line.output && (
                <span className="text-white/40">{line.output}</span>
              )}
              {line.status && (
                <span className="flex items-center gap-1.5 text-white/30">
                  <Check size={10} className="text-emerald-400/70" />
                  {line.status}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Claude Cowork View
   ═══════════════════════════════════════════════ */

function ClaudeCoworkView() {
  const d = DEMO;
  return (
    <>
      {/* Window chrome — macOS style */}
      <div className="flex items-center px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-4 text-[11px] font-ui">
          <span className="text-white/20">Chat</span>
          <span className="text-white/60 font-semibold border-b border-white/40 pb-0.5">Cowork</span>
          <span className="text-white/20">Code</span>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Title bar */}
      <div className="px-5 py-2.5 border-b border-white/6">
        <div className="flex items-center gap-1.5 text-[12px] font-ui text-white/50">
          Research {d.artist} <ChevronDown size={12} className="text-white/25" />
        </div>
      </div>

      {/* Chat area */}
      <div className="px-5 py-5 space-y-5 min-h-[280px]">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-white/[0.07] border border-white/10 rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]">
            <p className="text-[13px] text-white/70 leading-relaxed">{d.prompt}</p>
          </div>
        </div>

        {/* Assistant response */}
        <div className="space-y-4">
          <div className="flex items-start gap-2.5">
            <AnthropicSparkle size={18} className="text-amber-600/70 shrink-0 mt-0.5" />
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-[10px] font-ui text-white/25 uppercase tracking-wider mb-1.5">Recoup Research</p>
                <p className="text-[13px] text-white/55 leading-relaxed">
                  <strong className="text-white/75">{d.artist}</strong> — {d.research.listeners} monthly listeners, {d.research.growth} MoM. Top markets: {d.research.markets}. {d.research.playlists} editorial playlists.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-ui text-white/25 uppercase tracking-wider mb-1.5">Recoup Content</p>
                <p className="text-[13px] text-white/55 leading-relaxed">
                  Generated {d.content.total} assets — {d.content.videos} short-form videos, {d.content.covers} covers, {d.content.pressKits} press kit. Optimized for Reels + TikTok.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-white/25">
                <Check size={10} className="text-emerald-400/60" />
                All tasks complete · {d.content.time}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="mx-4 mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-white/20">+</span>
          <span className="text-[13px] text-white/20 font-ui">Reply...</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-white/20 font-ui">Opus 4.6</span>
          <span className="text-[10px] font-ui font-semibold text-white bg-amber-700/60 px-3 py-1 rounded-lg">Queue</span>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Main component — cycling tabs
   ═══════════════════════════════════════════════ */

const TABS: { id: "terminal" | "claude"; label: string; icon: React.ReactNode }[] = [
  { id: "terminal", label: "Terminal", icon: <Terminal size={13} /> },
  { id: "claude", label: "Claude", icon: <AnthropicSparkle size={13} /> },
];

const CYCLE_MS = 6000;

export function ArchitectureDiagram() {
  const { ref, visible } = useRevealIn();
  const [activeTab, setActiveTab] = useState<"terminal" | "claude">("terminal");
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTab(prev => prev === "terminal" ? "claude" : "terminal");
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startCycle]);

  function handleTabClick(tab: "terminal" | "claude") {
    setActiveTab(tab);
    startCycle();
  }

  return (
    <div ref={ref} className="max-w-[640px] mx-auto">
      {/* Tab bar */}
      <div className={`flex items-center justify-center gap-1 mb-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-ui font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white/70"
                  : "text-white/25 hover:text-white/40"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Demo card */}
      <div
        className={`rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative">
          {/* Terminal */}
          <div
            className="transition-opacity duration-300"
            style={{
              opacity: activeTab === "terminal" ? 1 : 0,
              pointerEvents: activeTab === "terminal" ? "auto" : "none",
              position: activeTab === "terminal" ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <TerminalView visible={visible && activeTab === "terminal"} />
          </div>

          {/* Claude Cowork */}
          <div
            className="transition-opacity duration-300"
            style={{
              opacity: activeTab === "claude" ? 1 : 0,
              pointerEvents: activeTab === "claude" ? "auto" : "none",
              position: activeTab === "claude" ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <ClaudeCoworkView />
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeTab === tab.id ? "bg-white/40 scale-125" : "bg-white/15 hover:bg-white/25"
            }`}
            aria-label={`Show ${tab.label}`}
          />
        ))}
      </div>
    </div>
  );
}
