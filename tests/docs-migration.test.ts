import { readFileSync } from 'node:fs';
import { test, expect } from 'vitest';
const { buildCurl, resolveReference }: typeof import('../lib/docs-server') = await import(new URL('../lib/docs-server.ts',import.meta.url).href);
const { resolveDocsHref }: typeof import('../lib/docs-paths') = await import(new URL('../lib/docs-paths.ts',import.meta.url).href);
const pages=JSON.parse(readFileSync(new URL('../content/docs/manifest.json',import.meta.url),'utf8'));
const inventory=JSON.parse(readFileSync(new URL('../content/docs/inventory.json',import.meta.url),'utf8'));
const config=JSON.parse(readFileSync(new URL('../content/docs/source/docs.json',import.meta.url),'utf8'));
const specs=Object.fromEntries(inventory.specifications.map((name:string)=>[name,JSON.parse(readFileSync(new URL(`../content/docs/source/api-reference/openapi/${name}`,import.meta.url),'utf8'))]));

test('documentation migration covers every navigation page and every supplied API operation',()=>{
 expect(pages.length).toBe(186);
 expect(new Set(pages.map((page:{slug:string})=>page.slug)).size).toBe(pages.length);
 const navPages=config.navigation.tabs.flatMap((tab:{groups:{pages:string[]}[]})=>tab.groups.flatMap(group=>group.pages));
 expect(navPages.length).toBe(180);
 for(const slug of navPages)expect(pages.some((page:{slug:string})=>page.slug===(slug==='index'?'':slug)), `Missing nav page ${slug}`).toBeTruthy();
 for(const [name,spec] of Object.entries(specs))for(const [endpoint,path] of Object.entries(spec.paths))for(const method of Object.keys(path as object)) {
  if(!['get','post','put','patch','delete','head','options'].includes(method))continue;
  expect(pages.some((page:{api?:{spec:string;path:string;method:string}})=>page.api?.spec===name&&page.api.path===endpoint&&page.api.method===method.toUpperCase()), `Missing operation ${name}: ${method} ${endpoint}`).toBeTruthy();
 }
});

test('documentation guide links resolve locally, including repaired legacy URLs',()=>{
 const valid=new Set(['/pricing','/docs','/docs/api-reference',...pages.map((page:{slug:string})=>`/docs/${page.slug}`)]);
 for(const page of pages)for(const [,url] of page.body.matchAll(/(?:href="|\]\()(\/[^"\s)]+)/g))expect(valid.has(resolveDocsHref(url).split('#')[0]), `Broken docs link ${page.slug}: ${url}`).toBeTruthy();
 expect(resolveDocsHref('/api-reference/sandboxes/file#request')).toBe('/docs/api-reference/sandboxes/get-file#request');
 expect(resolveDocsHref('https://docs.recoupable.dev/quickstart#your-first-request')).toBe('/docs/quickstart#your-first-request');
 expect(resolveDocsHref('/pricing#usage')).toBe('/pricing#usage');
 expect(resolveDocsHref('/pricing?billing=annual#plans')).toBe('/pricing?billing=annual#plans');
});

test('all imported OpenAPI references resolve within the independent snapshot',()=>{
 let count=0;
 for(const [name,spec] of Object.entries(specs)) {
  const visit=(value:unknown)=>{if(Array.isArray(value))return value.forEach(visit);if(value&&typeof value==='object'){const obj=value as Record<string,unknown>;if(typeof obj.$ref==='string'){expect(obj.$ref.startsWith('#/')).toBeTruthy();expect(!resolveReference(obj,spec).$ref, `Unresolved ${name}: ${obj.$ref}`).toBeTruthy();count++;}Object.values(obj).forEach(visit);}};visit(spec);
 }
 expect(count>100).toBeTruthy();
});

test('multipart music requests use form file uploads, not JSON',()=>{
 const spec=specs['content.json'];
 for(const endpoint of ['/api/music/video-to-music','/api/music/stem-separation']) {
  const curl=buildCurl({method:'POST',endpoint,spec,operation:spec.paths[endpoint].post});
  expect(curl).toMatch(/--form '[^']+=@YOUR_FILE_PATH'/);expect(!curl.includes('--data ')).toBeTruthy();expect(!curl.includes('Content-Type: application/json')).toBeTruthy();
 }
});

test('request examples replace path values, encode required query values, and respect authentication',()=>{
 const spec={servers:[{url:'https://api.recoupable.dev'}],components:{securitySchemes:{token:{type:'http',scheme:'bearer'}}}};
 const operation={security:[{token:[]}],parameters:[{name:'q',in:'query',required:true,example:'song & artist'},{name:'optional',in:'query',required:false}]};
 const curl=buildCurl({method:'GET',endpoint:'/api/artists/{artistId}',spec,operation});
 expect(curl).toMatch(/YOUR_ARTIST_ID\?q=song\+%26\+artist/);expect(curl).toMatch(/Authorization: Bearer YOUR_TOKEN/);expect(!curl.includes('optional')).toBeTruthy();
 const anonymous=buildCurl({method:'POST',endpoint:'/api/agents/signup',spec:specs['accounts.json'],operation:{security:[]}});expect(!anonymous.includes('--header')).toBeTruthy();
 const json=buildCurl({method:'POST',endpoint:'/api/artists',spec,operation:{security:[],requestBody:{content:{'application/json':{example:{name:"Artist's catalog"}}}}}});expect(json).toMatch(/Artist'"'"'s catalog/);
});
