import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { VideoOfferActions } from "@/components/music-videos/VideoOfferActions";

export function VideoClosingSection() {
  return (
    <section className="pt-16 pb-6 text-center shadow-[0_-1px_0_var(--border)]">
      <h2 className="mx-auto mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance">
        {c.closing.title}
      </h2>
      <p className="mx-auto mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
        {c.closing.intro}
      </p>
      <VideoOfferActions placement="closing" />
    </section>
  );
}
