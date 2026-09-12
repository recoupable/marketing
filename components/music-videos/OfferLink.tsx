"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { effectiveAcquisitionTags } from "@/lib/attribution/effectiveAcquisitionTags";

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
      onClick={() => trackEvent(event, {
        ...effectiveAcquisitionTags(currentReferralAttribution()),
        ...(film ? { film } : {}),
        ...(placement ? { placement } : {}),
      })}
    >
      {children}
    </a>
  );
}
