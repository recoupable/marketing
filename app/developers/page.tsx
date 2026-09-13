import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { CopyCode } from "@/components/interactive";
import { PageButton, PageCTA, PageHero, PageSection } from "@/components/sky/page-ui";
import { site } from "@/lib/site";
import { SkyArrow } from "@/components/sky/arrow";
import "./developers-sky.css";

export const metadata: Metadata = withPageMetadata({
  title: "Developers: Music APIs, MCP & agent tools",
  description: "Build music-native applications and agents with the Recoup REST API, MCP server, CLI, and open-source Skills. Artist context, research, content, and catalogs.",
  alternates: { canonical: "/developers" },
});

const firstRequest = [
  "curl --request GET \\",
  "  --url 'https://api.recoupable.dev/api/artists' \\",
  '  --header "x-api-key: $RECOUP_API_KEY"',
].join("\n");

const interfaces = [
  { name: "REST API", icon: "api", description: "Put artist context, research, and music-business actions inside your application.", href: site.docs, link: "Read the API docs" },
  { name: "MCP", icon: "mcp", description: "Give compatible AI clients access to Recoup’s music-native tools.", href: `${site.docs}/mcp`, link: "Connect your agent" },
  { name: "CLI", icon: "cli", description: "Work from your terminal and bring structured output into your automations.", href: `${site.docs}/cli`, link: "Explore the CLI" },
  { name: "Skills", icon: "skills", description: "Add complete methods for music-industry jobs to an agent’s toolkit.", href: "/skills", link: "Explore Recoup Skills" },
] as const;

function DeveloperIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "api" ? <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" /> : type === "mcp" ? <path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" /> : type === "cli" ? <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m6 9 3 3-3 3M13 15h5" /></> : <><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></>}
  </svg>;
}

function FirstRequest() {
  return <div className="developer-request">
    <div className="developer-terminal">
      <div className="developer-terminal-bar"><span className="developer-terminal-dots" aria-hidden="true"><i /><i /><i /></span><span>recoup / quickstart</span><span className="developer-terminal-method">GET</span></div>
      <CopyCode code={firstRequest} label="List artists · REST API" />
      <div className="developer-terminal-footer"><span>api.recoupable.dev</span><span>Bring your own interface.</span></div>
    </div>
    <div className="developer-request-note"><span className="developer-key-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="9" r="4" /><path d="m11 12 8 8M16 17l3-3M18 19l3-3" /></svg></span><p>Create an API key in your Recoup account and set <code>RECOUP_API_KEY</code> in your environment. This request returns the artists for your account.</p></div>
  </div>;
}

export default function DevelopersPage() {
  return <div className="sky-subpage developers-sky">
    <PageHero eyebrow="RECOUP FOR DEVELOPERS" title={<>Music tools.<br />Your stack.</>} description="Bring Recoup into your application, agent, or automation. Use the API, MCP server, CLI, and open-source Skills." tone="light" visual={<FirstRequest />}>
      <PageButton href={site.docs}>Read the documentation</PageButton>
      <PageButton href={`${site.app}/keys`} secondary>Get your API key</PageButton>
    </PageHero>

    <PageSection eyebrow="PICK YOUR ENTRY POINT" title="Build your way.">
      <div className="sp-grid developer-interfaces" data-reveal-group="">{interfaces.map((item) => <article className="sp-card developer-interface" key={item.name}>
        <span className="developer-interface-icon"><DeveloperIcon type={item.icon} /></span>
        <h3>{item.name}</h3><p>{item.description}</p><Link href={item.href} className="sp-text-link">{item.link}<SkyArrow /></Link>
      </article>)}</div>
      <div className="developer-utility-strip">
        <p><strong>Keep keys on the server.</strong> Set up access in your Recoup account.</p>
        <Link href="/pricing#usage">Usage &amp; pricing <SkyArrow /></Link>
        <Link href="/agents">Website tools for agents <SkyArrow /></Link>
      </div>
    </PageSection>

    <PageSection className="developer-catalog" eyebrow="THE BUILDING BLOCKS" title={<>Music context.<br />Useful actions.</>} description="Go straight to the capabilities your workflow needs. Each reference includes the request, parameters, and response.">
      <div className="developer-capability-index" data-reveal-group="">{[
        { title: "Artists & catalogs", description: "Artist profiles, songs, and the information around your roster.", href: "/docs/api-reference/artists/list", label: "Artist reference" },
        { title: "Research & analysis", description: "Web research and source material to inform the next decision.", href: "/docs/api-reference/research/web", label: "Research reference" },
        { title: "Content & media", description: "Image generation and campaign material inside your application.", href: "/docs/api-reference/content/generate-image", label: "Content reference" },
        { title: "Conversations", description: "Create chats, stream responses, and work with conversation history.", href: "/docs/api-reference/chat/create", label: "Chat reference" },
        { title: "Recurring work", description: "Set up tasks and inspect the results of recurring work.", href: "/docs/api-reference/tasks/create", label: "Task reference" },
        { title: "Connections", description: "Connect the services your workflow needs with authorized access.", href: "/docs/api-reference/connectors/list", label: "Connector reference" },
      ].map((item, index) => <Link className="developer-capability-row" href={item.href} key={item.href}>
        <span className="developer-index-number" aria-hidden="true">0{index + 1}</span>
        <div><h3>{item.title}</h3><p>{item.description}</p><span className="developer-index-label">{item.label}</span></div><SkyArrow />
      </Link>)}</div>
    </PageSection>

    <PageSection className="developer-open-source">
      <div className="developer-source-panel" data-reveal-group="">
        <div><p className="sp-kicker">OPEN SOURCE</p><h2>The tools.<br />And the playbooks.</h2><p>Recoup Skills shows how music-industry jobs can be broken into steps an agent can follow. Inspect the methods, adapt a workflow, and build on the collection.</p><PageButton href={site.github}>Explore the source</PageButton></div>
        <div className="developer-source-visual" aria-hidden="true"><span className="developer-source-asterisk"><DeveloperIcon type="skills" /></span><span>recoupable / skills</span><strong>Music expertise.<br /><span>Ready to build on.</span></strong><div><span>Read</span><span>Adapt</span><span>Build</span></div></div>
      </div>
    </PageSection>
    <PageCTA title="Building something music should have?" description="Bring us the idea, the integration, or the hard part. We can help you build it." />
  </div>;
}
