import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import Image from "next/image";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoFilmsSection() {
  return (
    <section
      className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12"
      aria-labelledby="films-title"
    >
      <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
        {c.filmsEyebrow}
      </span>
      <h2
        id="films-title"
        className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance"
      >
        {c.filmsTitle}
      </h2>
      <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
        {c.filmsIntro}
      </p>
      <div className="mt-10 grid grid-cols-2 gap-12 max-[761px]:grid-cols-1 max-[761px]:gap-8">
        {c.films.map((f) => (
          <article key={f.id}>
            <OfferLink
              href={f.url}
              event="music_video_proof"
              film={f.id}
              className="relative mb-5 block aspect-[4/3] overflow-hidden rounded-(--radius) bg-(--muted)"
            >
              <Image
                src={f.image}
                alt={f.alt}
                fill
                className="object-cover object-[center_40%]"
                sizes="(max-width: 760px) 90vw, 520px"
              />
            </OfferLink>
            <p className="mb-4 max-w-[65ch] text-sm leading-[1.5] text-(--muted-foreground)">
              {f.artist} · {f.format}
            </p>
            <h3 className="my-3 text-[1.45rem] leading-[1.3] font-semibold">
              {f.title}
            </h3>
            <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
              {f.description}
            </p>
            <OfferLink
              href={f.url}
              event="music_video_proof"
              film={f.id}
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-[5px]"
            >
              {c.watch} ↗
            </OfferLink>
          </article>
        ))}
      </div>
    </section>
  );
}
