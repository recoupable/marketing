import { withPageMetadata } from "@/lib/seo";
import { SubscribeCard } from "@/components/marketing-migration/subscribe-card";
import type { Metadata } from "next";
import Link from "next/link";
import { PageButton, PageCTA, PageHero, PageSection } from "@/components/sky/page-ui";
import { PageMark } from "@/components/sky/brand";
import { SkyArrow } from "@/components/sky/arrow";
import chapters from "../../content/playbook/chapters.json";
import "./playbook.css";

export const metadata: Metadata = withPageMetadata({ title: "The AI Music Marketing Playbook", description: "A practical guide to artist context, content, audience research, release planning, and repeatable AI workflows for music teams.", alternates: { canonical: "/playbook" } });
export default function PlaybookPage() {
 return <div className="sky-subpage playbook-page">
  <PageHero eyebrow="THE RECOUP PLAYBOOK" title={<>Good music.<br />A plan to get it heard.</>} description="Practical workflows and prompts for the work around the music. Read the guide, choose a useful task, and make it your own." visual={<div className="playbook-cover" aria-hidden="true"><div><PageMark /><span>Recoup / Field notes</span></div><strong>The AI<br />Music Marketing<br /><em>Playbook.</em></strong><span>Context. Content. Release. Repeat.</span><div className="playbook-cover-bottom"><span>01–07</span><SkyArrow /></div></div>}>
   <PageButton href="/playbook/download">Read the playbook</PageButton><PageButton href="/playbook/recoup-ai-music-playbook.md" secondary>Download the guide</PageButton>
  </PageHero>
  <PageSection eyebrow="SEVEN CHAPTERS" title={<>From the first brief.<br />To the next release.</>} description="For artists, managers, and label teams who want a repeatable way to research, create, and coordinate.">
   <div className="playbook-chapter-list">{chapters.map(chapter=><Link key={chapter.slug} href={`/playbook/download#${chapter.slug}`}><span>{chapter.number}</span><div><h3>{chapter.title}</h3><p>{chapter.description}</p></div><SkyArrow /></Link>)}</div>
  </PageSection>
<SubscribeCard source="/playbook" />
  <PageCTA title="Build it around your team." description="Bring us the workflow you want to improve. We can help connect the information, build the system, and teach your team to run it." href="/build" label="Explore custom builds" />
 </div>;
}
