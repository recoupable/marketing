import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { podcastCopy } from "@/lib/copy/podcast";
import type { Episode } from "@/lib/podcast/episodeSchema";
import { formatDuration } from "@/lib/podcast/formatDuration";
import { formatEpisodeDate } from "@/lib/podcast/formatEpisodeDate";
import { youtubeEmbedUrl } from "@/lib/podcast/youtubeEmbedUrl";
import { EpisodeListenLinks } from "./EpisodeListenLinks";

/**
 * One episode, laid out like the show's reference (Standard Innovation's episode pages): date, title,
 * where to listen, the summary, the guest's links, a short About block with one call to action, and credits.
 */
export function EpisodeDetail({ episode }: { episode: Episode }) {
  const copy = podcastCopy.episode;
  const embed = youtubeEmbedUrl(episode.links.youtube);
  return (
    <article className="col-start-2 row-start-1 min-w-0 pt-11 max-[760px]:pt-4" aria-labelledby="episode-title">
      <Link className="inline-flex items-center gap-2 text-sm font-medium text-[#53707d] hover:text-[#087bab] [&_svg]:!w-4 [&_svg]:!h-4" href="/podcast"><SkyArrow direction="left" /> {copy.back}</Link>
      <p className="!mt-7 text-[13px] font-medium text-[#586f78]">{formatEpisodeDate(episode.date)} · {formatDuration(episode.durationSeconds)}</p>
      <h1 id="episode-title" className="!mt-3 !text-[clamp(36px,3.6vw,52px)] !font-[450] !leading-[1.08] !tracking-[-0.05em]">{episode.title} <span className="text-[#586f78]">w/ {episode.guest}</span></h1>
      <EpisodeListenLinks slug={episode.slug} links={episode.links} />
      {embed ? (
        <iframe className="w-full aspect-video rounded-2xl mt-8 border-0 bg-[#132b26]" src={embed} title={`${episode.title} w/ ${episode.guest} (YouTube video)`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" />
      ) : (
        <Image className="w-full h-auto rounded-2xl mt-8" src={episode.cover} alt={`${episode.title} w/ ${episode.guest}`} width={1280} height={720} sizes="(max-width: 760px) 100vw, 760px" priority />
      )}
      <div className="mt-8 max-w-[680px]">
        {episode.summary.map((paragraph, index) => <p key={paragraph} className={`${index === 0 ? "" : "!mt-5"} text-[17px] !leading-[1.7] text-[#22343c]`}>{paragraph}</p>)}
      </div>
      {episode.guestLinks.length > 0 && (
        <div className="mt-9">
          <p className="sp-kicker text-[#5b7886] !text-[10px]">{copy.guestLinks.replace("{guest}", episode.guest)}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 !mt-3">
            {episode.guestLinks.map((link) => <li key={link.href}><a className="text-[15px] font-medium underline decoration-[#cfdde2] underline-offset-4 hover:text-[#087bab]" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}
          </ul>
        </div>
      )}
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
