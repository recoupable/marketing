import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoOfferActions({
  placement,
}: {
  placement: "hero" | "closing";
}) {
  return (
    <div
      className={
        placement === "hero"
          ? "flex flex-wrap gap-3 max-[761px]:flex-col"
          : "mt-6 flex flex-wrap justify-center gap-4 max-[761px]:flex-col"
      }
    >
      <OfferLink
        href={c.skill.downloadUrl}
        event="music_video_skill_download_clicked"
        placement={placement}
        download
        className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 rounded-(--radius) px-6 py-3.5 [font-family:var(--font-ui),sans-serif] text-base leading-[1.5] font-semibold no-underline hover:opacity-[0.86] bg-(--primary) text-(--primary-foreground) max-[761px]:w-full"
      >
        {c.skill.cta} <span aria-hidden="true">↓</span>
      </OfferLink>
      <OfferLink
        href={c.appUrl}
        event="music_video_app_clicked"
        placement={placement}
        className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 rounded-(--radius) px-6 py-3.5 [font-family:var(--font-ui),sans-serif] text-base leading-[1.5] font-semibold no-underline hover:opacity-[0.86] bg-transparent text-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] max-[761px]:w-full"
      >
        {c.appCta} <span aria-hidden="true">↗</span>
      </OfferLink>
    </div>
  );
}
