import Image from "next/image";
import { SkyHeroCards } from "./sky-hero-cards";

const customers = [
  { name: "Duetti", file: "duetti", width: 112, height: 18 },
  { name: "Seeker Music", file: "seeker-music", width: 114, height: 33 },
  { name: "Atlantic Records", file: "atlantic-records", width: 54, height: 37 },
  { name: "Warner Records", file: "warner-records", width: 108, height: 27 },
  { name: "Rostrum Records", file: "rostrum-records", width: 84, height: 33 },
  { name: "Fat Beats", file: "fatbeats-records-white", width: 88, height: 36 },
];

export function SkyHero() {
  return (
        <section className="sky-hero" aria-labelledby="sky-title">
          <Image className="sky-hero-image" src="/images/sky/hero-sky.webp" alt="" fill sizes="(max-width: 800px) 100vw, 92vw" preload />
          <div className="sky-hero-shade" />

          <div className="sky-hero-copy">
            <p className="sky-hero-pill">
              <svg className="sky-hero-pill-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.75 10A5.25 5.25 0 0 1 10 4.75M15.25 10A5.25 5.25 0 0 1 10 15.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>For music funds &amp; rightsholders</span>
            </p>
            <h1 id="sky-title">Put AI to work across<br /><span>your music business.</span></h1>
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
