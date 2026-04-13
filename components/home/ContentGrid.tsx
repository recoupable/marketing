"use client";

import { Play, Image as ImageIcon, Type } from "lucide-react";

const ITEMS = [
  { type: "video", label: "Album Teaser", color: "bg-violet-500/10", icon: Play },
  { type: "video", label: "Lyric Visual", color: "bg-blue-500/10", icon: Play },
  { type: "image", label: "Cover Art Variant", color: "bg-amber-500/10", icon: ImageIcon },
  { type: "video", label: "Story Clip", color: "bg-rose-500/10", icon: Play },
  { type: "caption", label: "IG Caption Set", color: "bg-emerald-500/10", icon: Type },
  { type: "video", label: "TikTok Hook", color: "bg-pink-500/10", icon: Play },
];

export function ContentGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {ITEMS.map((item, i) => (
        <div
          key={item.label}
          className={`${item.color} rounded-xl aspect-[4/5] flex flex-col items-center justify-center gap-2 border border-(--border)/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-md group`}
        >
          <div className="w-8 h-8 rounded-lg bg-(--background)/80 flex items-center justify-center shadow-sm">
            <item.icon size={14} className="text-(--foreground)/40 group-hover:text-(--foreground)/70 transition-colors" />
          </div>
          <span className="text-[10px] font-ui font-medium text-(--foreground)/40 text-center px-2 leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
