import { makeGpuBip39Shader, gpuSha512Constants } from './gpu-bip39.wgsl.js';
import { createGpuPacer, sleep } from './gpu-pacing.js';
import {requestGpuAdapter} from './gpu-adapter.js';
const usage={MAP_READ:1,COPY_SRC:4,COPY_DST:8,UNIFORM:64,STORAGE:128};
const encoder=new TextEncoder();
const FIXTURE='abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'.split(' ');
const EXPECTED='b477ef5ed17fb8a2b8faddd7a9835a227243a82c70b190c7af4896155aa7df9f';
export function packGpuPasswords(phrases) {
  const result=new Uint32Array(phrases.length*32);
  try {
    for(let i=0;i<phrases.length;i++) {
      const words=phrases[i];
      if(!Array.isArray(words)||words.length!==12||words.some(word=>typeof word!=='string'||!/^[a-z]+$/.test(word)))throw new Error('GPU requires twelve English words');
      const bytes=encoder.encode(words.join(' ').normalize('NFKD'));
      try {if(bytes.length>128)throw new Error('GPU phrase too long');for(let j=0;j<bytes.length;j++)result[i*32+(j>>>2)]|=bytes[j]<<(24-(j&3)*8);}
      finally{bytes.fill(0);}
    }
    return result;
  }catch(error){result.fill(0);throw error;}
}
async function bounded(promise,ms,stage) {
  let timer;
  try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>{const error=new Error(`GPU timeout: ${stage}`);error.gpuTimeoutStage=stage;reject(error);},ms);})]);}
  finally{clearTimeout(timer);}
}
async function fixtureRoot() {
  const input=encoder.encode(FIXTURE.join(' '));
  try{const key=await crypto.subtle.importKey('raw',input,'PBKDF2',false,['deriveBits']);return new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-512',salt:encoder.encode('mnemonic'),iterations:2048},key,512));}
  finally{input.fill(0);}
}
export async function createGpuBip39({batchSize=128,maxBatchSize=batchSize,loopIterations=32,workgroupSize=32,dutyCycle=0.2,onProgress,onLimit,shouldIgnoreBudget=()=>false,shouldStop=()=>false,shouldPause=()=>false}={}) {
  if(!Number.isInteger(batchSize)||batchSize<1||!Number.isInteger(maxBatchSize)||maxBatchSize<batchSize||maxBatchSize>8192||![32,64].includes(workgroupSize)||![8,16,32,64].includes(loopIterations))throw new Error('Invalid bounded GPU configuration');
  if(!globalThis.navigator?.gpu)throw new Error('WebGPU unavailable');
  const progress=stage=>onProgress?.(stage);
  let closed=false,cancelled=false,lost=false,inFlight=Promise.resolve(),mapped=false,busy=false;
  const stop=()=>cancelled||shouldStop();
  const pacer=createGpuPacer({dutyCycle,shouldStop:stop,shouldPause,shouldIgnoreBudget,
    ...(onLimit?{onBudgetExceeded:async ms=>{onLimit(ms);while(!shouldIgnoreBudget()&&!stop())await sleep(100);}}:{})});
  progress('adapter');
  const adapter=await bounded(requestGpuAdapter(),12000,'adapter');
  if(!adapter||stop())throw new Error('GPU unavailable or cancelled');
  const device=await bounded(adapter.requestDevice(),10000,'device');
  device.lost.then(()=>{lost=true;});
  const buffers=[];
  const allocate=(label,size,flags)=>{const buffer=device.createBuffer({label,size,usage:flags});buffers.push(buffer);return buffer;};
  const capacity=Math.min(maxBatchSize,Math.floor(device.limits.maxStorageBufferBindingSize/256));
  let input,state,output,parameters,readback,constants,group,initialize,iterate,complete,completeSeed;
  let chunk=loopIterations, maxPacketMs=0, totalPacketMs=0, measuredPackets=0;
  const info={batchSize:Math.min(batchSize,capacity),loopIterations:chunk,selfTestPassed:false,dutyCycle,backend:'webgpu-paced-bip39',iterations:2048,
    adapter:[adapter.info?.vendor,adapter.info?.architecture,adapter.info?.description].filter(Boolean).join(' ').slice(0,180)};
  const assertOpen=()=>{if(closed||lost||stop())throw new Error('GPU cancelled or lost');};
  const execute=async(pipeline,count,rounds=0)=>{
    assertOpen();
    const timing=await pacer.run(async()=>{
      device.queue.writeBuffer(parameters,0,new Uint32Array([count,rounds,80,0]));
      const command=device.createCommandEncoder(),pass=command.beginComputePass();
      pass.setPipeline(pipeline);pass.setBindGroup(0,group);pass.dispatchWorkgroups(Math.ceil(count/workgroupSize));pass.end();
      device.queue.submit([command.finish()]);await bounded(device.queue.onSubmittedWorkDone(),3000,'packet');
    });
    // Driver warmup and the one-item self-test must not permanently shrink
    // production packets. Adapt both ways, targeting short compute slices.
    if(pipeline===iterate&&count>=32){
      maxPacketMs=Math.max(maxPacketMs,timing.activeMs);totalPacketMs+=timing.activeMs;measuredPackets++;
      if(timing.activeMs>8&&chunk>1)chunk=Math.max(1,chunk>>>1);
      else if(timing.activeMs<4&&chunk<256)chunk=Math.min(256,chunk*2);
      info.loopIterations=chunk;
    }
  };
  async function wipe() {
    if(lost)return;
    const command=device.createCommandEncoder();for(const buffer of buffers)if(buffer!==constants)command.clearBuffer(buffer);
    device.queue.submit([command.finish()]);await bounded(device.queue.onSubmittedWorkDone(),1000,'cleanup');
  }
  async function deriveChunk(phrases,returnRoots=false) {
    const packed=packGpuPasswords(phrases),roots=[],seeds=[];let copied;
    try {
      device.queue.writeBuffer(input,0,packed);await execute(initialize,phrases.length);
      for(let left=2047;left>0;){const rounds=Math.min(left,chunk);await execute(iterate,phrases.length,rounds);left-=rounds;}
      await execute(returnRoots?complete:completeSeed,phrases.length);
      const command=device.createCommandEncoder();command.copyBufferToBuffer(output,0,readback,0,phrases.length*64);device.queue.submit([command.finish()]);
      await bounded(readback.mapAsync(usage.MAP_READ,0,phrases.length*64),3000,'readback');mapped=true;
      copied=new Uint8Array(readback.getMappedRange(0,phrases.length*64)).slice();readback.unmap();mapped=false;
      if(returnRoots){for(let i=0;i<phrases.length;i++)roots.push(copied.slice(i*64,i*64+64));return roots;}
      for(let i=0;i<phrases.length;i++)seeds.push(copied.slice(i*64,i*64+32));
      return seeds;
    }catch(error){seeds.forEach(seed=>seed.fill(0));roots.forEach(root=>root.fill(0));throw error;}
    finally{packed.fill(0);copied?.fill(0);if(!returnRoots)roots.forEach(root=>root.fill(0));if(mapped){try{readback.unmap();}catch{}mapped=false;}try{await wipe();}catch{}}
  }
  async function derive(phrases) {
    assertOpen();if(busy||!Array.isArray(phrases))throw new Error('Invalid or concurrent GPU batch');busy=true;const seeds=[];
    maxPacketMs=0;totalPacketMs=0;measuredPackets=0;
    const operation=(async()=>{try{for(let i=0;i<phrases.length;i+=capacity)seeds.push(...await deriveChunk(phrases.slice(i,i+capacity)));
      // Increase occupancy gradually. A shorter iteration slice compensates
      // for more parallel phrases; never submit a large uncalibrated packet.
      if(measuredPackets&&maxPacketMs<(chunk===1?8:12)&&phrases.length===info.batchSize&&info.batchSize<capacity){info.batchSize=Math.min(capacity,info.batchSize*2);chunk=Math.max(1,chunk>>>1);}
      else if(maxPacketMs>24&&info.batchSize>512){info.batchSize=Math.max(512,info.batchSize>>>1);}
      info.maxPacketMs=maxPacketMs;info.meanPacketMs=measuredPackets?totalPacketMs/measuredPackets:0;info.loopIterations=chunk;
      return seeds;}
      catch(error){seeds.forEach(seed=>seed.fill(0));throw error;}finally{busy=false;}})();
    inFlight=operation.catch(()=>{});return operation;
  }
  async function destroy() {
    if(closed)return;cancelled=true;await bounded(inFlight,4000,'shutdown').catch(()=>{});
    if(mapped){try{readback.unmap();}catch{}mapped=false;}
    try{await wipe();}catch{}closed=true;for(const buffer of buffers)buffer.destroy();device.destroy();
  }
  try {
    if(capacity<1)throw new Error('Insufficient GPU storage');
    input=allocate('Local mnemonic inputs',capacity*128,usage.STORAGE|usage.COPY_DST);
    state=allocate('Local HMAC state',capacity*256,usage.STORAGE|usage.COPY_DST);
    output=allocate('Local BIP39 roots',capacity*64,usage.STORAGE|usage.COPY_SRC|usage.COPY_DST);
    parameters=allocate('Public GPU bounds',16,usage.UNIFORM|usage.COPY_DST);
    readback=allocate('Local readback',capacity*64,usage.MAP_READ|usage.COPY_DST);
    constants=allocate('Public SHA512 constants',640,usage.STORAGE|usage.COPY_DST);
    device.queue.writeBuffer(constants,0,gpuSha512Constants());
    progress('shader');
    const module=device.createShaderModule({label:'Bounded BIP39 SHA512',code:makeGpuBip39Shader({workgroupSize})});
    const diagnostics=await bounded(module.getCompilationInfo(),8000,'shader');
    if(diagnostics.messages.some(item=>item.type==='error')){
      const error=new Error('GPU shader compilation failed');
      error.gpuDiagnostic=diagnostics.messages.filter(item=>item.type==='error').map(item=>`${item.lineNum}:${item.linePos} ${item.message}`).join('; ').slice(0,2000);throw error;
    }
    const layout=device.createBindGroupLayout({entries:[
      {binding:0,visibility:4,buffer:{type:'read-only-storage'}},{binding:1,visibility:4,buffer:{type:'storage'}},
      {binding:2,visibility:4,buffer:{type:'storage'}},{binding:3,visibility:4,buffer:{type:'uniform'}},
      {binding:4,visibility:4,buffer:{type:'read-only-storage'}},
    ]});
    const pipelineLayout=device.createPipelineLayout({bindGroupLayouts:[layout]});
    const pipeline=async entryPoint=>{while(shouldPause()&&!stop())await sleep(100);assertOpen();progress(`pipeline:${entryPoint}`);return bounded(device.createComputePipelineAsync({layout:pipelineLayout,compute:{module,entryPoint}}),15000,`pipeline ${entryPoint}`);};
    // Sequential compilation; compact runtime loops avoid driver unroll blowups.
    initialize=await pipeline('initialize');iterate=await pipeline('iterate');complete=await pipeline('complete');completeSeed=await pipeline('completeSeed');
    group=device.createBindGroup({layout,entries:[input,state,output,parameters,constants].map((buffer,binding)=>({binding,resource:{buffer}}))});
    progress('selftest');let reference,actual,seed;
    try {
      reference=await fixtureRoot();[actual]=await deriveChunk([FIXTURE],true);
      if(reference.length!==actual.length||!reference.every((byte,i)=>byte===actual[i]))throw new Error('GPU BIP39 self-test failed');
      [seed]=await deriveChunk([FIXTURE]);if(Buffer.from(seed).toString('hex')!==EXPECTED)throw new Error('GPU SLIP0010 self-test failed');info.selfTestPassed=true;
    }finally{reference?.fill(0);actual?.fill(0);seed?.fill(0);}
    progress('ready');return{derive,destroy,info,cancel(){cancelled=true;},setDuty(value){pacer.setDuty(value);info.dutyCycle=value;}};
  }catch(error){await destroy();throw error;}
}
