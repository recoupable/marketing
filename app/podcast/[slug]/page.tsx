import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpisodeDetail } from "@/components/podcast/EpisodeDetail";
import { PodcastSidebar } from "@/components/podcast/PodcastSidebar";
import { episodeJsonLd } from "@/lib/podcast/episodeJsonLd";
import { episodeMetadata } from "@/lib/podcast/episodeMetadata";
import { readEpisode } from "@/lib/podcast/readEpisode";
import { readEpisodes } from "@/lib/podcast/readEpisodes";
import { readTranscript } from "@/lib/podcast/readTranscript";
import { serializeJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return readEpisodes().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const episode = readEpisode((await params).slug);
  return episode ? episodeMetadata(episode) : {};
}

/** One episode page: the same two-column frame as /podcast, with the episode in place of the grid. */
export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const episode = readEpisode((await params).slug);
  if (!episode) notFound();
  return (
    <div className="grid grid-cols-[384px_minmax(0,1fr)] items-start gap-[50px] max-w-[1248px] mx-auto mt-11 px-9 max-[1050px]:grid-cols-[320px_minmax(0,1fr)] max-[1050px]:gap-8 max-[1050px]:px-5 max-[760px]:flex max-[760px]:flex-col max-[760px]:gap-0 max-[760px]:mt-6 max-[760px]:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(episodeJsonLd(episode)) }} />
      <EpisodeDetail episode={episode} transcript={readTranscript(episode.slug)} />
      <PodcastSidebar headingAs="p" />
    </div>
  );
}
