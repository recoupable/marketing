import { musicVideosCopy as c } from "@/lib/copy/music-videos";

export function VideoFaqSection() {
  return (
    <section
      className="py-18 shadow-[0_-1px_0_var(--border)] max-[761px]:py-12 mx-auto max-w-[760px]"
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        className="mb-6 max-w-[22ch] font-pixel text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-normal tracking-[-0.025em] text-balance"
      >
        {c.faqTitle}
      </h2>
      {c.faq.map((f) => (
        <details key={f.q} className="py-5 shadow-[0_1px_0_var(--border)]">
          <summary className="list-item min-h-11 cursor-pointer content-center text-[1.0625rem] font-semibold">
            {f.q}
          </summary>
          <p className="mt-3 mb-1 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
            {f.a}
          </p>
        </details>
      ))}
    </section>
  );
}
