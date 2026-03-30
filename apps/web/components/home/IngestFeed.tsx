"use client";

import { useEffect, useState } from "react";

interface FeedLine {
  time: string;
  label: string;
  value: string;
  highlight?: boolean;
}

interface IngestFeedProps {
  lines: readonly FeedLine[];
}

export function IngestFeed({ lines }: IngestFeedProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= lines.length) return;

    const delay = visibleCount === 0 ? 600 : 400 + Math.random() * 300;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, lines.length]);

  return (
    <div className="border border-(--border) bg-[#0c0f14] font-mono text-sm w-full rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--border)">
        <span className="text-xs font-bold tracking-widest text-(--muted-foreground)">
          LIVE INGEST FEED
        </span>
        <span className="flex items-center gap-2 text-xs text-(--muted-foreground)">
          <span className="inline-block w-2 h-2 rounded-full bg-(--brand) animate-blink" />
          REC
        </span>
      </div>

      {/* Feed lines */}
      <div className="px-4 py-4 space-y-2 min-h-[340px]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex gap-3 leading-snug">
            <span className="text-(--muted-foreground) shrink-0">
              {line.time}
            </span>
            <span className="text-(--foreground) font-bold shrink-0">
              {line.label}
            </span>
            <span
              className={
                line.highlight
                  ? "text-(--brand)"
                  : "text-(--muted-foreground)"
              }
            >
              {line.value}
            </span>
          </div>
        ))}

        {/* Waiting cursor */}
        <div className="pt-4 text-(--muted-foreground)/40 flex items-center gap-1">
          <span>{"// Waiting for stream buffer..."}</span>
          <span className="animate-blink">▌</span>
        </div>
      </div>
    </div>
  );
}
