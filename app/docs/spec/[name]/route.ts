import { getDocSpec } from '@/lib/docs-server';
import inventory from '../../../../content/docs/inventory.json';
export function generateStaticParams(){return inventory.specifications.map(name=>({name}));}
export async function GET(_request:Request,{params}:{params:Promise<{name:string}>}) {
 const {name}=await params;
 if(!inventory.specifications.includes(name))return new Response('Specification not found',{status:404});
 const spec=await getDocSpec(name);
 return new Response(JSON.stringify(spec,null,2),{headers:{'Content-Type':'application/json; charset=utf-8','Content-Disposition':`attachment; filename="recoup-${name}"`}});
}
