"""Verify and copy the official buyer artifact without modifying its contents."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[2]


def verify_and_copy(source, output, release, root=ROOT):
    source, output = Path(source).resolve(), Path(output).resolve()
    if output == root / 'public' or root / 'public' in output.parents:
        raise ValueError('Subscriber downloads must not be written to public/')
    if source == output:
        raise ValueError('Keep the original release archive separate')
    data = source.read_bytes()
    if hashlib.sha256(data).hexdigest() != release['sha256']:
        raise ValueError('Checksum mismatch: expected the pinned official buyer ZIP')
    with zipfile.ZipFile(source) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)) or any(
            name.startswith('/') or '\\' in name or '..' in name.split('/')
            or 'recoup-internal-' in name for name in names
        ):
            raise ValueError('Invalid customer package')
        archive.getinfo('START HERE.html')
        provenance = json.loads(archive.read('recoup-plugin/RELEASE.json'))
        if provenance != {
            'version': release['version'], 'commit': release['sourceCommit'],
            'customer_content_sha256': release['customerContentSha256'],
        }:
            raise ValueError('Release provenance does not match the pin')
        for manifest in ('.codex-plugin/plugin.json', '.claude-plugin/plugin.json', '.cursor-plugin/plugin.json'):
            plugin = json.loads(archive.read('recoup-plugin/' + manifest))
            if plugin['name'] != 'recoup-plugin' or plugin['version'] != release['version']:
                raise ValueError('Host adapter does not match the release')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(data)
    return {'path': str(output), 'version': release['version'], 'sha256': release['sha256']}


if __name__ == '__main__':
    release = json.loads((ROOT / 'content/label-kit/release.json').read_text())
    try:
        print(json.dumps(verify_and_copy(*sys.argv[1:3], release)))
    except (ValueError, KeyError, zipfile.BadZipFile) as error:
        raise SystemExit(str(error))
