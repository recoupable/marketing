import type { Metadata } from "next";
import { withPageMetadata } from "@/lib/seo";
import { ServiceStructuredData } from "@/components/service-structured-data";
import { PageHero, PageSection, PageButton, PageCTA } from "@/components/sky/page-ui";
import { FAQ } from "@/components/ui";
import { trainingCopy } from "@/lib/copy/training";
import "./training.css";

export const metadata: Metadata = withPageMetadata({ title: trainingCopy.title, description: trainingCopy.description, alternates: { canonical: "/training" } });

export default function TrainingPage() {
  return <div className="sky-subpage training-page">
    <ServiceStructuredData path="/training" name={trainingCopy.title} description={trainingCopy.description} serviceType={["AI team training", "Workflow training", "AI adoption"]} />
    <PageHero eyebrow="TRAINING" title={<>{trainingCopy.hero.title[0]}<br /><span>{trainingCopy.hero.title[1]}</span></>} description={trainingCopy.hero.description} visual={
      <div className="training-scene" aria-hidden="true">
        <div className="training-session"><span>WORKING SESSION</span><strong>From release brief<br />to campaign plan.</strong><div className="training-context"><span>Artist notes</span><span>Release brief</span></div><ol><li>Give the agent context.</li><li>Review the first draft.</li><li>Refine and save the method.</li></ol><div className="training-people"><span>AR</span><span>MK</span><span>OP</span><p>Your team, working together.</p></div></div>
        <div className="training-playbook"><span>✓</span><div><strong>A workflow you can repeat.</strong><p>Context. Instructions. Review.</p></div></div>
      </div>
    }><PageButton href={trainingCopy.href}>{trainingCopy.action}</PageButton></PageHero>
    <PageSection title="Learn it on your work. Use it in your week." className="training-outcomes">
      <div className="training-outcome-grid" data-reveal-group="">{trainingCopy.outcomes.map((item,index) => <article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </PageSection>
    <PageSection className="training-format"><div className="training-format-inner"><div data-reveal=""><h2>{trainingCopy.format.title}</h2><p>{trainingCopy.format.description}</p></div><ol data-reveal-group="">{trainingCopy.format.steps.map((step,index) => <li key={step}><span>0{index+1}</span>{step}</li>)}</ol></div></PageSection>
    <PageSection title="Before your first session."><FAQ items={trainingCopy.faq} /></PageSection>
    <PageCTA title="What should your team be able to do with AI?" description="Tell us who’s learning, what tools you use, and which tasks you want to improve." href={trainingCopy.href} label={trainingCopy.action} />
  </div>;
}
