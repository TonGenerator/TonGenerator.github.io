import {requestGpuAdapter} from './gpu-adapter.js';
async function limit(promise,stage){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Таймаут: '+stage)),6000);})]);}finally{clearTimeout(timer);}}
export async function probeGpu(){
 const details={secureContext:globalThis.isSecureContext,webgpuApi:!!navigator.gpu,browser:navigator.userAgent,attempts:[]};let device,buffer,readback;
 try{
  if(!globalThis.isSecureContext)throw Error('Нужен HTTPS или локальный адрес 127.0.0.1.');
  if(!navigator.gpu)throw Error('Браузер не предоставляет WebGPU API в этом контексте.');
  const adapter=await requestGpuAdapter(navigator.gpu,5000,attempt=>details.attempts.push(attempt));details.adapter=!!adapter;
  if(!adapter)throw Error('Браузер не предоставил адаптер ни в режиме high-performance, ни по умолчанию.');
  details.device=[adapter.info?.vendor,adapter.info?.architecture,adapter.info?.device,adapter.info?.description].filter(Boolean).join(' ');
  device=await limit(adapter.requestDevice(),'создание устройства');buffer=device.createBuffer({size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC});readback=device.createBuffer({size:4,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
  const module=device.createShaderModule({code:'@group(0) @binding(0) var<storage,read_write> value:array<u32>; @compute @workgroup_size(1) fn main(){value[0]=123456789u*3u;}'});
  const pipeline=await limit(device.createComputePipelineAsync({layout:'auto',compute:{module,entryPoint:'main'}}),'компиляция'),group=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer}}]});
  const encoder=device.createCommandEncoder(),pass=encoder.beginComputePass();pass.setPipeline(pipeline);pass.setBindGroup(0,group);pass.dispatchWorkgroups(1);pass.end();encoder.copyBufferToBuffer(buffer,0,readback,0,4);device.queue.submit([encoder.finish()]);
  await limit(readback.mapAsync(GPUMapMode.READ),'вычисление');details.computePassed=new Uint32Array(readback.getMappedRange())[0]===370370367;readback.unmap();
  if(!details.computePassed)throw Error('GPU вернул неверный результат теста.');
 }catch(error){details.error=String(error.message).slice(0,500);}
 finally{buffer?.destroy();readback?.destroy();device?.destroy();}
 return details;
}
