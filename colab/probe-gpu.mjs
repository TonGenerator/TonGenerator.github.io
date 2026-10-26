// Run separately: a driver failure or timeout must not take down the panel.
import {create,globals} from 'webgpu';
Object.assign(globalThis,globals);
const gpu=create([]);
const adapter=await gpu.requestAdapter({powerPreference:'high-performance'});
if(!adapter)throw Error('No WebGPU adapter');
const label=[adapter.info?.device,adapter.info?.description,adapter.info?.architecture].join(' ');
if(adapter.isFallbackAdapter||/swiftshader|llvmpipe|lavapipe|software/i.test(label))throw Error('Software adapter');
const device=await adapter.requestDevice();
device.destroy();
process.stdout.write(JSON.stringify({gpu:true,device:label})+'\n');
// Native backend owns background threads; process isolation gives deterministic teardown.
process.exit(0);
