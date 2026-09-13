import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";

export function SkyLandscapeContact() {
  return (
    <section
      className="sky-landscape-contact"
      id="contact"
      aria-labelledby="sky-contact-title"
    >
      <Image
        src="/images/sky/contact-meadow.webp"
        alt=""
        fill
        sizes="(max-width: 760px) 100vw, 85vw"
      />
      <div className="sky-landscape-copy" data-reveal="">
        <p className="sky-section-label">LET\u2019S PUT AI TO WORK</p>
        <h2 id="sky-contact-title">
          Find your first
          <br />
          useful AI build.
        </h2>
        <p>
          Start with a free audit of one workflow. We\u2019ll review where AI
          could help and identify a practical first step for your team.
        </p>
        <Link className="sky-landscape-cta" href="/start-project">
          GET A FREE AUDIT{" "}
          <span aria-hidden="true">
            <SkyArrow />
          </span>
        </Link>
        <p className="sky-contact-note">
          The audit is free. Any build is scoped and priced separately.
        </p>
      </div>
    </section>
  );
}
