import Image from "next/image";
import Link from "next/link";
import { PageMark } from "@/components/sky/brand";
import { SkyArrow } from "@/components/sky/arrow";

export function WorkflowIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="wp-welcome" aria-labelledby="wp-welcome-title">
      <Image className="wp-welcome-sky" src="/images/sky/hero-sky.webp" alt="" fill sizes="100vw" preload />
      <Link href="/" className="wp-welcome-logo" aria-label="Recoup home"><PageMark /></Link>
      <div className="wp-welcome-copy">
        <h1 id="wp-welcome-title">What could AI do for<br /><span>your music business?</span></h1>
        <p>Three quick questions. Get a custom plan showing what to automate and how to start.</p>
        <button onClick={onStart} className="wp-welcome-start">
          Get my free AI plan <span aria-hidden="true"><SkyArrow /></span>
        </button>
      </div>
    </section>
  );
}
