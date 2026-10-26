import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import {createRequire} from 'node:module';
const {validateManifest}=createRequire(import.meta.url)('../desktop/uninstall.cjs');
test('uninstall manifest refuses traversal and keeps its scope limited to listed installation files',async()=>{
 await fs.mkdir('test-results',{recursive:true});const root=await fs.mkdtemp(path.resolve('test-results/uninstall-'));const write=files=>fs.writeFile(path.join(root,'uninstall-manifest.json'),JSON.stringify({appId:'local.generator.ton.username',format:1,files}));
 try{await write([{path:'resources/app/desktop/main.cjs',sha256:'a'.repeat(64)}]);assert.equal((await validateManifest(root)).manifest.files.length,1);
  for(const file of ['../wallets/backup.json','/outside','C:/outside','resources\\bad','resources/./bad']){await write([{path:file,sha256:'a'.repeat(64)}]);await assert.rejects(()=>validateManifest(root));}
 }finally{const resolved=path.resolve(root);assert.ok(resolved.startsWith(path.resolve('test-results')+path.sep));await fs.rm(resolved,{recursive:true,force:true});}
});
