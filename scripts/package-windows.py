"""ZIP only the explicit managed installation, never user data or extra files."""
import json
from pathlib import Path, PurePosixPath
import sys
import zipfile

root, output = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
manifest = json.loads((root / 'uninstall-manifest.json').read_text(encoding='utf-8'))
if manifest.get('appId') != 'local.generator.ton.username':
    raise ValueError('Invalid installation manifest')
files = [item['path'] for item in manifest['files']] + ['uninstall-manifest.json']
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
    for name in files:
        relative = PurePosixPath(name)
        file = (root / name).resolve()
        if relative.is_absolute() or '..' in relative.parts or root not in file.parents or file.is_symlink():
            raise ValueError('Unsafe managed path')
        archive.write(file, 'GENERATOR TON USERNAME/' + name)
print('Windows ZIP ready:', output)
