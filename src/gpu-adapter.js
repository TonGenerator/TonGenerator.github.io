export async function requestGpuAdapter(gpu=globalThis.navigator?.gpu,timeoutMs=5000,onAttempt=()=>{}){
 if(!gpu)return null;
 const request=async options=>{let timer;try{const adapter=await Promise.race([gpu.requestAdapter(options),new Promise(resolve=>{timer=setTimeout(()=>resolve(null),timeoutMs);})]);onAttempt({mode:options.powerPreference||'default',available:!!adapter});return adapter;}catch(error){onAttempt({mode:options.powerPreference||'default',available:false,error:String(error.message).slice(0,200)});return null;}finally{clearTimeout(timer);}};
 return await request({powerPreference:'high-performance'})||await request({});
}
