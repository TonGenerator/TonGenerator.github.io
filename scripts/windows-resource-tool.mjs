import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
export async function resourceTool(root){
 const archive=path.join(root,'runtime-cache','rcedit-4.0.1.tgz'),folder=path.join(root,'runtime-cache','rcedit-4.0.1');
 const integrity='bZdaQi34krFWhrDn+O53ccBDw0MkAT2Vhu75SqhtvhQu4OPyFM4RoVheyYiVQYdjhUi6EJMVWQ0tR6bCIYVkUg==';
 let data;try{data=await fs.readFile(archive);}catch(error){if(error.code!=='ENOENT')throw error;const response=await fetch('https://registry.npmjs.org/rcedit/-/rcedit-4.0.1.tgz',{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('Resource tool download failed');data=Buffer.from(await response.arrayBuffer());}
 if(createHash('sha512').update(data).digest('base64')!==integrity)throw Error('Resource tool integrity mismatch');
 await fs.mkdir(folder,{recursive:true});await fs.writeFile(archive,data);
 execFileSync('tar',['-xf',archive,'-C',folder,'package/bin/rcedit-x64.exe','package/LICENSE']);
 return path.join(folder,'package','bin','rcedit-x64.exe');
}
