import Image from "next/image";
import { SkyArrow } from "@/components/sky/arrow";
import { episodeAction } from "@/lib/podcast/episodeAction";
import type { Episode } from "@/lib/podcast/episodeSchema";
import { episodeMeta } from "@/lib/podcast/episodeMeta";
import { EpisodeCardLink } from "./EpisodeCardLink";

/** One episode on /podcast. The whole card opens the episode page; the pill is its visual call to action. */
export function EpisodeCard({ episode }: { episode: Episode }) {
  const action = episodeAction(episode);
  return (
    <article className="flex min-w-0">
      <EpisodeCardLink slug={episode.slug} href={action.href} label={`${episode.title} w/ ${episode.guest}: ${action.label}`}>
        <Image className="w-full h-auto rounded-[10px]" src={episode.cover} alt="" width={1280} height={720} sizes="(max-width: 760px) 100vw, 400px" />
        <span className="mt-2 text-[11px] font-medium text-[#586f78]">{episodeMeta(episode)}</span>
        <h3 className="!mt-[42px] !mb-8 !text-[25px] !font-medium !leading-[1.18] !tracking-[-0.04em] max-[1050px]:!text-[22px] max-[760px]:!mt-7 max-[760px]:!mb-[26px] group-hover:text-[#087bab] transition-colors duration-150">{episode.title} <span className="text-[#586f78] font-[450]">w/ {episode.guest}</span></h3>
        <span className="inline-flex items-center gap-3 self-start mt-auto px-[19px] py-2.5 min-h-11 rounded-[32px] bg-[#d6ff62] text-[#173527] group-hover:bg-[#c6f443] text-[13px] font-[550] transition-colors duration-150 [&_svg]:!w-[17px] [&_svg]:!h-[17px]">{action.label} <SkyArrow direction="right" /></span>
      </EpisodeCardLink>
    </article>
  );
}
