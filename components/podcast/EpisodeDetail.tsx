import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { podcastCopy } from "@/lib/copy/podcast";
import type { Episode } from "@/lib/podcast/episodeSchema";
import { episodeMeta } from "@/lib/podcast/episodeMeta";
import { episodeEditions } from "@/lib/podcast/episodeEditions";
import { EpisodeEditions } from "./EpisodeEditions";
import { EpisodeTranscript } from "./EpisodeTranscript";
import type { Transcript } from "@/lib/podcast/transcriptSchema";

/**
 * One episode, laid out like the show's reference (Standard Innovation's episode pages): date, title,
 * where to listen, the summary, the guest's links, the full transcript (closed by default), a short About block
 * with one call to action, and credits.
 */
export function EpisodeDetail({ episode, transcript }: { episode: Episode; transcript?: Transcript }) {
  const copy = podcastCopy.episode;
  return (
    <article className="col-start-2 row-start-1 min-w-0 pt-11 max-[760px]:pt-4" aria-labelledby="episode-title">
      <Link className="inline-flex items-center gap-2 text-sm font-medium text-[#53707d] hover:text-[#087bab] [&_svg]:!w-4 [&_svg]:!h-4" href="/podcast"><SkyArrow direction="left" /> {copy.back}</Link>
      <EpisodeEditions
        slug={episode.slug}
        guest={episode.guest}
        meta={episodeMeta(episode)}
        cover={episode.cover}
        editions={episodeEditions(episode)}
        englishOnly={transcript && <EpisodeTranscript slug={episode.slug} transcript={transcript} youtube={episode.links.youtube} />}
      >
        <div className="mt-9">
          <p className="sp-kicker text-[#5b7886] !text-[10px]">{copy.guestLinks.replace("{guest}", episode.guest)}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 !mt-3">
            {episode.guestLinks.map((link) => <li key={link.href}><a className="text-[15px] font-medium underline decoration-[#cfdde2] underline-offset-4 hover:text-[#087bab]" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}
          </ul>
        </div>
      </EpisodeEditions>
      <div className="mt-11 p-7 rounded-2xl bg-[#f0f7fa] max-w-[680px]">
        <p className="sp-kicker text-[#5b7886] !text-[10px]">{copy.about.kicker}</p>
        <p className="!mt-3 text-base !leading-[1.65] text-[#22343c]">{copy.about.description}</p>
        <Link className="inline-flex items-center gap-3 mt-5 px-[19px] py-2.5 min-h-11 rounded-[32px] bg-[#d6ff62] !text-[#173527] hover:bg-[#c6f443] hover:!text-[#173527] text-[13px] font-[550] transition-colors duration-150 [&_svg]:!w-[17px] [&_svg]:!h-[17px]" href={copy.about.href}>{copy.about.action} <SkyArrow /></Link>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 mt-10 pt-6 border-t border-[#deeaee] text-sm max-w-[680px]">
        <dt className="text-[#586f78]">{copy.credits.guest}</dt><dd>{episode.guest}, {episode.role}</dd>
        <dt className="text-[#586f78]">{copy.credits.host}</dt><dd>{copy.credits.hostName}</dd>
      </dl>
    </article>
  );
}
