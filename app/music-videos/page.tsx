import { VideoOfferHero } from "@/components/music-videos/VideoOfferHero";
import { VideoSkillSection } from "@/components/music-videos/VideoSkillSection";
import { VideoFilmsSection } from "@/components/music-videos/VideoFilmsSection";
import { VideoProcessSection } from "@/components/music-videos/VideoProcessSection";
import { VideoCustomOfferSection } from "@/components/music-videos/VideoCustomOfferSection";
import { VideoRequestSection } from "@/components/music-videos/VideoRequestSection";
import { VideoFaqSection } from "@/components/music-videos/VideoFaqSection";
import { VideoClosingSection } from "@/components/music-videos/VideoClosingSection";
import { buildPageMetadata } from "@/lib/seo";
import { musicVideosCopy as c } from "@/lib/copy/music-videos";

export const metadata = buildPageMetadata({
  title: c.title,
  description: c.description,
  path: "/music-videos",
});

export default function MusicVideosPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-8 pt-16 pb-20 text-[17px] leading-[1.7] text-(--foreground) max-[761px]:px-6 max-[761px]:pb-12 [&_:is(a,button,input,textarea,summary)]:focus-visible:outline-2 [&_:is(a,button,input,textarea,summary)]:focus-visible:outline-offset-[5px] [&_:is(a,button,input,textarea,summary)]:focus-visible:outline-(--ring)">
      <VideoOfferHero />
      <VideoSkillSection />
      <VideoFilmsSection />
      <VideoProcessSection />
      <VideoCustomOfferSection />
      <VideoRequestSection />
      <VideoFaqSection />
      <VideoClosingSection />
    </div>
  );
}
