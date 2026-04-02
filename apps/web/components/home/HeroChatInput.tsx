"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";

export function HeroChatInput() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "44px";
    const next = Math.max(44, Math.min(ta.scrollHeight, 164));
    ta.style.height = `${next}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

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
      className="w-full rounded-2xl border-2 border-[#1a1a1a] bg-[var(--background)]/70 backdrop-blur shadow-[0_4px_30px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
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
        placeholder="Ask me anything about your artist..."
        rows={1}
        className="w-full resize-none border-none bg-transparent px-5 py-4 text-[14px] leading-[1.6] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none"
        style={{ minHeight: 44, maxHeight: 164 }}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-end px-5 py-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[var(--foreground)] text-[var(--background)] transition-all duration-200 hover:scale-105 active:scale-95 hover:opacity-90"
          aria-label="Send"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </button>
      </div>
    </form>
  );
}
