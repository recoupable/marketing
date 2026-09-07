import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";

export function VideoSkillSection() {
  return (
    <section
      className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12 grid grid-cols-2 items-center gap-18 max-[761px]:grid-cols-1 max-[761px]:gap-8"
      id="skill"
      aria-labelledby="skill-title"
    >
      <div>
        <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
          {c.skill.eyebrow}
        </span>
        <h2
          id="skill-title"
          className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance"
        >
          {c.skill.title}
        </h2>
        <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
          {c.skill.intro}
        </p>
        <OfferLink
          href={c.skill.downloadUrl}
          event="music_video_skill_download_clicked"
          placement="skill"
          download
          className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 rounded-(--radius) px-6 py-3.5 [font-family:var(--font-ui),sans-serif] text-base leading-[1.5] font-semibold no-underline hover:opacity-[0.86] bg-(--primary) text-(--primary-foreground)"
        >
          {c.skill.cta} <span aria-hidden="true">↓</span>
        </OfferLink>
        <p className="mt-4 max-w-[65ch] text-sm leading-[1.7] text-(--muted-foreground)">
          {c.skill.explanation}
        </p>
      </div>
      <div className="rounded-2xl bg-(--muted) p-7 shadow-[0_0_0_1px_var(--border)] max-[761px]:p-6">
        <div className="flex items-center gap-3.5 pb-6 shadow-[0_1px_0_var(--border)] max-[761px]:gap-2.5">
          <span
            className="font-pixel text-[32px] leading-[normal] font-normal"
            aria-hidden="true"
          >
            ↳
          </span>
          <div>
            <strong className="block [font-family:var(--font-ui),sans-serif] text-[17px] leading-[normal] font-semibold max-[761px]:text-base">
              {c.skill.name}
            </strong>
            <span className="mt-1 block text-[13px] text-(--muted-foreground)">
              {c.skill.files}
            </span>
          </div>
          <span className="ml-auto rounded-[99px] px-2.5 py-1.5 [font-family:var(--font-ui),sans-serif] text-[11px] leading-[normal] font-semibold tracking-[0.08em] shadow-[0_0_0_1px_var(--border)] max-[761px]:px-2 max-[761px]:py-[5px]">
            {c.skill.badge}
          </span>
        </div>
        <ul className="m-0 list-none py-3">
          {c.skill.contents.map((item) => (
            <li key={item} className="py-2.5 text-[15px]">
              <span className="mr-3" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-between gap-2 pt-5 text-xs leading-[inherit] text-(--muted-foreground) shadow-[0_-1px_0_var(--border)]">
          <a href={c.skill.sourceUrl} className="underline">
            {c.skill.sourceCta} ↗
          </a>
          <span>{c.skill.noEmail}</span>
        </div>
      </div>
    </section>
  );
}
