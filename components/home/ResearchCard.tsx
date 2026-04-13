"use client";

import { TrendingUp, MapPin, Music, ListMusic } from "lucide-react";

const METRICS = [
  { label: "Monthly Listeners", value: "45,200", change: "+12%", up: true },
  { label: "Followers", value: "28.1K", change: "+8%", up: true },
  { label: "Avg. Saves / Release", value: "3,200", change: "+22%", up: true },
];

const CITIES = ["Los Angeles", "New York", "London", "Toronto", "Berlin"];

export function ResearchCard() {
  return (
    <div className="rounded-xl border border-(--border) bg-(--background) shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-(--border) flex items-center justify-between">
        <div>
          <p className="font-ui font-bold text-[15px] text-(--foreground)">Gatsby Grace</p>
          <p className="font-ui text-[12px] text-(--foreground)/40 mt-0.5">indie-pop / bedroom pop</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] font-ui font-semibold">
          <TrendingUp size={12} />
          Growing
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 divide-x divide-(--border) border-b border-(--border)">
        {METRICS.map((m) => (
          <div key={m.label} className="px-4 py-3.5">
            <p className="text-[10px] font-ui text-(--foreground)/30 uppercase tracking-wider mb-1">{m.label}</p>
            <p className="font-ui font-bold text-[18px] text-(--foreground) leading-none">{m.value}</p>
            <p className={`text-[11px] font-ui mt-1 ${m.up ? "text-emerald-500" : "text-red-400"}`}>{m.change} MoM</p>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 divide-x divide-(--border)">
        <div className="px-4 py-3.5">
          <p className="text-[10px] font-ui text-(--foreground)/30 uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin size={10} /> Top Cities</p>
          <div className="flex flex-wrap gap-1.5">
            {CITIES.map((c) => (
              <span key={c} className="text-[11px] font-ui text-(--foreground)/50 bg-(--muted) px-2 py-0.5 rounded-md">{c}</span>
            ))}
          </div>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[10px] font-ui text-(--foreground)/30 uppercase tracking-wider mb-2 flex items-center gap-1"><ListMusic size={10} /> Playlists</p>
          <p className="font-ui font-bold text-[18px] text-(--foreground) leading-none">14</p>
          <p className="text-[11px] font-ui text-(--foreground)/35 mt-1">editorial placements (90 days)</p>
        </div>
      </div>
    </div>
  );
}
