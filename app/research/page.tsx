import { withPageMetadata } from "@/lib/seo";
import { ResearchSignup } from "@/components/research/ResearchSignup";
import "./research.css";

export const metadata = withPageMetadata({
  title: "Recoup Research",
  description: "Music, media and AI—news, ideas and the latest from Recoup, delivered to your inbox.",
  alternates: { canonical: "/research" },
});

export default function ResearchPage() {
  return <main id="main" className="research-page">
    <div className="research-orbit" aria-hidden="true" />
    <section className="research-content" aria-labelledby="research-title">
      <p className="research-kicker">A NEWSLETTER BY RECOUP</p>
      <h1 id="research-title">Recoup<br /><span>Research.</span></h1>
      <p className="research-intro">Music, media and AI—news, ideas and the latest from Recoup, delivered to your inbox.</p>
      <ResearchSignup />
    </section>
    <div className="research-bottom" aria-hidden="true"><span>MUSIC / MEDIA / AI</span><span>STAY CURIOUS. ↗</span></div>
  </main>;
}
