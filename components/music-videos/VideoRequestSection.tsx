import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { VideoRequestForm } from "@/components/music-videos/VideoRequestForm";

export function VideoRequestSection() {
  return (
    <section
      className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12 grid scroll-mt-[100px] grid-cols-2 items-start gap-18 max-[761px]:grid-cols-1 max-[761px]:gap-8"
      id="request"
    >
      <div>
        <span className="mb-5 block [font-family:var(--font-ui),sans-serif] text-xs leading-[1.4] font-semibold tracking-[0.12em] text-(--muted-foreground) max-[761px]:mb-4">
          {c.form.eyebrow}
        </span>
        <h2 className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance">
          {c.form.title}
        </h2>
        <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
          {c.form.intro}
        </p>
      </div>
      <VideoRequestForm />
    </section>
  );
}
