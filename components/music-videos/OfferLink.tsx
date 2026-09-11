"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";
import { getVideoAttribution } from "@/lib/music-videos/attribution";

export function OfferLink({
  href,
  event,
  film,
  placement,
  download,
  className,
  children,
}: {
  href: string;
  event:
    | "music_video_cta"
    | "music_video_proof"
    | "music_video_skill_download_clicked"
    | "music_video_app_clicked";
  film?: string;
  placement?: "hero" | "skill" | "closing";
  download?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      download={download}
      target={film ? "_blank" : undefined}
      rel={film ? "noopener noreferrer" : undefined}
      onClick={() => {
        try {
          track(event, {
            ...getVideoAttribution(),
            ...(film ? { film } : {}),
            ...(placement ? { placement } : {}),
          });
        } catch {
          /* Analytics never blocks navigation. */
        }
      }}
    >
      {children}
    </a>
  );
}
