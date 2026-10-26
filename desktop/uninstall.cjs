const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
async function validateManifest(installRoot){
 const root=path.resolve(installRoot),manifest=JSON.parse(await fs.readFile(path.join(root,'uninstall-manifest.json'),'utf8'));
 if(manifest.appId!=='local.generator.ton.username'||manifest.format!==1||!Array.isArray(manifest.files)||manifest.files.length>10000)throw Error('Invalid install manifest');
 for(const file of manifest.files){if(typeof file.path!=='string'||!file.path||file.path.includes('\\')||file.path.includes(':')||file.path.startsWith('/')||file.path.split('/').some(part=>!part||part==='.'||part==='..')||!/^[a-f0-9]{64}$/.test(file.sha256))throw Error('Invalid managed path');const resolved=path.resolve(root,file.path);if(!resolved.startsWith(root+path.sep))throw Error('Outside install root');}
 return {root,manifest};
}
async function prepareUninstall({installRoot,appRoot,pid,name}){
 const {root,manifest}=await validateManifest(installRoot);
 if(!Number.isInteger(pid)||pid<1||!manifest.files.some(file=>file.path===name+'.exe'))throw Error('Not a managed installation');
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'ton-generator-uninstall-'));
 const script=path.join(temp,'remove.ps1'),config=path.join(temp,'config.json');
 await fs.copyFile(path.join(appRoot,'desktop','uninstall.ps1'),script);
 await fs.writeFile(config,JSON.stringify({root,pid,files:manifest.files}),{encoding:'utf8',mode:0o600});
 return {script,config};
}
module.exports={prepareUninstall,validateManifest};
