"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

/** Copies the transcript as plain text ("Speaker [m:ss]" then its paragraphs), read from the rendered transcript. */
export function CopyTranscriptButton({ targetId, slug, label, copiedLabel }: { targetId: string; slug: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    const turns = document.getElementById(targetId)?.querySelectorAll("[data-turn]") ?? [];
    const text = [...turns].map((turn) => [turn.getAttribute("data-turn"), ...[...turn.querySelectorAll("p")].map((p) => p.textContent)].join("\n")).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent("podcast_transcript_copied", { slug });
    } catch {
      setCopied(false);
    }
  }
  return (
    <button type="button" onClick={copy} className="inline-flex items-center !px-4 !py-0 min-h-9 !rounded-[32px] !border !border-[#cfdde2] !bg-white !text-[13px] !font-[550] !text-[#173527] hover:!border-[#087bab] hover:!text-[#087bab] transition-colors duration-150 shrink-0">
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
