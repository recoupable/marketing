"use client";

import { podcastCopy } from "@/lib/copy/podcast";
import type { EditionLang } from "@/lib/podcast/episodeEditions";

/** The EN/ES switch on a bilingual episode: two pressed-state buttons, the current edition filled. */
export function EpisodeEditionToggle({ langs, current, onChange }: { langs: EditionLang[]; current: EditionLang; onChange: (lang: EditionLang) => void }) {
  const copy = podcastCopy.episode.editions;
  return (
    <div role="group" aria-label={copy.label} className="inline-flex p-[3px] rounded-[10px] border border-[#deeaee] bg-[#f6fafb]">
      {langs.map((lang) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          aria-pressed={lang === current}
          aria-label={copy[lang].name}
          className={`px-3 py-1 min-h-8 rounded-[7px] text-[12px] font-[550] tracking-[0.04em] transition-colors duration-150 ${lang === current ? "bg-white text-[#173527] shadow-[0_1px_2px_rgba(19,43,38,0.12)]" : "text-[#586f78] hover:text-[#087bab]"}`}
          onClick={() => onChange(lang)}
        >
          {copy[lang].short}
        </button>
      ))}
    </div>
  );
}
