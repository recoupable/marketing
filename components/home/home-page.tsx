import Image from "next/image";
import { SkyContent } from "./sky-content";
import { SkyHeroCards } from "./sky-hero-cards";
import { SkyNavigation } from "./sky-navigation";
import "./sky.css";

function RecoupMark() {
  return <svg viewBox="48 41 127 141" fill="none" aria-hidden="true"><path d="M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z" fill="currentColor" /></svg>;
}

const customers = [
  { name: "Duetti", file: "duetti", width: 122, height: 19 },
  { name: "Seeker Music", file: "seeker-music", width: 121, height: 35 },
  { name: "Atlantic Records", file: "atlantic-records", width: 52, height: 36 },
  { name: "Warner Records", file: "warner-records", width: 112, height: 28 },
  { name: "Rostrum Records", file: "rostrum-records", width: 91, height: 36 },
  { name: "Fat Beats", file: "fatbeats-records", width: 88, height: 36 },
];

export default function HomePage() {
  return (
    <div className="sky-page" id="sky-home">
      <div className="sky-frame">
        <section className="sky-hero" aria-labelledby="sky-title">
          <Image className="sky-hero-image" src="/images/sky/hero-sky.webp" alt="" fill sizes="(max-width: 800px) 100vw, 92vw" preload />
          <div className="sky-hero-shade" />
          <SkyNavigation mark={<RecoupMark />} />

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

        <SkyContent />
      </div>
    </div>
  );
}
