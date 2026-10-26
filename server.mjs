import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
export const CSP = "default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const files = new Set(['index.html', 'style.css', 'app.js', 'worker.js', 'wallet-worker.js', 'favicon.svg','install.html','install.css','install.js','generator-ton-username.source.zip','GENERATOR_TON_USERNAME_Colab.ipynb','robots.txt','sitemap.xml','404.html']);
files.add('gpu-check.html');files.add('gpu-check.js');files.add('gpu-check-worker.js');
for(const file of ['shell.css','i18n.js','translations.js','donate.js'])files.add(file);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.zip':'application/zip', '.ipynb':'application/x-ipynb+json; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8' };
export function createServer() {
  return http.createServer(async (req, res) => {
    const host = req.headers.host;
    if (!/^127\.0\.0\.1(?::\d+)?$/.test(host ?? '') && !/^localhost(?::\d+)?$/.test(host ?? '')) {
      res.writeHead(403).end('Forbidden'); return;
    }
    res.setHeader('Content-Security-Policy', CSP);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!files.has(file)) { res.writeHead(404).end('Not found'); return; }
    try {
      const body = await readFile(path.join(root, file));
      res.setHeader('Content-Type', types[path.extname(file)]);
      if(file==='generator-ton-username.source.zip')res.setHeader('Content-Disposition','attachment; filename="generator-ton-username.source.zip"');
      if(file==='GENERATOR_TON_USERNAME_Colab.ipynb')res.setHeader('Content-Disposition','attachment; filename="GENERATOR_TON_USERNAME_Colab.ipynb"');
      res.writeHead(200).end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(503).end('Run npm run build first.'); }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  createServer().listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
}
