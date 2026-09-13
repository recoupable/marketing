import Image from "next/image";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { SkyHeroCards } from "./sky-hero-cards";

const customers = [
  { name: "Duetti", file: "duetti", width: 104, height: 16 },
  {
    name: "Seeker Music",
    file: "seeker-music",
    src: "/images/customers/seeker-logotype-white.png",
    width: 76,
    height: 30,
  },
  { name: "Warner Records", file: "warner-records", width: 95, height: 24 },
  { name: "Atlantic Records", file: "atlantic-records", width: 44, height: 30 },
  { name: "Rostrum Records", file: "rostrum-records", width: 77, height: 30 },
  { name: "Fat Beats", file: "fatbeats-records-white", width: 75, height: 30 },
];

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
        <Link className="sky-hero-pill" href="/skills">
          <span className="sky-hero-pill-badge">New</span>
          <span>Catalog Skills v2 is here</span>
          <SkyArrow />
        </Link>
        <h1 id="sky-title">
          AI transformation
          <br />
          <span>for music rightsholders</span>
        </h1>
        <p className="sky-hero-description">
          We build AI systems you own and train your team to use them.
        </p>
      </div>

      <SkyHeroCards />
      <section className="sky-proof" aria-label="Music companies using Recoup">
        <p data-reveal="">Used by teams at</p>
        <div data-reveal-group="">
          {customers.map((customer) => (
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
