import { SkyArrow } from "@/components/sky/arrow";
import { AppLink } from "./AppLink";

type AppPageCtaProps = { title: string; description: string; placement: string; label: string };

/** The closing page CTA whose button opens the app with the visitor's attribution and reports the click. */
export function AppPageCta({ title, description, placement, label }: AppPageCtaProps) {
  return (
    <section className="sp-cta">
      <div data-reveal="">
        <p className="sp-kicker">LET’S PUT AI TO WORK</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <AppLink placement={placement} className="sp-button">{label}<span><SkyArrow /></span></AppLink>
      </div>
    </section>
  );
}
