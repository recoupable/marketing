"use client";

import { useState } from "react";
import { formatUsd } from "@/lib/valuation/formatUsd";

type ShareValuationProps = {
  artistName: string | null;
  centralValue: number;
};

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ShareValuation({ artistName, centralValue }: ShareValuationProps) {
  const [copied, setCopied] = useState(false);

  const url = "https://recoupable.dev/valuation";
  const value = formatUsd(centralValue);
  const name = artistName ?? "My artist";

  const tweetText = `${name} catalog just got valued at ${value}. What's yours worth?\n\n${url}\n\n#recoup`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — noop
    }
  }

  const btnClass =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-pixel uppercase tracking-[0.12em] text-(--foreground)/45 transition-all duration-200 hover:text-(--foreground)/70 hover:bg-(--foreground)/[0.04]";

  return (
    <div className="mt-6 flex items-center justify-center gap-1">
      <button type="button" onClick={copyLink} className={btnClass}>
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <XIcon />
        Share
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <LinkedInIcon />
        Share
      </a>
    </div>
  );
}
