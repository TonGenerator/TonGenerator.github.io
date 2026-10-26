const {execFile}=require('node:child_process');const {promisify}=require('node:util');const path=require('node:path');
const run=promisify(execFile),ID='AlexFordash.TonGenerator',NAME='GENERATOR TON USERNAME';
const keys={aumid:'HKCU\\Software\\Classes\\AppUserModelId\\'+ID,uninstall:'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\GeneratorTonUsername',application:'HKCU\\Software\\Classes\\Applications\\'+NAME+'.exe'};
async function registerIdentity({exe,icon,version='1.2.0'}){
 if(process.platform!=='win32')return;
 const entries=[[keys.aumid,'DisplayName',NAME],[keys.aumid,'IconUri',icon],[keys.application,'FriendlyAppName',NAME],[keys.uninstall,'DisplayName',NAME],[keys.uninstall,'DisplayVersion',version],[keys.uninstall,'Publisher','AlexFordash'],[keys.uninstall,'DisplayIcon',icon],[keys.uninstall,'InstallLocation',path.dirname(exe)],[keys.uninstall,'UninstallString','"'+exe+'" --uninstall']];
 for(const [key,name,value] of entries)await run('reg.exe',['add',key,'/v',name,'/t','REG_SZ','/d',value,'/f'],{windowsHide:true});
 for(const name of ['NoModify','NoRepair'])await run('reg.exe',['add',keys.uninstall,'/v',name,'/t','REG_DWORD','/d','1','/f'],{windowsHide:true});
 const legacy='HKCU\\Software\\Classes\\AppUserModelId\\local.generator.ton.username';
 try{const {stdout}=await run('reg.exe',['query',legacy,'/v','IconUri'],{windowsHide:true});const oldIcon=stdout.split(/\s+REG_SZ\s+/).at(-1).trim();if(path.resolve(oldIcon).toLowerCase()===path.resolve(icon).toLowerCase())await run('reg.exe',['delete',legacy,'/f'],{windowsHide:true});}catch{}
}
async function unregisterIdentity(){if(process.platform==='win32')for(const key of Object.values(keys))await run('reg.exe',['delete',key,'/f'],{windowsHide:true}).catch(()=>{});}
module.exports={registerIdentity,unregisterIdentity,keys};
