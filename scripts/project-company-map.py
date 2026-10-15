"""Project ONLY a privacy-checked public atlas export into the marketing model.
Usage: python3 scripts/project-company-map.py /path/to/public-export/graph/atlas.json
Never supply the private atlas. This is a field allowlist, not a directory copy.
"""
import json, re, sys
from pathlib import Path

def text(value):
    value = re.sub(r'\b[Pp]roposed\s+', '', value)
    value = value.replace('Agreed direction: ', '').replace(' Full classification enforcement is proposed.', '')
    value = value.replace('Atlas exposes protected pointer/status', 'Expose protected pointers and status')
    return value

source = json.loads(Path(sys.argv[1]).read_text())
# The upstream exporter stamps this marker; reject private inputs.
assert source['meta'].get('publication', {}).get('edition') == 'public', 'Use the privacy-checked public export'
allowed = {'concept', 'policy', 'standards-reference', 'research-lane'}
nodes = [{k: text(n[k]) for k in ('id','label','summary','domain')} | {
    'fields': n.get('fields', []), 'rules': list(dict.fromkeys(text(r) for r in n.get('rules', []) if 'atlas watcher' not in r))
} for n in source['nodes'] if n['layer'] == 'target' and n['kind'] in allowed]
copy = json.loads(Path('lib/company-map/public-copy.json').read_text())
nodes = [n for n in nodes if n['id'] not in copy['exclude']]
for n in nodes:
    n['technicalLabel'] = n['label'] if n['id'] in copy['labels'] else ''
    n['technicalLabel'] = copy.get('technicalNames', {}).get(n['id'], n['technicalLabel'])
    n['label'] = copy['labels'].get(n['id'], n['label'])
    n['summary'] = copy['summaries'].get(n['id'], n['summary'])
ids = {n['id'] for n in nodes}
edges = [{k: text(e[k]) for k in ('id','source','target','relation')} for e in source['edges'] if e['layer']=='target' and e['source'] in ids and e['target'] in ids and not re.match(r'^(?:qualify|accept)_[a-z]{2}_', e['relation'])]
for edge in edges:
    edge['relation'] = edge['relation'].replace('_', ' ')
base = {'release-lifecycle','catalog-ingestion','artist-research','rights-review','publishing','royalty-reconciliation','campaigns','agent-work','corrections','access-change','analytics','architecture','platform-reliability','agent-memory-evaluation','agent-workspace-goals-reporting','creative-outcomes','royalty-ingestion','ingestion-layouts','ingestion-corrections'}
workflows = [{k:text(w[k]) for k in ('id','label','summary')} | {'nodes':[n for n in w['nodes'] if n in ids]} for w in source['workflows'] if w['id'] in base or w['id'].startswith(('company-','evals-'))]
workflows.append({'id':'specialist-topics', 'label':'Specialist: digital wallets & tokenized interests', 'summary':'Explore specialist digital-asset structures and music metadata exchanges, with rights and payment authority kept explicit.', 'nodes':copy['specialists']})
result = {'domains': [{k:d[k] for k in ('id','label','summary')} for d in source['domains']], 'nodes': nodes, 'edges': edges, 'workflows': workflows}
payload = json.dumps(result, ensure_ascii=False, indent=2)
for old, new in copy.get('textReplacements', {}).items():
    payload = payload.replace(old, new)
Path('lib/company-map/model.json').write_text(payload+'\n')
print({k:len(v) for k,v in result.items()})
