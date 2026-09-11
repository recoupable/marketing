import { readFile } from 'node:fs/promises';
import { cache } from 'react';
import path from 'node:path';

// OpenAPI is intentionally open-ended; the full source remains downloadable, including vendor extensions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiObject = Record<string, any>;
export const getDocSpec = cache(async (name: string): Promise<ApiObject> => {
 if(!/^[a-z-]+\.json$/.test(name))throw new Error('Invalid specification name');
 return JSON.parse(await readFile(path.join(process.cwd(),'content/docs/source/api-reference/openapi',name),'utf8'));
});
export function resolveReference(value:ApiObject|undefined,spec:ApiObject):ApiObject {
 if(!value)return {};
 if(!value.$ref)return value;
 if(!value.$ref.startsWith('#/'))return value;
 let resolved:ApiObject=spec;
 for(const part of value.$ref.slice(2).split('/'))resolved=resolved?.[part.replace(/~1/g,'/').replace(/~0/g,'~')];
 return resolved ? {...resolved,...Object.fromEntries(Object.entries(value).filter(([key])=>key!=='$ref'))}:value;
}
export function schemaExample(schema:ApiObject,spec:ApiObject,depth=0):unknown {
 if(depth>5)return undefined;
 schema=resolveReference(schema,spec);
 if(schema.example!==undefined)return schema.example;
 if(schema.default!==undefined)return schema.default;
 if(schema.enum)return schema.enum[0];
 if(schema.oneOf||schema.anyOf)return schemaExample((schema.oneOf||schema.anyOf)[0],spec,depth+1);
 if(schema.allOf)return Object.assign({},...schema.allOf.map((item:ApiObject)=>schemaExample(item,spec,depth+1)));
 if(schema.type==='object'||schema.properties)return Object.fromEntries(Object.entries(schema.properties||{}).filter(([key])=>!schema.required||schema.required.includes(key)).map(([key,value])=>[key,schemaExample(value as ApiObject,spec,depth+1)]));
 if(schema.type==='array')return [schemaExample(schema.items||{},spec,depth+1)];
 if(schema.type==='boolean')return true;
 if(schema.type==='integer'||schema.type==='number')return schema.minimum??0;
 if(schema.format==='uuid')return 'YOUR_ID';
 return schema.type==='string'?'string':undefined;
}

function shellQuote(value:string) { return `'${value.replace(/'/g, `'"'"'`)}'`; }
export function buildCurl({method,endpoint,spec,operation,pathItem={}}:{method:string;endpoint:string;spec:ApiObject;operation:ApiObject;pathItem?:ApiObject}):string {
 const parameters=[...(pathItem.parameters||[]),...(operation.parameters||[])].map(parameter=>resolveReference(parameter,spec));
 const base=(operation.servers||pathItem.servers||spec.servers)?.[0]?.url||'https://api.recoupable.dev';
 const route=endpoint.replace(/\{([^}]+)\}/g,(_match,name)=>`YOUR_${name.replace(/([a-z])([A-Z])/g,'$1_$2').toUpperCase()}`);
 const query=new URLSearchParams();
 for(const parameter of parameters.filter(parameter=>parameter.in==='query'&&parameter.required)) {
  const value=parameter.example??parameter.schema?.example??parameter.schema?.default??`YOUR_${parameter.name.toUpperCase()}`;
  query.append(parameter.name,typeof value==='object'?JSON.stringify(value):String(value));
 }
 const lines=[`curl --request ${method}`,`  --url ${shellQuote(base+route+(query.size?`?${query}`:''))}`];
 const security=operation.security??spec.security;
 const scheme=security?.length?spec.components?.securitySchemes?.[Object.keys(security[0])[0]]:undefined;
 if(security?.length!==0)lines.push(`  --header ${shellQuote(scheme?.scheme==='bearer'?'Authorization: Bearer YOUR_TOKEN':`${scheme?.name||'x-api-key'}: YOUR_API_KEY`)}`);
 for(const parameter of parameters.filter(parameter=>parameter.in==='header'&&parameter.required&&parameter.name!==scheme?.name&&parameter.name.toLowerCase()!=='x-api-key'))lines.push(`  --header ${shellQuote(`${parameter.name}: ${parameter.example??parameter.schema?.example??'YOUR_VALUE'}`)}`);
 const body=resolveReference(operation.requestBody,spec);
 const mediaType=body.content?.['application/json']?'application/json':Object.keys(body.content||{})[0];
 const media=body.content?.[mediaType];
 const schema=resolveReference(media?.schema,spec);
 const example=media?.example??(media?.examples?resolveReference(Object.values(media.examples)[0] as ApiObject,spec).value:undefined)??(media?.schema?schemaExample(media.schema,spec):undefined);
 if(mediaType==='multipart/form-data'||mediaType==='application/x-www-form-urlencoded') {
  for(const [name,raw] of Object.entries(schema.properties||{})) {
   if(schema.required&&!schema.required.includes(name))continue;
   const property=resolveReference(raw as ApiObject,spec);
   const value=property.format==='binary'||property.items?.format==='binary'?'@YOUR_FILE_PATH':(example as ApiObject)?.[name]??schemaExample(property,spec)??'YOUR_VALUE';
   lines.push(`  ${mediaType==='multipart/form-data'?'--form':'--data-urlencode'} ${shellQuote(`${name}=${typeof value==='object'?JSON.stringify(value):String(value)}`)}`);
  }
 } else if(mediaType) {
  lines.push(`  --header ${shellQuote(`Content-Type: ${mediaType}`)}`);
  if(example!==undefined)lines.push(`  --data ${shellQuote(typeof example==='string'?example:JSON.stringify(example,null,2))}`);
 }
 return lines.join(' \\\n');
}
