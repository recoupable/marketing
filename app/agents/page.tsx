import Link from 'next/link';
import { withPageMetadata } from '@/lib/seo';
import { PageButton, PageHero, PageSection } from '@/components/sky/page-ui';
import { agentToolDefinitions } from '@/lib/agent-tools/agentToolDefinitions';
import { searchAgentContent } from '@/lib/agent-content/searchAgentContent';
import { siteConfig } from "@/lib/config";
import './agents.css';

export const metadata = withPageMetadata({
  title: 'Recoup for agents: Website tools, API & MCP',
  description: 'Search Recoup, read the documentation, assess a workflow, and prepare a project brief. Public website tools and connections to the Recoup platform.',
  alternates: { canonical: '/agents', types: { 'text/markdown': '/agents.md' } },
});

const labels: Record<string, { title: string; description: string; href: string; linkLabel: string }> = {
  search_recoup: { title: 'Find the right information.', description: 'Search services, API guides, articles, and the music AI playbook. Every result links to its source.', href: '#search', linkLabel: 'Search Recoup' },
  read_recoup_page: { title: 'Read the source.', description: 'Get a focused text version with its page URL. Longer documents include a continuation point.', href: '/docs', linkLabel: 'Read the docs' },
  assess_workflow_readiness: { title: 'Choose a starting point.', description: 'Answer the same seven questions as our readiness check and get practical next steps.', href: '/audit', linkLabel: 'Open the readiness check' },
  estimate_workflow_roi: { title: 'Work through the numbers.', description: 'Calculate the value of team time using your assumptions, including setup and ongoing costs.', href: '/roi', linkLabel: 'Open the ROI planner' },
  prepare_project_brief: { title: 'Bring a useful brief.', description: 'Turn the workflow and desired outcome into an editable draft. You decide whether to send it.', href: '/contact', linkLabel: 'Prepare a project brief' },
};

export default async function AgentsPage({ searchParams }: { searchParams: Promise<{ query?: string | string[]; cursor?: string | string[] }> }) {
  const params = await searchParams;
  const query = typeof params.query === 'string' ? params.query : '';
  let results: Awaited<ReturnType<typeof searchAgentContent>> | null = null;
  let error = '';
  if (query) {
    try { results = await searchAgentContent({ query, limit: 5, cursor: typeof params.cursor === 'string' ? params.cursor : undefined }); }
    catch { error = 'Use a short search (up to 240 characters), then try again.'; }
  }
  return <div className="sky-subpage agents-page">
    <PageHero eyebrow="RECOUP FOR AGENTS" title={<>Bring your agent.<br /><span>Get somewhere useful.</span></>} description="Find the right service, read the source, and work out a practical next step. Your agent can use the same information and tools you do." tone="light">
      <PageButton href="/agents.md">Read the agent guide</PageButton><PageButton href="/docs/mcp" secondary>Connect to the platform</PageButton>
    </PageHero>
    <PageSection id="search" eyebrow="START WITH A QUESTION" title="What do you need to know?">
      <form action="/agents#search" method="get" className="agents-search">
        <label htmlFor="agent-search-query">Search Recoup</label>
        <div><input id="agent-search-query" name="query" type="search" defaultValue={query} required maxLength={240} placeholder="Try royalty reporting" /><button className="agent-primary-button" type="submit">Search →</button></div>
      </form>
      <p className="agents-search-examples">Try <Link href="/agents?query=royalty%20reporting#search">royalty reporting</Link>, <Link href="/agents?query=MCP#search">MCP setup</Link>, or <Link href="/agents?query=pricing#search">pricing</Link>.</p>
      {error && <p role="alert">{error}</p>}
      {results && <div className="agents-results"><p>{results.total} {results.total === 1 ? 'match' : 'matches'} for “{query}”</p>{results.results.map(item => <article key={item.id}><span>{item.type === 'docs' ? 'DOCUMENTATION' : item.type.toUpperCase()}</span><h3><Link href={`${new URL(item.url).pathname}${new URL(item.url).hash}`}>{item.title}</Link></h3><p>{item.excerpt}</p></article>)}{results.nextCursor && <Link className="sp-text-link" href={`/agents?${new URLSearchParams({ query, cursor: results.nextCursor })}#search`}>More results →</Link>}</div>}
    </PageSection>
    <PageSection eyebrow="WEBSITE TOOLS" title="From a question to a next step." description="Five tools are available through the public API and, in compatible browsers, WebMCP. No account is needed for these website tools.">
      <div className="agents-tools">{agentToolDefinitions.map(tool => <article key={tool.name}><div><h3>{labels[tool.name].title}</h3><p>{labels[tool.name].description}</p><Link href={labels[tool.name].href}>{labels[tool.name].linkLabel} →</Link></div><details><summary>{tool.name}</summary><pre>{JSON.stringify(tool.inputSchema, null, 2)}</pre></details></article>)}</div>
      <p className="agents-note">Briefs are drafts. Website tools don’t send inquiries, book calls, make purchases, or access your catalog. Platform actions use your separately authenticated Recoup account.</p>
    </PageSection>
    <PageSection eyebrow="FOR DEVELOPERS" title="One public interface. Multiple ways in.">
      <div className="agents-connections">
        <article><span className="sp-kicker">PUBLIC WEBSITE API</span><h3>Search without a browser.</h3><p>Plain HTTP and structured results. Use returned IDs to read content; use the continuation fields for longer results.</p><pre>{`curl --get '${siteConfig.url}/agent-api/v1/search' \\\n  --data-urlencode 'query=royalty reporting'`}</pre><Link href="/openapi.json">OpenAPI specification →</Link></article>
        <article><span className="sp-kicker">RECOUP PLATFORM</span><h3>Put your agent to work.</h3><p>Connect to the existing platform MCP with your API key to run authorized tasks in your Recoup account. Keep credentials in your agent’s secure configuration.</p><pre>https://api.recoupable.dev/mcp</pre><Link href="/docs/mcp">Authentication and setup →</Link></article>
      </div>
      <nav className="agents-resources" aria-label="Machine-readable Recoup resources"><Link href="/llms.txt">Quick index</Link><Link href="/agents/catalog.json">Content catalog</Link><Link href="/.well-known/api-catalog">API catalog</Link><Link href="/docs/api-reference">Platform API reference</Link><Link href="/skills">Recoup Skills</Link></nav>
    </PageSection>
  </div>;
}
