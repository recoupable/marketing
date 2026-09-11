import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { CopyCode } from "@/components/interactive";
import { PageButton } from "@/components/sky/page-ui";
import { PrintPlaybook } from "../playbook-print";
import chapters from "../../../content/playbook/chapters.json";
import "../playbook.css";
export const metadata: Metadata = withPageMetadata({title:"Read the AI Music Marketing Playbook",description:"Seven practical chapters on using AI for music marketing, with prompts, release planning, and workflows your team can reuse.",alternates:{canonical:"/playbook/download"}});
type ChapterSection = { heading: string; paragraphs?: string[]; items?: string[]; steps?: string[]; prompts?: { label: string; text: string }[] };
const playbookChapters: {number:string;slug:string;title:string;description:string;sections:ChapterSection[]}[] = chapters;

export default function PlaybookReader() {
 return <div className="playbook-reader"><header className="playbook-reader-heading"><Link href="/playbook">← The Recoup playbook</Link><p className="sp-kicker">A PRACTICAL GUIDE / SEVEN CHAPTERS</p><h1>The AI Music<br />Marketing Playbook.</h1><p>Choose a task. Give it context. Review the work. Repeat what helps.</p><div className="playbook-reader-actions"><PrintPlaybook /><a href="/playbook/recoup-ai-music-playbook.md" download>Download Markdown</a></div></header>
 <div className="playbook-reader-layout"><aside><nav aria-label="Playbook chapters">{playbookChapters.map(chapter=><a href={`#${chapter.slug}`} key={chapter.slug}><span>{chapter.number}</span>{chapter.title}</a>)}</nav></aside><article>{playbookChapters.map(chapter=><section id={chapter.slug} key={chapter.slug} className="playbook-chapter"><p className="sp-kicker">CHAPTER {chapter.number}</p><h2>{chapter.title}</h2><p className="playbook-chapter-deck">{chapter.description}</p>{chapter.sections.map(section=><div key={section.heading} className="playbook-section"><h3>{section.heading}</h3>{section.paragraphs?.map(text=><p key={text}>{text}</p>)}{section.items && <ul>{section.items.map(text=><li key={text}>{text}</li>)}</ul>}{section.steps && <ol>{section.steps.map(text=><li key={text}>{text}</li>)}</ol>}{section.prompts?.map(prompt=><CopyCode key={prompt.label} code={prompt.text} label={prompt.label} />)}</div>)}</section>)}<div className="playbook-reader-cta"><h2>Put a workflow to work.</h2><p>Get the playbooks for your agent, or build a system with Recoup.</p><div><PageButton href="/skills">Explore Skills</PageButton><PageButton href="/start-project" secondary>Get a Free Audit</PageButton></div></div></article></div></div>;
}
