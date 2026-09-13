import { SkyContent } from "./sky-content";
import { SkyHero } from "./sky-hero";
import "./sky.css";

export default function HomePage() {
  return (
    <div className="sky-page">
      <div className="sky-frame">
        <SkyHero />
        <SkyContent />
      </div>
    </div>
  );
}
