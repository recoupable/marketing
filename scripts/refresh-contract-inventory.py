"""Refresh method/path and static MCP evidence without network or customer calls."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess


METHODS = ('GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS')
METHOD_PATTERN = '|'.join(METHODS)


def documented_operations(root, source):
    operations = {}
    for path in sorted((source / 'api-reference/openapi').glob('*.json')):
        for route, methods in json.loads(path.read_text()).get('paths', {}).items():
            for method in methods:
                if method.upper() in METHODS:
                    key = method.upper() + ' ' + route.rstrip('/')
                    operations[key] = str(path.relative_to(root))
    return operations


def exported_methods(source):
    methods = re.findall(
        rf'export\s+(?:async\s+)?(?:function|const)\s+({METHOD_PATTERN})\b', source
    )
    for block in re.findall(r'export\s+(?:const\s+)?\{([^}]+)\}', source):
        methods.extend(re.findall(rf'\b({METHOD_PATTERN})\b', block))
    return sorted(set(methods))


def default_disposition(method, documented):
    if documented:
        return {
            'classification': 'public',
            'reason': 'Split OpenAPI contract exists; alignment outside packages 1–7 is not assessed.',
        }
    if method == 'OPTIONS':
        return {'classification': 'internal', 'reason': 'HTTP preflight handler; no public operation contract.'}
    return {'classification': 'pending', 'reason': 'Needs owning-route disposition.'}


def implementation_operations(api, docs, dispositions):
    operations = []
    route_root = api / 'app/api'
    for path in sorted(route_root.rglob('route.ts')):
        # Path.parts keeps the API root empty and preserves literal dotted segments.
        segments = path.parent.relative_to(route_root).parts
        route = '/'.join(('/api', *segments))
        route = re.sub(r'\[([^]]+)\]', r'{\1}', route)
        for method in exported_methods(path.read_text()):
            key = method + ' ' + route
            disposition = dispositions.get(key, default_disposition(method, key in docs))
            if route == '/api/content/lipsync' and method == 'POST':
                disposition = {
                    'classification': 'pending',
                    'reason': 'Coordinated API/worker release and real artifact inspection required.',
                }
            operations.append({
                'method': method, 'path': route, 'implementation': str(path.relative_to(api)),
                'documentation': docs.get(key), **disposition,
            })
    return operations


def unmatched_operations(docs, implemented):
    operations = []
    for key in sorted(set(docs) - implemented):
        method, route = key.split(' ', 1)
        retired = route == '/api/artists/{id}/pin'
        operations.append({
            'method': method, 'path': route, 'implementation': None, 'documentation': docs[key],
            'classification': 'retired' if retired else 'pending',
            'reason': 'Use PATCH /api/artists/{id} with pinned boolean.' if retired else
                'Documented operation is unmatched; retained outcome or retirement decision belongs to its epic ticket.',
        })
    return operations


def static_mcp_registrations(api):
    registrations = []
    for path in sorted((api / 'lib/mcp').rglob('*.ts')):
        if '__tests__' in path.parts:
            continue
        for name in re.findall(r'\.registerTool\(\s*["\']([^"\']+)', path.read_text()):
            registrations.append({'name': name, 'source': str(path.relative_to(api))})
    return sorted(registrations, key=lambda item: (item['name'], item['source']))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--api', required=True)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    api = Path(args.api).resolve()
    root = Path(__file__).resolve().parent.parent
    source = root / 'content/docs/source'
    out = root / 'content/docs/contracts'
    docs = documented_operations(root, source)
    dispositions = json.loads((out / 'operation-dispositions.json').read_text())
    operations = implementation_operations(api, docs, dispositions)
    implemented = {item['method'] + ' ' + item['path'] for item in operations}
    for key in sorted(set(docs) - implemented):
        method, route = key.split(' ', 1)
        operation = json.loads((root / docs[key]).read_text())['paths'][route][method.lower()]
        availability = operation.get('x-recoup-availability')
        if availability not in ('pending', 'retired') or ('availability: ' + availability) not in operation.get('description', '').lower():
            raise SystemExit('Unmatched documentation needs explicit pending/retired availability: ' + key)
    registrations = static_mcp_registrations(api)
    record = {
        'apiSourceCommit': subprocess.check_output(['git', '-C', str(api), 'rev-parse', 'HEAD'], text=True).strip(),
        'evidence': 'Static source only; tool discovery and OAuth host verification remain separate. Conditional registration and scope filters mean this is not a promised catalog count.',
        'operations': operations + unmatched_operations(docs, implemented),
        'staticMcpRegistrations': registrations,
        'specificationHashes': {
            str(path.relative_to(root)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in sorted((source / 'api-reference/openapi').glob('*.json'))
        },
    }
    serialized = json.dumps(record, indent=2) + '\n'
    inventory = out / 'operation-inventory.json'
    if args.check:
        if inventory.read_text() != serialized:
            raise SystemExit('Contract inventory is stale. Review the API/documentation changes, refresh the inventory, and commit it.')
    else:
        inventory.write_text(serialized)
    print(len(implemented), 'implemented method/path pairs;', len(set(docs) - implemented),
          'unmatched documented pairs;', len(registrations), 'static MCP registrations')


if __name__ == '__main__':
    main()
