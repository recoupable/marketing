"""Refresh method/path and static MCP evidence. Run with --api PATH; no network or customer calls."""
from pathlib import Path
import argparse,hashlib,json,re,subprocess
parser=argparse.ArgumentParser();parser.add_argument('--api',required=True);parser.add_argument('--check',action='store_true');args=parser.parse_args()
api=Path(args.api).resolve();root=Path(__file__).resolve().parent.parent;source=root/'content/docs/source';out=root/'content/docs/contracts'
def sha(p):return subprocess.check_output(['git','-C',str(p),'rev-parse','HEAD'],text=True).strip()
docs={}
for p in (source/'api-reference/openapi').glob('*.json'):
 for route,ops in json.loads(p.read_text()).get('paths',{}).items():
  for method in ops:
   if method in ['get','post','put','patch','delete','head']:
    docs[method.upper()+' '+route.rstrip('/')]=str(p.relative_to(root))
dispositions=json.loads((out/'operation-dispositions.json').read_text());operations=[]
for p in sorted((api/'app/api').rglob('route.ts')):
 route='/api/'+str(p.parent.relative_to(api/'app/api'));route=re.sub(r'\[([^]]+)\]',r'{\1}',route).replace('/.','')
 methods = re.findall(r'export\s+(?:async\s+)?(?:function|const)\s+(GET|POST|PUT|PATCH|DELETE|HEAD)\b',p.read_text())
 for block in re.findall(r'export\s+(?:const\s+)?\{([^}]+)\}',p.read_text()):
  methods.extend(re.findall(r'\b(GET|POST|PUT|PATCH|DELETE|HEAD)\b', block))
 for method in sorted(set(methods)):
  key=method+' '+route;disposition=dispositions.get(key,{'classification':'public' if key in docs else 'pending','reason':'Split OpenAPI contract exists; alignment outside packages 1–7 is not assessed.' if key in docs else 'Needs owning-route disposition.'})
  if route=='/api/content/lipsync':disposition={'classification':'pending','reason':'Coordinated API/worker release and real artifact inspection required.'}
  operations.append({'method':method,'path':route,'implementation':str(p.relative_to(api)),'documentation':docs.get(key),**disposition})
implemented={x['method']+' '+x['path'] for x in operations}
for key in sorted(set(docs)-implemented):
 method,route=key.split(' ',1);operations.append({'method':method,'path':route,'implementation':None,'documentation':docs[key],'classification':'retired' if route.endswith('/pin') else 'pending','reason':'Use PATCH /api/artists/{id} with pinned boolean.' if route.endswith('/pin') else 'Documented operation is unmatched; retained outcome or retirement decision belongs to its epic ticket.'})
mcp=[]
for p in sorted((api/'lib/mcp').rglob('*.ts')):
 if '__tests__' in p.parts:continue
 for name in re.findall(r'\.registerTool\(\s*["\']([^"\']+)',p.read_text()):mcp.append({'name':name,'source':str(p.relative_to(api))})
specifications={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((source/'api-reference/openapi').glob('*.json'))}
record={'apiSourceCommit':sha(api),'evidence':'Static source only; tool discovery and OAuth host verification remain separate. Conditional registration and scope filters mean this is not a promised catalog count.','operations':operations,'staticMcpRegistrations':sorted(mcp,key=lambda x:(x['name'],x['source'])),'specificationHashes':specifications}
serialized=json.dumps(record,indent=2)+'\n'
if args.check:
 if (out/'operation-inventory.json').read_text()!=serialized:raise SystemExit('Contract inventory is stale. Review the API/documentation changes, refresh the inventory, and commit it.')
else:(out/'operation-inventory.json').write_text(serialized)
print(len(implemented),'implemented method/path pairs;',len(set(docs)-implemented),'unmatched documented pairs;',len(mcp),'static MCP registrations')
