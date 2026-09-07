import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import Image from "next/image";
import { OfferLink } from "@/components/music-videos/OfferLink";
import { VideoOfferActions } from "@/components/music-videos/VideoOfferActions";

export function VideoOfferHero() {
  return (
    <section className="grid grid-cols-[1.2fr_1fr] items-center gap-12 pt-18 pb-22 max-[761px]:grid-cols-1 max-[761px]:gap-9 max-[761px]:pt-11 max-[761px]:pb-14">
      <div>
        <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
          {c.eyebrow}
        </span>
        <h1 className="mb-7 max-w-[13ch] font-pixel text-[clamp(3rem,5.6vw,5rem)] leading-[1.02] font-normal tracking-[-0.025em] text-balance max-[761px]:text-[48px]">
          {c.headline[0]}
          <br />
          {c.headline[1]}
        </h1>
        <p className="mb-8 max-w-[65ch] text-[1.2rem] leading-[1.7] text-(--muted-foreground) max-[761px]:text-[1.0625rem]">
          {c.intro}
        </p>
        <VideoOfferActions placement="hero" />
        <span className="mt-4 block text-sm leading-[1.5] text-(--muted-foreground)">
          {c.ctaNote}
        </span>
        <p className="mt-3.5 max-w-[48ch] text-[13px] leading-[1.6] text-(--muted-foreground)">
          {c.priceNote}
        </p>
        <OfferLink
          href="#request"
          event="music_video_cta"
          className="mt-2 inline-flex min-h-11 items-center text-sm leading-[inherit] font-semibold underline underline-offset-4"
        >
          {c.serviceLink} →
        </OfferLink>
      </div>
      <OfferLink
        href={c.films[0].url}
        event="music_video_proof"
        film={c.films[0].id}
        className="relative block aspect-[3/4] max-h-[580px] overflow-hidden rounded-(--radius) bg-(--muted) max-[761px]:aspect-[4/5] max-[761px]:max-h-none max-[761px]:w-full"
      >
        <Image
          src={c.films[0].image}
          alt={c.films[0].alt}
          fill
          sizes="(max-width: 760px) 90vw, 440px"
          priority
          className="object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 grid gap-2 bg-[linear-gradient(transparent,rgba(0,0,0,0.9))] px-7 pt-14 pb-7 text-white">
          <span className="text-sm leading-[inherit]">
            {c.films[0].artist} · {c.heroFilmNote}
          </span>
          <strong className="[font-family:var(--font-ui),sans-serif] text-[1.7rem]">{c.films[0].title}</strong>
          <span className="text-sm leading-[inherit]">{c.watch} ↗</span>
        </span>
      </OfferLink>
    </section>
  );
}
