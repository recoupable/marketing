"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { SkyArrow } from "@/components/sky/arrow";
import { podcastCopy } from "@/lib/copy/podcast";

/** The sidebar's invitation link; reports the click and where it sat, nothing about the visitor. */
export function GuestInviteLink() {
  return (
    <Link className="sp-text-link mt-3.5" href={podcastCopy.guest.href} onClick={() => trackEvent("podcast_guest_requested", { placement: "sidebar" })}>
      {podcastCopy.guest.action} <SkyArrow />
    </Link>
  );
}
