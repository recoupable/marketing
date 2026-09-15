"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { siteConfig } from "@/lib/config";

const platforms = [
  { key: "youtube", label: "YouTube", href: siteConfig.podcast.youtube, path: <><rect x="3" y="5" width="18" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></> },
  { key: "apple", label: "Apple Podcasts", href: siteConfig.podcast.apple, path: <><circle cx="12" cy="10" r="3" /><path d="M9.2 20.5h5.6l-.6-5.2a2.2 2.2 0 0 0-2.2-2h0a2.2 2.2 0 0 0-2.2 2z" /><path d="M6.3 15.7a7 7 0 1 1 11.4 0" /></> },
  { key: "spotify", label: "Spotify", href: siteConfig.podcast.spotify, path: <><circle cx="12" cy="12" r="9" /><path d="M7.5 9.5c3-1 6.5-.8 9.5.8M8 12.5c2.5-.8 5.3-.6 7.8.7M8.6 15.3c1.9-.6 4-.5 5.9.5" /></> },
] as const;

/** Where to follow the show; each click reports the platform only. */
export function PlatformLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3 mt-[30px] max-[760px]:mt-[26px]">
      {platforms.map((platform) => (
        <a key={platform.key} className="inline-flex items-center gap-2 text-sm font-medium tracking-[-0.01em] hover:text-[#087bab]" href={platform.href} target="_blank" rel="noopener" onClick={() => trackEvent("podcast_platform_clicked", { platform: platform.key })}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{platform.path}</svg>
          {platform.label}
        </a>
      ))}
    </div>
  );
}
