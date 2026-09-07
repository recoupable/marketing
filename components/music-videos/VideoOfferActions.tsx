import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoOfferActions({
  placement,
}: {
  placement: "hero" | "closing";
}) {
  return (
    <div className="mv-actions">
      <OfferLink
        href={c.skill.downloadUrl}
        event="music_video_skill_download_clicked"
        placement={placement}
        download
        className="mv-button"
      >
        {c.skill.cta} <span aria-hidden="true">↓</span>
      </OfferLink>
      <OfferLink
        href={c.appUrl}
        event="music_video_app_clicked"
        placement={placement}
        className="mv-button mv-secondary"
      >
        {c.appCta} <span aria-hidden="true">↗</span>
      </OfferLink>
    </div>
  );
}
