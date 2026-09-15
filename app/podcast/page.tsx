import type { Metadata } from "next";
import { EpisodeCard } from "@/components/podcast/EpisodeCard";
import { PodcastSidebar } from "@/components/podcast/PodcastSidebar";
import { podcastCopy } from "@/lib/copy/podcast";
import { podcastMetadata } from "@/lib/podcast/podcastMetadata";
import { readEpisodes } from "@/lib/podcast/readEpisodes";
import "./podcast.css";

export const metadata: Metadata = podcastMetadata();

export default function PodcastPage() {
  const episodes = readEpisodes();
  return (
    <div className="sky-subpage podcast-page">
      <section className="podcast-episodes" aria-labelledby="podcast-episodes-heading">
        <h2 id="podcast-episodes-heading">{podcastCopy.episodes.heading}</h2>
        <div className="podcast-grid">{episodes.map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}</div>
      </section>
      <PodcastSidebar />
    </div>
  );
}
