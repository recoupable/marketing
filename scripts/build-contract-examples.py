"""Freeze copyable docs examples for provider-free tests in the pinned API checkout."""
import argparse
import json
from pathlib import Path

from build_response_contracts import build_response_contracts
from refresh_context_mapping import refresh_context_mapping
from build_published_docs_record import build_published_docs_record
from build_context_fixture import build_context_fixture

parser = argparse.ArgumentParser()
parser.add_argument('--api', required=True)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'content/docs/source/api-reference/openapi'
specs = {name: json.loads((source / name).read_text()) for name in ['accounts.json', 'content.json', 'research.json', 'releases.json', 'social.json', 'context.json', 'projects.json']}
api = Path(args.api).resolve()
schema_hash, response_schemas = build_response_contracts(specs, source, api, args.check)
refresh_context_mapping(specs['context.json'], source / 'context.json', args.check)
record = build_published_docs_record(specs, source, root, schema_hash, response_schemas)
context_record = build_context_fixture(
    specs['context.json'], record['sourceHashes']['content/docs/source/api-reference/openapi/context.json'], record['evidence'],
)
outputs = [
    (record, [root / 'content/docs/contracts/example-cases.json', api / 'lib/contracts/fixtures/published-docs.json']),
    (context_record, [root / 'content/docs/contracts/context-contract.json', api / 'lib/contracts/fixtures/context-contract.json']),
]
for item, paths in outputs:
    serialized = json.dumps(item, indent=2) + '\n'
    for path in paths:
        if args.check:
            if not path.is_file() or path.read_text() != serialized:
                raise SystemExit(f'Stale documentation example fixture: {path}. Refresh and test the coordinated API fixture.')
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(serialized)
print('Verified shared examples' if args.check else 'Updated shared examples; run API publishedDocs tests before committing')
