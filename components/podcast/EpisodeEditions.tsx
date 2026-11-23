"use client";

import Image from "next/image";
import { useSyncExternalStore, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { podcastCopy } from "@/lib/copy/podcast";
import { editionLangFromSearch } from "@/lib/podcast/editionLangFromSearch";
import type { EditionLang, EpisodeEdition } from "@/lib/podcast/episodeEditions";
import { youtubeEmbedUrl } from "@/lib/podcast/youtubeEmbedUrl";
import { EpisodeEditionToggle } from "./EpisodeEditionToggle";
import { EpisodeListenLinks } from "./EpisodeListenLinks";

const changed = "podcast-episode-lang";

/** Re-read the URL's search on back/forward and after the switch rewrites it. */
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(changed, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(changed, onChange);
  };
}

/**
 * The part of an episode page that changes with its language: title, listen links, the embedded video and the
 * summary. English renders on the server; a bilingual episode adds the EN/ES switch, and `?lang=es` opens Spanish.
 * `children` (the guest's links) follow the summary in every edition; `englishOnly` (the English edition's
 * transcript, whose timestamps open the English video) shows with the English edition only.
 */
export function EpisodeEditions({ slug, guest, meta, cover, editions, children, englishOnly }: { slug: string; guest: string; meta: string; cover: string; editions: EpisodeEdition[]; children?: ReactNode; englishOnly?: ReactNode }) {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const lang = editionLangFromSearch(search, editions);
  const edition = editions.find((candidate) => candidate.lang === lang) ?? editions[0];
  const copy = podcastCopy.episode.editions[edition.lang];
  const embed = youtubeEmbedUrl(edition.links.youtube);

  const choose = (next: EditionLang) => {
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(changed));
    trackEvent("podcast_episode_language", { slug, lang: next });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 !mt-7">
        <p className="text-[13px] font-medium text-[#586f78]">{meta}</p>
        {editions.length > 1 && <EpisodeEditionToggle langs={editions.map((candidate) => candidate.lang)} current={edition.lang} onChange={choose} />}
      </div>
      <div lang={edition.lang}>
        <h1 id="episode-title" className="!mt-3 !text-[clamp(36px,3.6vw,52px)] !font-[450] !leading-[1.08] !tracking-[-0.05em]">{edition.title} <span className="text-[#586f78]">{copy.with} {guest}</span></h1>
        <EpisodeListenLinks slug={slug} links={edition.links} labels={copy} platformSuffix={edition.platformSuffix} />
        {embed ? (
          <iframe key={embed} className="w-full aspect-video rounded-2xl mt-8 border-0 bg-[#132b26]" src={embed} title={`${edition.title} ${copy.with} ${guest} (YouTube video)`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" />
        ) : (
          <Image className="w-full h-auto rounded-2xl mt-8" src={cover} alt={`${edition.title} ${copy.with} ${guest}`} width={1280} height={720} sizes="(max-width: 760px) 100vw, 760px" priority />
        )}
        <div className="mt-8 max-w-[680px]">
          {edition.summary.map((paragraph, index) => <p key={paragraph} className={`${index === 0 ? "" : "!mt-5"} text-[17px] !leading-[1.7] text-[#22343c]`}>{paragraph}</p>)}
        </div>
      </div>
      {children}
      {edition.lang === "en" && englishOnly}
    </>
  );
}
