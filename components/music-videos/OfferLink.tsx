"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";
import { getVideoAttribution } from "@/lib/music-videos/attribution";

export function OfferLink({
  href,
  event,
  film,
  className,
  children,
}: {
  href: string;
  event: "music_video_cta" | "music_video_proof";
  film?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target={film ? "_blank" : undefined}
      rel={film ? "noopener noreferrer" : undefined}
      onClick={() => {
        try {
          track(event, { ...getVideoAttribution(), ...(film ? { film } : {}) });
        } catch {
          /* Analytics never blocks navigation. */
        }
      }}
    >
      {children}
    </a>
  );
}
