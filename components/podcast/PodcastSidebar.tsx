import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { podcastCopy } from "@/lib/copy/podcast";
import { PlatformLinks } from "./PlatformLinks";
import { PodcastSubscribe } from "./PodcastSubscribe";

/** The show block: title card, name, what the show is, where to follow, subscribe, and the guest invitation. */
export function PodcastSidebar() {
  return (
    <aside className="podcast-sidebar">
      <Image className="podcast-title-card" src="/podcast/title-card.jpg" alt="Recoup Podcast" width={1280} height={720} sizes="(max-width: 760px) 100vw, 384px" priority />
      <p className="sp-kicker"><span></span><span>{podcastCopy.kicker}</span></p>
      <h1>{podcastCopy.heading}</h1>
      {podcastCopy.paragraphs.map((paragraph) => <p key={paragraph} className="podcast-intro">{paragraph}</p>)}
      <PlatformLinks />
      <PodcastSubscribe />
      <div className="podcast-guest">
        <p className="sp-kicker">{podcastCopy.guest.kicker}</p>
        <p>{podcastCopy.guest.description}</p>
        <Link className="sp-text-link" href={podcastCopy.guest.href}>{podcastCopy.guest.action} <SkyArrow /></Link>
      </div>
    </aside>
  );
}
