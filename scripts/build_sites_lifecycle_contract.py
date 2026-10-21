"""Freeze the Sites guide's bounded request/error examples and route accounting."""
import json
import re


def build_sites_lifecycle_contract(text):
    def example(heading):
        section = text.split(heading, 1)[1] if heading in text else ''
        section = re.split(r'\n#{2,3} ', section, maxsplit=1)[0]
        block = re.search(r'```json\n([\s\S]*?)\n```', section)
        return json.loads(block[1]) if block else None

    coverage = text.split('## Route coverage', 1)[1] if '## Route coverage' in text else ''
    callback = coverage.split('### Provider callback', 1)[1] if '### Provider callback' in coverage else ''
    pairs = lambda value: sorted(set(' '.join(item) for item in re.findall(
        r'\b(GET|POST|PATCH|PUT|DELETE|HEAD) (/api/sites(?:/[A-Za-z0-9_{}-]+)*)', value,
    )))
    upgrade = example('### Upgrade required')
    return {
        'examples': {
            'generation': example('### Poll background generation'),
            'publishSaved': example('### Publish the saved draft'),
            'publishPreview': example('### Publish a working preview'),
            'unpublish': example('### Unpublish'),
            'delete': example('## Delete and cancel generation'),
        },
        'upgrade': {'status': 402 if 'HTTP 402' in text else None, 'body': upgrade},
        'documentedOperations': sorted(set(pairs(text))),
        'callbackOperations': pairs(callback),
        'preflightExcluded': 'OPTIONS preflight handlers' in coverage,
    }
