import Image from "next/image";
import { episodeAction } from "@/lib/podcast/episodeAction";
import type { Episode } from "@/lib/podcast/episodeSchema";
import { formatDuration } from "@/lib/podcast/formatDuration";
import { EpisodeActionLink } from "./EpisodeActionLink";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const action = episodeAction(episode.links);
  return (
    <article className="flex flex-col min-w-0 p-4 border border-[#e2e9eb] rounded-2xl bg-white shadow-[0_3px_7px_#17334206]">
      <Image className="w-full h-auto rounded-[10px]" src={episode.cover} alt="" width={1280} height={720} sizes="(max-width: 760px) 100vw, 400px" />
      <span className="mt-2 text-[11px] font-medium text-[#586f78]">{formatDuration(episode.durationSeconds)}</span>
      <h3 className="!mt-[42px] !mb-8 !text-[25px] !font-medium !leading-[1.18] !tracking-[-0.04em] max-[1050px]:!text-[22px] max-[760px]:!mt-7 max-[760px]:!mb-[26px]">{episode.title} <span className="text-[#586f78] font-[450]">w/ {episode.guest}</span></h3>
      <EpisodeActionLink slug={episode.slug} action={action} />
    </article>
  );
}
