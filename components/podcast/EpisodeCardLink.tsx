"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

/** The whole card as one link to the episode page (no dead zones); reports which episode, nothing about the visitor. */
export function EpisodeCardLink({ slug, href, label, children }: { slug: string; href: string; label: string; children: ReactNode }) {
  return (
    <Link
      className="group flex flex-col w-full min-w-0 p-4 border border-[#e2e9eb] rounded-2xl bg-white shadow-[0_3px_7px_#17334206] !text-inherit !no-underline transition-[border-color,box-shadow] duration-150 hover:border-[#bcd3da] hover:shadow-[0_6px_16px_#17334212] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087bab]"
      href={href}
      aria-label={label}
      onClick={() => trackEvent("podcast_episode_clicked", { slug, platform: "episode-page" })}
    >
      {children}
    </Link>
  );
}
