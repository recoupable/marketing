"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";

const PLACEHOLDERS = [
  "Research streaming trends for my genre…",
  "Create a 30-day release plan for my EP…",
  "Analyze my Spotify audience demographics…",
  "Write press copy for my upcoming single…",
  "Compare my catalog to similar artists…",
];

export function HeroChatInput() {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [phIdx, setPhIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "48px";
    const next = Math.max(48, Math.min(ta.scrollHeight, 164));
    ta.style.height = `${next}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
    if (value) return;
    const interval = setInterval(() => {
      setPhIdx((prev) => {
        const next = (prev + 1) % PLACEHOLDERS.length;
        setPlaceholder(PLACEHOLDERS[next]);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [value]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    const url = q
      ? `${siteConfig.appUrl}/chat?q=${encodeURIComponent(q)}`
      : siteConfig.appUrl;
    router.push(url);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="chat-glow-ring w-full rounded-2xl border border-(--border) bg-(--background) shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.07)] hover:border-(--foreground)/12 focus-within:border-(--foreground)/20 focus-within:shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder={placeholder}
        rows={1}
        className="w-full resize-none border-none bg-transparent px-5 pt-4 pb-2 text-[15px] leading-[1.6] text-(--foreground) placeholder:text-(--foreground)/25 placeholder:transition-opacity outline-none"
        style={{ minHeight: 48, maxHeight: 164 }}
      />

      <div className="flex items-center justify-between px-5 pb-3">
        <span className="text-[11px] font-ui text-(--foreground)/15">
          Enter ↵
        </span>
        <button
          type="submit"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-(--foreground) text-(--background) transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Send"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
