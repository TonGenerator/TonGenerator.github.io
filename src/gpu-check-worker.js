import {probeGpu} from './gpu-probe.js';
self.onmessage=async()=>self.postMessage(await probeGpu());
