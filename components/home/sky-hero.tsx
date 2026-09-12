import Image from "next/image";
import { SkyHeroCards } from "./sky-hero-cards";

const customers = [
  { name: "Duetti", file: "duetti", width: 122, height: 19 },
  { name: "Seeker Music", file: "seeker-music", width: 121, height: 35 },
  { name: "Atlantic Records", file: "atlantic-records", width: 52, height: 36 },
  { name: "Warner Records", file: "warner-records", width: 112, height: 28 },
  { name: "Rostrum Records", file: "rostrum-records", width: 91, height: 36 },
  { name: "Fat Beats", file: "fatbeats-records", width: 88, height: 36 },
];

export function SkyHero() {
  return (
        <section className="sky-hero" aria-labelledby="sky-title">
          <Image className="sky-hero-image" src="/images/sky/hero-sky.webp" alt="" fill sizes="(max-width: 800px) 100vw, 92vw" preload />
          <div className="sky-hero-shade" />

          <div className="sky-hero-copy">
            <p className="sky-hero-pill">Made for music funds and rightsholders</p>
            <h1 id="sky-title">AI transformation services<br /><span>for music funds and rightsholders</span></h1>
            <p className="sky-hero-description">We identify where AI can help, build working systems you own, and train your team to use them.</p>
          </div>

          <SkyHeroCards />
          <section className="sky-proof" aria-label="Music companies using Recoup">
            <p data-reveal="">Used by teams at</p>
            <div data-reveal-group="">
              {customers.map((customer) => (
                <Image key={customer.file} src={`/images/customers/${customer.file}-transparent.webp`} alt={customer.name} width={customer.width} height={customer.height} unoptimized />
              ))}
            </div>
          </section>
        </section>
  );
}
