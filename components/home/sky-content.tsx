import "./sky-content.css";
import { SkyStatement } from "./sky-statement";
import { SkyPartnership, SkyServices } from "./sky-partnership";
import { SkyOwnership } from "./sky-ownership";
import "./sky-narrative.css";
import { SkySoftwareStrip } from "./sky-tools";
import { SkyEngagements } from "./sky-engagements";
import { SkyClosing } from "./sky-closing";
import { HomeCaseStudies } from "@/components/case-studies/home-case-studies";

export function SkyContent({ includeStatement = true }: { includeStatement?: boolean }) {
  return (
    <div className="sky-content">
      {includeStatement && <SkyStatement />}
      <SkyServices />
      <HomeCaseStudies />
      <SkyPartnership />
      <SkyOwnership />
      <SkyEngagements />
      <SkySoftwareStrip />
      <SkyClosing />
    </div>
  );
}
