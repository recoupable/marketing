import Image from "next/image";
import { pricingCopy } from "@/lib/copy/pricing";

/**
 * The product proof on /pricing: a real scheduled report next to the founder
 * quote the homepage already makes. Server component, static asset.
 */
export function ProofBlock() {
  const p = pricingCopy.proof;
  return (
    <section className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-10 items-center">
      <div className="rounded-2xl overflow-hidden bg-white shadow-[0_0_0_1px_var(--border),0_16px_32px_rgba(0,0,0,0.12)]">
        <Image
          src={p.image}
          alt={p.alt}
          width={p.imageWidth}
          height={p.imageHeight}
          sizes="(min-width: 768px) 480px, 100vw"
          className="w-full h-auto"
        />
      </div>
      <div>
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {p.eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{p.title}</h2>
        <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">{p.body}</p>
        <blockquote className="pl-4 shadow-[inset_2px_0_0_var(--foreground)]">
          <p className="text-sm leading-relaxed mb-2">{p.quote}</p>
          <footer className="text-xs text-[var(--muted-foreground)]">{p.attribution}</footer>
        </blockquote>
      </div>
    </section>
  );
}
