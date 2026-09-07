import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoProcessSection() {
  return (
    <section className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12">
      <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
        {c.processEyebrow}
      </span>
      <h2 className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance">
        {c.processTitle}
      </h2>
      <ol className="mt-9 grid list-none grid-cols-3 gap-10 p-0 max-[761px]:grid-cols-1 max-[761px]:gap-8">
        {c.process.map((p, i) => (
          <li key={p.title} className="max-[761px]:flex max-[761px]:gap-6">
            <span
              className="font-pixel text-[2.5rem] max-[761px]:min-w-6"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="my-3 text-[1.45rem] leading-[1.3] font-semibold max-[761px]:mt-1">
                {p.title}
              </h3>
              <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
                {p.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-9 rounded-(--radius) bg-(--muted) p-6">
        <strong className="[font-family:var(--font-ui),sans-serif] text-[17px] leading-[normal] font-semibold">
          {c.routeNote.title}
        </strong>
        <p className="mt-2 max-w-[65ch] text-[15px] leading-[1.6] text-(--muted-foreground)">
          {c.routeNote.text}{" "}
          <OfferLink
            href="#request"
            event="music_video_cta"
            className="underline"
          >
            {c.routeNote.cta}
          </OfferLink>
          .
        </p>
      </div>
    </section>
  );
}
