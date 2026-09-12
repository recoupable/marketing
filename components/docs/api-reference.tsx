import { SkyArrow } from '@/components/sky/arrow';
import Link from 'next/link';
import type { DocPage } from '@/lib/docs';
import { getDocSpec, resolveReference, buildCurl, type ApiObject } from '@/lib/docs-server';
import { DocsCode } from './docs-interactive';
import { DocDescription, DocInlineDescription } from './docs-content';
import { ApiPlayground } from './playground/api-playground';
import { summarizeOperation } from '@/lib/docs/playground/summarizeOperation';
import { siteConfig } from '@/lib/config';

function typeName(schema:ApiObject): string {
 if(schema.$ref)return schema.$ref.split('/').pop();
 if(Array.isArray(schema.type))return schema.type.join(' | ');
 if(schema.enum)return `${schema.type||'string'} · enum`;
 if(schema.type==='array')return `array<${typeName(schema.items||{})}>`;
 return schema.type|| (schema.properties?'object':schema.oneOf?'one of':schema.anyOf?'any of':schema.allOf?'all of':'any');
}
function Schema({value,spec,depth=0,seen=[]}:{value:ApiObject;spec:ApiObject;depth?:number;seen?:string[]}) {
 if(value.$ref && seen.includes(value.$ref))return <p className="docs-schema-cycle">Recursive type: <code>{value.$ref.split('/').pop()}</code>. See the full specification for this definition.</p>;
 const visited=value.$ref?[...seen,value.$ref]:seen;
 const schema=resolveReference(value,spec);
 const properties=Object.entries(schema.properties||{}) as [string,ApiObject][];
 return <div className="docs-schema">
  {!properties.length&&schema.required?.length>0&&<p className="docs-property-values">Required: {schema.required.join(', ')}</p>}
  {properties.map(([name,raw])=>{const prop=resolveReference(raw,spec);const nested=prop.properties||prop.items||prop.oneOf||prop.allOf||prop.anyOf;return <div className="docs-property" key={name}><div className="docs-property-heading"><code>{name}</code><span>{typeName(prop)}</span>{schema.required?.includes(name)&&<em>required</em>}{prop.nullable&&<span>nullable</span>}{prop.readOnly&&<span>read only</span>}</div><DocDescription text={prop.description}/>{prop.enum&&<p className="docs-property-values">Values: {prop.enum.map((item:unknown)=>JSON.stringify(item)).join(', ')}</p>}{prop.default!==undefined&&<p className="docs-property-values">Default: <code>{JSON.stringify(prop.default)}</code></p>}{['format','minimum','maximum','minLength','maxLength','pattern','minItems','maxItems'].some(key=>prop[key]!==undefined)&&<p className="docs-property-values">{['format','minimum','maximum','minLength','maxLength','pattern','minItems','maxItems'].filter(key=>prop[key]!==undefined).map(key=>`${key}: ${prop[key]}`).join(' · ')}</p>}{nested&&depth<12&&<details className="docs-schema-details"><summary>{prop.type==='array'?'Item properties':'Properties'}<span className="docs-sr-only"> for {name}</span></summary><Schema value={prop.items||raw} spec={spec} depth={depth+1} seen={visited}/></details>}</div>;})}
  {schema.items&&<Schema value={schema.items} spec={spec} depth={depth+1} seen={visited}/>}
  {(['oneOf','anyOf','allOf'] as const).map(kind=>schema[kind]?.map((variant:ApiObject,index:number)=><details className="docs-schema-details" key={`${kind}-${index}`}><summary>{kind} · {typeName(variant)} {index+1}</summary><DocDescription text={resolveReference(variant,spec).description}/><Schema value={variant} spec={spec} depth={depth+1} seen={visited}/></details>))}
  {!properties.length&&!schema.items&&!schema.oneOf&&!schema.anyOf&&!schema.allOf&&(!schema.required?.length||schema.type||schema.enum)&&<p className="docs-property-values"><code>{typeName(schema)}</code>{schema.enum?` · ${schema.enum.map((v:unknown)=>JSON.stringify(v)).join(', ')}`:''}</p>}
  {schema.additionalProperties&&<details className="docs-schema-details"><summary>Additional properties</summary>{typeof schema.additionalProperties==='object'?<Schema value={schema.additionalProperties} spec={spec} depth={depth+1} seen={visited}/>:<p>Additional keys are allowed.</p>}</details>}
 </div>;
}
function Examples({media,spec,label}:{media:ApiObject;spec:ApiObject;label:string}) {
 const examples=media.examples?Object.entries(media.examples).map(([name,raw])=>({name,...resolveReference(raw as ApiObject,spec)})):media.example!==undefined?[{name:label,value:media.example}]:[];
 return <>{examples.map((example:ApiObject)=><div key={example.name}><DocDescription text={example.summary||example.description}/>{example.value!==undefined&&<DocsCode language="json" label={example.name}>{typeof example.value==='string'?example.value:JSON.stringify(example.value,null,2)}</DocsCode>}{example.externalValue&&<Link href={example.externalValue}>View example</Link>}</div>)}</>;
}
export async function ApiReference({page}:{page:DocPage}) {
 if(!page.api?.spec)return null;
 const spec=await getDocSpec(page.api.spec);
 const pathItem=spec.paths[page.api.path]||{};
 const operation=pathItem[page.api.method.toLowerCase()];
 if(!operation)return <aside className="docs-callout docs-callout-warning"><span>Reference note</span><p>{page.gap}</p></aside>;
 const parameters=[...(pathItem.parameters||[]),...(operation.parameters||[])].map(param=>resolveReference(param,spec));
 const body=resolveReference(operation.requestBody,spec);
 const security=operation.security??spec.security;
 const request=buildCurl({method:page.api.method,endpoint:page.api.path,spec,operation,pathItem});
 return <div className="docs-api-content">
  <div className="docs-endpoint"><span className={`docs-method docs-method-${page.api.method.toLowerCase()}`}>{page.api.method}</span><code>{page.api.path}</code></div>
  <DocDescription text={operation.description}/>
  {operation.deprecated&&<aside className="docs-callout docs-callout-warning"><span>Deprecated</span><p>This endpoint is marked deprecated in the source specification.</p></aside>}
  <section id="authentication"><h2>Authentication</h2>{security?.length===0?<p>This endpoint does not require authentication.</p>:security?.length?<div>{security.map((item:ApiObject,index:number)=><div key={index}>{Object.entries(item).map(([name,scopes])=>{const scheme=spec.components?.securitySchemes?.[name]||{};return <p key={name}><code>{scheme.name||name}</code> {scheme.in?`in ${scheme.in}`:scheme.scheme||scheme.type||''}{Array.isArray(scopes)&&scopes.length?` · scopes: ${scopes.join(', ')}`:''}</p>;})}</div>)}</div>:<p>See the <Link href="/docs/authentication">authentication guide</Link> for API key and account access requirements.</p>}</section>
  <section id="request-example"><h2>Request</h2><DocsCode language="bash" label="cURL">{request}</DocsCode>{parameters.some(param=>param.in==='query'||param.in==='path')&&<p className="docs-small-note">Replace the YOUR_ placeholders with your values. Required query parameters are included; optional parameters are listed below.</p>}<ApiPlayground operation={summarizeOperation({method:page.api.method,path:page.api.path,spec})} baseUrl={siteConfig.apiUrl}/></section>
  {parameters.length>0&&<section id="parameters"><h2>Parameters</h2>{['path','query','header','cookie'].map(location=>{const list=parameters.filter(param=>param.in===location);return list.length?<div className="docs-parameter-group" key={location}><h3>{location.charAt(0).toUpperCase()+location.slice(1)} parameters</h3>{list.map(param=><div className="docs-property" key={param.name}><div className="docs-property-heading"><code>{param.name}</code><span>{typeName(param.schema||{})}</span>{param.required&&<em>required</em>}</div><DocDescription text={param.description}/>{param.schema?.enum&&<p className="docs-property-values">Values: {param.schema.enum.map((v:unknown)=>JSON.stringify(v)).join(', ')}</p>}{param.schema?.default!==undefined&&<p className="docs-property-values">Default: {JSON.stringify(param.schema.default)}</p>}{param.schema?.properties&&<Schema value={param.schema} spec={spec}/>}</div>)}</div>:null;})}</section>}
  {body.content&&<section id="request-body"><h2>Request body {body.required&&<span className="docs-required-label">required</span>}</h2><DocDescription text={body.description}/>{Object.entries(body.content).map(([format,media])=><div key={format}><p className="docs-media-type">{format}</p>{(media as ApiObject).schema&&<Schema value={(media as ApiObject).schema} spec={spec}/>}<Examples media={media as ApiObject} spec={spec} label="Request example"/></div>)}</section>}
  <section id="responses"><h2>Responses</h2><div className="docs-responses">{Object.entries(operation.responses||{}).map(([status,raw])=>{const response=resolveReference(raw as ApiObject,spec);return <details key={status} open={status.startsWith('2')}><summary><span className={`docs-status ${status.startsWith('2')?'docs-status-success':''}`}>{status}</span><span><DocInlineDescription text={response.description?.split('\n')[0]||'Response'}/></span><i aria-hidden="true">+</i></summary><div className="docs-response-body"><DocDescription text={response.description?.includes('\n')?response.description:undefined}/>{Object.entries(response.headers||{}).map(([name,value])=><div key={name} className="docs-property"><div className="docs-property-heading"><code>{name}</code><span>response header</span></div><DocDescription text={resolveReference(value as ApiObject,spec).description}/></div>)}{Object.entries(response.content||{}).map(([format,media])=><div key={format}><p className="docs-media-type">{format}</p>{(media as ApiObject).schema&&<Schema value={(media as ApiObject).schema} spec={spec}/>}<Examples media={media as ApiObject} spec={spec} label={`${status} example`}/></div>)}{!response.content&&<p className="docs-small-note">No response body schema is specified.</p>}</div></details>;})}</div></section>
  <section id="specification" className="docs-specification"><h2>Full specification</h2><p>Download the OpenAPI file for complete schemas, constraints, and examples.</p><Link href={`/docs/spec/${page.api.spec}`} download>Download {page.api.spec} <span aria-hidden="true"><SkyArrow direction="down" /></span></Link><details><summary>View operation source</summary><DocsCode language="json">{JSON.stringify(operation,null,2)}</DocsCode></details></section>
 </div>;
}
