import { homeHeroCopy } from "@/lib/copy/home-hero";

import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { SkyHeroCards } from "./sky-hero-cards";


export function SkyHero() {
  return (
    <section className="sky-hero" aria-labelledby="sky-title">
      <Image
        className="sky-hero-image"
        src="/images/sky/hero-sky.webp"
        alt=""
        fill
        sizes="(max-width: 800px) 100vw, 92vw"
        preload
      />
      <div className="sky-hero-shade" />
      <div className="sky-hero-copy">
        <Link className="sky-hero-pill" href={homeHeroCopy.announcement.href}>
          <span className="sky-hero-pill-badge">{homeHeroCopy.announcement.badge}</span>
          <span>{homeHeroCopy.announcement.label}</span>
          <SkyArrow />
        </Link>
        <h1 id="sky-title">
          {homeHeroCopy.title[0]}
          <br />
          <span>{homeHeroCopy.title[1]}</span>
        </h1>
        <p className="sky-hero-description">
          {homeHeroCopy.description}
        </p>
      </div>

      <SkyHeroCards />
      <section className="sky-proof" aria-label="Music companies using Recoup">
        <p data-reveal="">{homeHeroCopy.proof}</p>
        <div data-reveal-group="">
          {homeHeroCopy.customers.map((customer) => (
            <Image
              key={customer.file}
              src={customer.src ?? `/images/customers/${customer.file}-transparent.webp`}
              alt={customer.name}
              width={customer.width}
              height={customer.height}
              unoptimized
            />
          ))}
        </div>
      </section>
    </section>
  );
}
