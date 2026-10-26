import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createServer } from '../server.mjs';

test('local server denies network APIs by CSP, private files, POST and foreign Host headers', async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const response = await fetch(base);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-security-policy'), /connect-src 'none'/);
    const html = await response.text();
    assert.match(html, /Твой адрес/);
    assert.doesNotMatch(html, /id="public-key"/);
    assert.equal((await fetch(base + '/wallet-worker.js')).status, 200);
    assert.equal((await fetch(base + '/install.html')).status,200);
    const source=await fetch(base+'/generator-ton-username.source.zip',{method:'HEAD'});assert.equal(source.status,200);assert.equal(source.headers.get('content-type'),'application/zip');assert.match(source.headers.get('content-disposition'),/^attachment;/);
    const notebook=await fetch(base+'/GENERATOR_TON_USERNAME_Colab.ipynb');assert.equal(notebook.status,200);assert.match(notebook.headers.get('content-disposition'),/^attachment;/);assert.equal((await notebook.json()).nbformat,4);
    for (const p of ['/package.json', '/audit/tonsuite-index.js', '/src/app.js', '/..%2fpackage.json']) {
      assert.equal((await fetch(base + p)).status, 404);
    }
    assert.equal((await fetch(base, { method: 'POST', body: 'anything' })).status, 405);
    const foreignHostStatus = await new Promise((resolve, reject) => {
      http.get(base, { headers: { Host: 'evil.example' } }, response => {
        response.resume();
        resolve(response.statusCode);
      }).on('error', reject);
    });
    assert.equal(foreignHostStatus, 403);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
