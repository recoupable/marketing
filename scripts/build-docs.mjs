import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import { docsHeadingPlugin } from './docs-headings.ts';

// content/docs/source is the only input. `--out <dir>` redirects the generated
// files (default content/docs) so a test can compare a fresh build against the committed set.
const outFlag = process.argv.indexOf('--out');
const outPath = outFlag === -1 ? 'content/docs' : process.argv[outFlag + 1];
if (!outPath || outPath.startsWith('--')) throw new Error('Usage: node scripts/build-docs.mjs [--out <dir>]');
const destination = path.resolve(outPath);
const snapshot = path.resolve('content/docs/source');
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => entry.isDirectory() ? filesIn(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
await mkdir(destination, { recursive: true });
const config = JSON.parse(await readFile(path.join(snapshot, 'docs.json'), 'utf8'));
const specs = {};
for (const file of await filesIn(path.join(snapshot, 'api-reference/openapi'))) {
  if (file.endsWith('.json')) specs[path.basename(file)] = JSON.parse(await readFile(file, 'utf8'));
}
const nav = config.navigation.tabs;
const pages = [];
const gaps = [];
const allowed = new Set(['Card', 'CardGroup', 'CodeGroup', 'Info', 'Note', 'Tip', 'Warning']);
function inspectMdx() {
  return function walk(tree) {
    function visit(node) {
      if (['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression'].includes(node.type)) throw new Error('Executable MDX is not allowed in documentation.');
      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        if (!allowed.has(node.name)) throw new Error(`Unsupported documentation component ${node.name}`);
        for (const attr of node.attributes || []) {
          if (attr.type !== 'mdxJsxAttribute') throw new Error('MDX spread attributes are not allowed.');
          if (attr.value && typeof attr.value === 'object') {
            if (node.name !== 'CardGroup' || attr.name !== 'cols' || !/^\d+$/.test(attr.value.value)) throw new Error('Executable MDX attributes are not allowed.');
            attr.value = attr.value.value;
          }
        }
      }
      for (const child of node.children || []) visit(child);
    }
    visit(tree);
  };
}
for (const tab of nav) for (const group of tab.groups) for (const slug of group.pages) {
  const raw = await readFile(path.join(snapshot, `${slug}.mdx`), 'utf8');
  const [,frontmatter='',body=''] = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/) || [];
  const meta = {};
  for (const line of frontmatter.split('\n')) {
    const match=line.match(/^(\w+):\s*(.*)$/); if(match) meta[match[1]]=match[2].replace(/^(['"])([\s\S]*)\1$/, '$2');
  }
  const entry={slug:slug==='index'?'':slug, title:meta.title || slug, description:meta.description || '', category:tab.tab, group:group.group, source:`${slug}.mdx`, body, headings:[]};
  if (body.trim()) {
    let normalized = body.replace(/https:\/\/github.com\/sweetmantech\/docs\/blob\/main\/api-reference\/openapi.json/g, '/docs/api-reference');
    // Links remain source-authored. Prefixing happens in the rendering component.
    const compiled=await compile(normalized,{outputFormat:'function-body',remarkPlugins:[remarkGfm,inspectMdx,docsHeadingPlugin(entry.headings)],development:false});
    entry.compiled=String(compiled);
  }
  if (meta.openapi) {
    const parsed=meta.openapi.match(/(?:(\S+\.json)\s+)?(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s+(\S+)/i);
    if(!parsed) throw new Error(`Invalid OpenAPI pointer ${slug}: ${meta.openapi}`);
    const method=parsed[2].toLowerCase(), endpoint=parsed[3];
    let specName=parsed[1] ? path.basename(parsed[1]) : Object.keys(specs).find(name=>specs[name].paths?.[endpoint]?.[method]);
    let operation=specs[specName]?.paths?.[endpoint]?.[method];
    if(!operation && endpoint.endsWith('/')) { operation=specs[specName]?.paths?.[endpoint.slice(0,-1)]?.[method]; if(operation) gaps.push({slug,note:`Trailing-slash source pointer resolved to ${endpoint.slice(0,-1)}`}); }
    entry.api={method:parsed[2].toUpperCase(),path:operation && !specs[specName]?.paths?.[endpoint]?.[method]?endpoint.slice(0,-1):endpoint,spec:specName||null};
    if(!operation) {entry.gap='The source documentation names this endpoint, but its operation is missing from the supplied OpenAPI specification. Contact support for the current request and response contract.';gaps.push({slug,note:entry.gap});}
    entry.description=entry.description || operation?.summary || operation?.description?.split('\n')[0] || '';
  }
  entry.searchText=`${entry.title} ${entry.description} ${entry.category} ${entry.group} ${entry.api?.method || ''} ${entry.api?.path || ''} ${body.replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')}`;
  pages.push(entry);
}
const additionalTitles={
 '/api/music/compose':'Compose music',
 '/api/music/compose-detailed':'Compose detailed music',
 '/api/music/stream':'Stream music',
 '/api/music/plan':'Create a composition plan',
 '/api/music/video-to-music':'Create music from video',
 '/api/music/stem-separation':'Separate audio stems',
};
const specOperations=[];
for(const [name,spec] of Object.entries(specs)) for(const [endpoint,item] of Object.entries(spec.paths)) for(const [method,operation] of Object.entries(item)) {
 if(!['get','post','put','patch','delete','head','options'].includes(method))continue;
 if(pages.some(p=>p.api?.spec===name && p.api.path===endpoint && p.api.method===method.toUpperCase()))continue;
 const slug=`api-reference/complete/${name.replace('.json','')}/${method}-${endpoint.replace(/^\/api\//,'').replace(/[^\w-]+/g,'-').replace(/-$/,'')}`;
 pages.push({slug,title:operation.summary||additionalTitles[endpoint]||`${method.toUpperCase()} ${endpoint}`,description:operation.description?.split('\n')[0]||'',category:'Additional endpoints',group:name.replace('.json',''),source:`api-reference/openapi/${name}`,body:'',headings:[],api:{method:method.toUpperCase(),path:endpoint,spec:name},searchText:`${method.toUpperCase()} ${endpoint} ${operation.summary||''} ${operation.description||''}`});
 specOperations.push(slug);
}
const inventory={navigationPages:nav.flatMap(t=>t.groups.flatMap(g=>g.pages)).length,guidePages:pages.filter(p=>!p.api).length,apiPages:pages.filter(p=>p.api).length,specifications:Object.keys(specs),additionalOperations:specOperations,gaps};
await writeFile(path.join(destination,'manifest.json'),JSON.stringify(pages));
await writeFile(path.join(destination,'navigation.json'),JSON.stringify(nav,null,2));
await writeFile(path.join(destination,'inventory.json'),JSON.stringify(inventory,null,2));
console.log(JSON.stringify(inventory,null,2));
