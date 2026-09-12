import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const { buildCurl, resolveReference }: typeof import('../lib/docs-server') = await import(new URL('../lib/docs-server.ts',import.meta.url).href);
const { resolveDocsHref }: typeof import('../lib/docs-paths') = await import(new URL('../lib/docs-paths.ts',import.meta.url).href);
const pages=JSON.parse(readFileSync(new URL('../content/docs/manifest.json',import.meta.url),'utf8'));
const inventory=JSON.parse(readFileSync(new URL('../content/docs/inventory.json',import.meta.url),'utf8'));
const config=JSON.parse(readFileSync(new URL('../content/docs/source/docs.json',import.meta.url),'utf8'));
const specs=Object.fromEntries(inventory.specifications.map((name:string)=>[name,JSON.parse(readFileSync(new URL(`../content/docs/source/api-reference/openapi/${name}`,import.meta.url),'utf8'))]));

test('documentation migration covers every navigation page and every supplied API operation',()=>{
 assert.equal(pages.length,185);
 assert.equal(new Set(pages.map((page:{slug:string})=>page.slug)).size,pages.length);
 const navPages=config.navigation.tabs.flatMap((tab:{groups:{pages:string[]}[]})=>tab.groups.flatMap(group=>group.pages));
 assert.equal(navPages.length,179);
 for(const slug of navPages)assert.ok(pages.some((page:{slug:string})=>page.slug===(slug==='index'?'':slug)),`Missing nav page ${slug}`);
 for(const [name,spec] of Object.entries(specs))for(const [endpoint,path] of Object.entries(spec.paths))for(const method of Object.keys(path as object)) {
  if(!['get','post','put','patch','delete','head','options'].includes(method))continue;
  assert.ok(pages.some((page:{api?:{spec:string;path:string;method:string}})=>page.api?.spec===name&&page.api.path===endpoint&&page.api.method===method.toUpperCase()),`Missing operation ${name}: ${method} ${endpoint}`);
 }
});

test('documentation guide links resolve locally, including repaired legacy URLs',()=>{
 const valid=new Set(['/pricing','/docs','/docs/api-reference',...pages.map((page:{slug:string})=>`/docs/${page.slug}`)]);
 for(const page of pages)for(const [,url] of page.body.matchAll(/(?:href="|\]\()(\/[^"\s)]+)/g))assert.ok(valid.has(resolveDocsHref(url).split('#')[0]),`Broken docs link ${page.slug}: ${url}`);
 assert.equal(resolveDocsHref('/api-reference/sandboxes/file#request'),'/docs/api-reference/sandboxes/get-file#request');
 assert.equal(resolveDocsHref('https://docs.recoupable.dev/quickstart#your-first-request'),'/docs/quickstart#your-first-request');
 assert.equal(resolveDocsHref('/pricing#usage'),'/pricing#usage');
 assert.equal(resolveDocsHref('/pricing?billing=annual#plans'),'/pricing?billing=annual#plans');
});

test('all imported OpenAPI references resolve within the independent snapshot',()=>{
 let count=0;
 for(const [name,spec] of Object.entries(specs)) {
  const visit=(value:unknown)=>{if(Array.isArray(value))return value.forEach(visit);if(value&&typeof value==='object'){const obj=value as Record<string,unknown>;if(typeof obj.$ref==='string'){assert.ok(obj.$ref.startsWith('#/'));assert.ok(!resolveReference(obj,spec).$ref,`Unresolved ${name}: ${obj.$ref}`);count++;}Object.values(obj).forEach(visit);}};visit(spec);
 }
 assert.ok(count>100);
});

test('multipart music requests use form file uploads, not JSON',()=>{
 const spec=specs['content.json'];
 for(const endpoint of ['/api/music/video-to-music','/api/music/stem-separation']) {
  const curl=buildCurl({method:'POST',endpoint,spec,operation:spec.paths[endpoint].post});
  assert.match(curl,/--form '[^']+=@YOUR_FILE_PATH'/);assert.ok(!curl.includes('--data '));assert.ok(!curl.includes('Content-Type: application/json'));
 }
});

test('request examples replace path values, encode required query values, and respect authentication',()=>{
 const spec={servers:[{url:'https://api.recoupable.dev'}],components:{securitySchemes:{token:{type:'http',scheme:'bearer'}}}};
 const operation={security:[{token:[]}],parameters:[{name:'q',in:'query',required:true,example:'song & artist'},{name:'optional',in:'query',required:false}]};
 const curl=buildCurl({method:'GET',endpoint:'/api/artists/{artistId}',spec,operation});
 assert.match(curl,/YOUR_ARTIST_ID\?q=song\+%26\+artist/);assert.match(curl,/Authorization: Bearer YOUR_TOKEN/);assert.ok(!curl.includes('optional'));
 const anonymous=buildCurl({method:'POST',endpoint:'/api/agents/signup',spec:specs['accounts.json'],operation:{security:[]}});assert.ok(!anonymous.includes('--header'));
 const json=buildCurl({method:'POST',endpoint:'/api/artists',spec,operation:{security:[],requestBody:{content:{'application/json':{example:{name:"Artist's catalog"}}}}}});assert.match(json,/Artist'"'"'s catalog/);
});
