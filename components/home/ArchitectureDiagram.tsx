"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

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

const LINES: { prefix?: string; cmd?: string; arg?: string; comment?: string; output?: string; status?: string; blank?: boolean }[] = [
  { prefix: "$", cmd: "npm install -g", arg: "@recoupable/cli" },
  { status: "added 1 package in 2.3s" },
  { blank: true },
  { prefix: "$", cmd: "recoup research", arg: '"Billie Eilish"' },
  { blank: true },
  { output: "  Billie Eilish" },
  { output: "  98.2M monthly listeners  ·  +3% MoM  ·  847 playlists" },
  { output: "  Top markets: US, UK, AU, DE, FR" },
  { output: "  14 platforms connected  ·  data fresh as of today" },
  { blank: true },
  { prefix: "$", cmd: "recoup content create", arg: '--artist "Billie Eilish" --batch 12' },
  { blank: true },
  { output: "  Generating 12 assets..." },
  { output: "  8 short-form videos  ·  3 covers  ·  1 press kit" },
  { status: "12/12 assets ready · 2m 14s" },
];

export function ArchitectureDiagram() {
  const { ref, visible } = useRevealIn();

  return (
    <div ref={ref} className="max-w-[640px] mx-auto">
      <div
        className={`rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="flex-1" />
          <span className="text-[10px] font-pixel text-white/15">terminal</span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 font-pixel text-[12px] leading-[2] overflow-x-auto">
          {LINES.map((line, i) => {
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
      </div>
    </div>
  );
}
