import { parentPort } from 'node:worker_threads';
globalThis.self = globalThis;
// This is the browser bundle. Hide Node's environment marker so embedded
// Emscripten WASM follows the same local browser loader used in real workers.
globalThis.process = undefined;
self.postMessage = data => parentPort.postMessage(data);
self.close = () => parentPort.close();
await import('../dist/wallet-worker.js');
parentPort.on('message', data => self.onmessage({ data }));
self.postMessage({ type: 'test-ready' });
