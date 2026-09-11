import { docs } from '@/lib/docs';
import { documentationAgentMarkdown } from '@/lib/agent-markdown';
import { absoluteUrl } from '@/lib/seo';
export async function GET(_request:Request,{params}:{params:Promise<{slug:string[]}>}) {
 const {slug}=await params;const key=slug.join('/').replace(/\.mdx?$/,'');
 const page=docs.find(item=>item.slug===(key==='index'?'':key));
 if(!page)return new Response('Documentation not found',{status:404});
 const text=await documentationAgentMarkdown(page);
 return new Response(text,{headers:{'Content-Type':'text/markdown; charset=utf-8','Link':`<${absoluteUrl(page.slug?`/docs/${page.slug}`:'/docs')}>; rel="canonical"`}});
}
