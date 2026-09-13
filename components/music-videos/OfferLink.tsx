"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { appLink } from "@/lib/appLink";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { effectiveAcquisitionTags } from "@/lib/attribution/effectiveAcquisitionTags";
import { useReferralAttribution } from "@/lib/attribution/useReferralAttribution";

type Destination = { href: string; appPlacement?: never } | { appPlacement: string; href?: never };

type OfferLinkProps = Destination & {
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
};

/** An offer link that reports its click; with `appPlacement` it opens the app carrying the visitor's stored tags. */
export function OfferLink({ href, appPlacement, event, film, placement, download, className, children }: OfferLinkProps) {
  const attribution = useReferralAttribution();
  return (
    <a
      href={appPlacement ? appLink(appPlacement, { attribution }) : href}
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
