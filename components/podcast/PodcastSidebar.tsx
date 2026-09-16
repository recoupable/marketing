import Image from "next/image";
import { podcastCopy } from "@/lib/copy/podcast";
import { GuestInviteLink } from "./GuestInviteLink";
import { PlatformLinks } from "./PlatformLinks";
import { PodcastSubscribe } from "./PodcastSubscribe";

/** The show block: title card, name, what the show is, where to follow, subscribe, and the guest invitation. */
export function PodcastSidebar() {
  return (
    <aside className="col-start-1 row-start-1 flex flex-col items-start pt-11 max-[760px]:mt-12 max-[760px]:pt-10 max-[760px]:border-t max-[760px]:border-[#deeaee]">
      <Image className="w-full h-auto rounded-xl mb-[26px]" src="/podcast/title-card.jpg" alt="Recoup Podcast" width={1280} height={720} sizes="(max-width: 760px) 100vw, 384px" priority />
      <p className="sp-kicker text-[#53707d]"><span></span><span>{podcastCopy.kicker}</span></p>
      <h1 className="!mt-[18px] !text-[44px] !font-[450] !leading-[1.06] !tracking-[-0.055em] max-[760px]:!text-[40px]">{podcastCopy.heading}</h1>
      {podcastCopy.paragraphs.map((paragraph, index) => <p key={paragraph} className={`${index === 0 ? "!mt-[26px]" : "!mt-[22px]"} text-base !leading-[1.65]`}>{paragraph}</p>)}
      <PlatformLinks />
      <PodcastSubscribe />
      <div className="mt-[34px] pt-[26px] border-t border-[#deeaee] w-full max-[760px]:mt-[30px] max-[760px]:pt-6">
        <p className="sp-kicker text-[#5b7886] !text-[10px]">{podcastCopy.guest.kicker}</p>
        <p className="!mt-2.5 text-[15px] !leading-[1.6] text-[#314b56]">{podcastCopy.guest.description}</p>
        <GuestInviteLink />
      </div>
    </aside>
  );
}
