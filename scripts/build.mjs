import { build } from 'esbuild';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { WalletContractV4, WalletContractV5R1, Cell } from '@ton/ton';

await mkdir('dist', { recursive: true });
await mkdir('src/generated', { recursive: true });
const { code } = WalletContractV4.create({ workchain: 0, publicKey: Buffer.alloc(32) }).init;
const hash = code.hash().toString('hex');
if (hash !== 'feb5ff6820e2ff0d9483e7e0d62c817d846789fb4ae580c878866d959dabd5c0') {
  throw new Error('Unexpected V4R2 contract code hash');
}
const v5 = WalletContractV5R1.create({ publicKey: Buffer.alloc(32) }).init.code;
if (v5.hash().toString('hex') !== '20834b7b72b112147e1b2fb457b84e74d1a30f04f737d4f62a668e9552d2b72f') throw new Error('Unexpected V5R1 contract code hash');
// Official WalletTg trampoline, pinned independently by its root-cell hash.
const tgBoc = 'b5ee9c7241010101001a000030ff00209821d7498308b9f240df8085f833d0ed1e20ed53d969427e39';
const tg = Cell.fromBoc(Buffer.from(tgBoc, 'hex'))[0];
if (tg.hash().toString('hex') !== '9149ae51c1e4689710cebf7830297b16acfbadb363a920a537893e7ffeeca768') throw new Error('Unexpected WalletTg trampoline hash');
await writeFile('src/generated/contract.js', `// Canonical code hashes and depths, verified against pinned contracts.\nexport const CODE_HASH = '${hash}';\nexport const CODE_DEPTH = ${code.depth()};\nexport const CONTRACTS = ${JSON.stringify({v4r2:{hash,depth:code.depth()},v5r1:{hash:v5.hash().toString('hex'),depth:v5.depth()},'wallet-tg':{hash:tg.hash().toString('hex'),depth:tg.depth(),boc:tgBoc}},null,2)};\n`, 'utf8');
await build({
  entryPoints: { app: 'src/studio.js', 'wallet-worker': 'src/wallet-worker.js','gpu-check':'src/gpu-diagnostics.js','gpu-check-worker':'src/gpu-check-worker.js' }, outdir: 'dist',
  bundle: true, format: 'esm', platform: 'browser', target: 'es2022',
  inject: ['src/buffer-shim.js'],
  minify: false, sourcemap: false, legalComments: 'eof', charset: 'utf8',
});
await Promise.all([copyFile('src/studio.html', 'dist/index.html'), copyFile('src/studio.css', 'dist/style.css'), copyFile('src/favicon.svg', 'dist/favicon.svg')]);
await Promise.all(['html','css','js'].map(extension=>copyFile('src/install.'+extension,'dist/install.'+extension)));
await copyFile('src/gpu-check.html','dist/gpu-check.html');
await Promise.all(['shell.css','i18n.js','translations.js','donate.js'].map(file=>copyFile('src/'+file,'dist/'+file)));
await import('./build-seo.mjs');
await import('./build-colab.mjs');
await import('./package-source.mjs');
console.log('Built local-only site in dist/. Canonical V4R2, V5R1 and WalletTg code verified.');
