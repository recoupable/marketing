import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { homeCopy } from "@/lib/copy/home";

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
        <h2 id="sky-contact-title">
          Find your first
          <br />
          useful AI build.
        </h2>
        <p>{homeCopy.contact.description}</p>
        <Link className="sky-landscape-cta" href="/start-project">
          {homeCopy.contact.action}{" "}
          <span aria-hidden="true">
            <SkyArrow />
          </span>
        </Link>
        <p className="sky-contact-note">
          {homeCopy.contact.note}
        </p>
      </div>
    </section>
  );
}
