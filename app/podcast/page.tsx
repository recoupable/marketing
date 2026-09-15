import type { Metadata } from "next";
import { EpisodeCard } from "@/components/podcast/EpisodeCard";
import { PodcastSidebar } from "@/components/podcast/PodcastSidebar";
import { podcastCopy } from "@/lib/copy/podcast";
import { podcastMetadata } from "@/lib/podcast/podcastMetadata";
import { readEpisodes } from "@/lib/podcast/readEpisodes";

export const metadata: Metadata = podcastMetadata();

/**
 * Episodes come first in the DOM (reading order); on desktop the grid places the sidebar in the
 * left column. Heading and paragraph utilities carry `!` because globals.css sets unlayered h1/h2/h3/p
 * type and margin rules that outrank the utilities layer.
 */
export default function PodcastPage() {
  const episodes = readEpisodes();
  return (
    <div className="grid grid-cols-[384px_minmax(0,1fr)] items-start gap-[50px] max-w-[1248px] mx-auto mt-11 px-9 max-[1050px]:grid-cols-[320px_minmax(0,1fr)] max-[1050px]:gap-8 max-[1050px]:px-5 max-[760px]:flex max-[760px]:flex-col max-[760px]:gap-0 max-[760px]:mt-6 max-[760px]:px-0">
      <section className="col-start-2 row-start-1 max-[760px]:pt-4" aria-labelledby="podcast-episodes-heading">
        <h2 id="podcast-episodes-heading" className="!text-[clamp(44px,4.5vw,64px)] !font-[450] !leading-[1.05] !tracking-[-0.055em] text-[#087bab]">{podcastCopy.episodes.heading}</h2>
        <div className="grid grid-cols-2 gap-[34px] mt-[30px] max-[760px]:grid-cols-1 max-[760px]:gap-6 max-[760px]:mt-6">{episodes.map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}</div>
      </section>
      <PodcastSidebar />
    </div>
  );
}
