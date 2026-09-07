import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoCustomOfferSection() {
  return (
    <section className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12 grid grid-cols-2 items-start gap-18 max-[761px]:grid-cols-1 max-[761px]:gap-8">
      <div>
        <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
          {c.offerEyebrow}
        </span>
        <h2 className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance">
          {c.offerTitle}
        </h2>
        <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
          {c.offerIntro}
        </p>
        <OfferLink
          href="#request"
          event="music_video_cta"
          className="inline-flex min-h-11 items-center font-semibold underline underline-offset-[5px]"
        >
          {c.cta} →
        </OfferLink>
        <p className="mt-4 max-w-[65ch] text-sm leading-[1.7] text-(--muted-foreground)">
          {c.offerNote}
        </p>
      </div>
      <ul className="m-0 list-none p-0">
        {c.deliverables.map((d) => (
          <li
            key={d}
            className="py-5 text-[1.1rem] shadow-[0_1px_0_var(--border)]"
          >
            {d}
          </li>
        ))}
      </ul>
    </section>
  );
}
