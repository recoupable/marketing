"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalProps {
  logs: readonly string[];
  /** Delay in ms between each log line appearing */
  delay?: number;
}

const LINE_SPLIT =
  /(\bSUCCESS\b|\bERROR\b|\bWARNING\b|\bWARN\b|\bFAIL\b|\bFAILED\b)/g;

function TerminalLine({ line }: { line: string }) {
  const parts = line.split(LINE_SPLIT);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "SUCCESS") {
          return (
            <span key={i} className="text-[#c8ff00]">
              {part}
            </span>
          );
        }
        if (
          part === "ERROR" ||
          part === "WARNING" ||
          part === "WARN" ||
          part === "FAIL" ||
          part === "FAILED"
        ) {
          return (
            <span key={i} className="text-[#ff9f43]">
              {part}
            </span>
          );
        }
        return (
          <span key={i} className="text-[#e5e5e5]">
            {part}
          </span>
        );
      })}
    </>
  );
}

/**
 * Animated terminal that reveals log lines one at a time,
 * then loops after a pause. Refined monospace on near-black.
 */
export function Terminal({ logs, delay = 400 }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount < logs.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
      return () => clearTimeout(timer);
    }

    const resetTimer = setTimeout(() => setVisibleCount(0), 3000);
    return () => clearTimeout(resetTimer);
  }, [visibleCount, logs.length, delay]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[#0d0d0d] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[#111]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[var(--muted-foreground)] font-mono">
          recoup-agent
        </span>
      </div>

      {/* Log output */}
      <div
        ref={containerRef}
        className="p-4 h-72 overflow-y-auto font-mono text-sm leading-relaxed"
      >
        {logs.slice(0, visibleCount).map((line, i) => (
          <div key={`${i}-${line}`} className="flex gap-2">
            <span className="text-[var(--muted-foreground)] select-none shrink-0">
              $
            </span>
            <TerminalLine line={line} />
          </div>
        ))}

        {/* Blinking cursor on the next empty line */}
        {visibleCount < logs.length && (
          <div className="flex gap-2">
            <span className="text-[var(--muted-foreground)] select-none">
              $
            </span>
            <span className="animate-blink text-[#c8ff00]">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
