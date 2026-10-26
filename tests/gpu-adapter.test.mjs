import test from 'node:test';import assert from 'node:assert/strict';import {requestGpuAdapter} from '../src/gpu-adapter.js';
test('GPU selection retries the default adapter when high-performance is unavailable or rejected',async()=>{
 for(const reject of [false,true]){const attempts=[],adapter={device:'test'};const gpu={async requestAdapter(options){attempts.push(options);if(options.powerPreference){if(reject)throw Error('Not available');return null;}return adapter;}};assert.equal(await requestGpuAdapter(gpu,100),adapter);assert.deepEqual(attempts,[{powerPreference:'high-performance'},{}]);}
 assert.equal(await requestGpuAdapter(undefined,10),null);
});
