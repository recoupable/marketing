import Image from "next/image";
import { episodeAction } from "@/lib/podcast/episodeAction";
import type { Episode } from "@/lib/podcast/episodeSchema";
import { formatDuration } from "@/lib/podcast/formatDuration";
import { EpisodeActionLink } from "./EpisodeActionLink";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const action = episodeAction(episode.links);
  return (
    <article className="podcast-card">
      <Image className="podcast-card-cover" src={episode.cover} alt="" width={1280} height={720} sizes="(max-width: 760px) 100vw, 400px" />
      <span className="podcast-card-duration">{formatDuration(episode.durationSeconds)}</span>
      <h3>{episode.title} <span>w/ {episode.guest}</span></h3>
      <EpisodeActionLink slug={episode.slug} action={action} />
    </article>
  );
}
