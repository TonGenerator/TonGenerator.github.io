const {app,BrowserWindow,Tray,Menu,Notification,powerMonitor,shell,ipcMain,nativeImage,safeStorage,dialog}=require('electron');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {spawn}=require('node:child_process');const readline=require('node:readline');
const {Governor}=require('./governor.cjs');const {createDesktopServer,ORIGIN}=require('./server.cjs');
const {OwnCpuMeter}=require('./cpu-meter.cjs');
const NAME='GENERATOR TON USERNAME',ROOT=path.resolve(__dirname,'..');
const smoke=process.argv.includes('--smoke-test');
const registerOnly=process.argv.includes('--register-only'),uninstallRequested=process.argv.includes('--uninstall');
const findTest=smoke&&process.argv.includes('--find-test'),controlTest=smoke&&process.argv.includes('--control-test'),testRoot=path.resolve(process.cwd(),'test-results','desktop');
app.setName(NAME);app.setAppUserModelId('AlexFordash.TonGenerator');
if(smoke){const profilePath=path.join(testRoot,controlTest?'control-profile':'profile');require('node:fs').mkdirSync(profilePath,{recursive:true});app.setPath('userData',profilePath);}
if(!app.requestSingleInstanceLock()){app.quit();}else{boot().catch(async error=>{if(smoke)await fs.writeFile(path.join(testRoot,'smoke-error.json'),JSON.stringify({error:String(error.message)}),'utf8');else dialog.showErrorBox(NAME,'Не удалось запустить приложение. Проверь, свободен ли порт 11111.');app.quit();});}
let engine,tray,trayMenu,server,monitor,timer,closing=false,ready=false,suspended=false,screenLocked=false,monitorAt=0,lastSample={};
let snapshot={running:false,attempts:0,keys:0,elapsedMs:0,rate:0,address:'',status:'Готов к поиску',error:''};
let prefs,folder,profile={paused:true,reason:'Запуск',cpuThreads:0,cpuDuty:0.05,gpuDuty:0.05},persisting=false,pendingNotice=false;
let publicResult=null,lastCpu=os.cpus(),externalCpu=0,requestId=0,webgpuAvailable=false,menuKey='',notice,notificationAccepted=false;
let prefsWrite=Promise.resolve(),unsavedResult=null,storageError='',lastPersistAttempt=0,manualExported=false;
let lastTickAt=0,ownCpu=0,queueTools;const ownCpuMeter=new OwnCpuMeter();
const pending=new Map(),governor=new Governor();const engineToken=crypto.randomBytes(32).toString('hex');
const defaults={autoStart:true,resumeOnBoot:true,resumeSearch:false,manualPause:false,options:{contract:'wallet-tg',pattern:'_GAY',patterns:['_GAY','_FURRY','_FEMBOY'],position:'suffix',caseSensitive:true,bounceable:false,testOnly:false,strategy:'standard',importTarget:'telegram',mnemonicScheme:'bip39-12-slip10-ed25519',computeEngine:'hybrid',gpuDuty:0.5,threads:Math.max(1,Math.ceil(os.cpus().length/2))},wallets:[]};
const write=async(file,value)=>{const tmp=file+'.tmp';await fs.writeFile(tmp,JSON.stringify(value),{encoding:'utf8',mode:0o600});await fs.rename(tmp,file);};
const savePrefs=()=>{const value=structuredClone(prefs),task=prefsWrite.then(()=>write(path.join(folder,'settings.json'),value));prefsWrite=task.catch(()=>{});return task;};
function options(value){
 const base={...defaults.options,...value};const patterns=queueTools.parsePatterns(value?.patterns??(value?.pattern?[value.pattern]:defaults.options.patterns),base.caseSensitive);
 if(!['wallet-tg','v4r2','v5r1'].includes(base.contract)||!['cpu','gpu','hybrid'].includes(base.computeEngine)||!['prefix','suffix'].includes(base.position)||!/^[A-Za-z0-9_-]{1,8}$/.test(base.pattern)||!['ton-24','bip39-12-slip10-ed25519'].includes(base.mnemonicScheme))throw Error('Invalid options');
 return {contract:base.contract,pattern:patterns[0],patterns,performanceMode:base.performanceMode==='max'?'max':'adaptive',position:base.position,caseSensitive:!!base.caseSensitive,bounceable:base.contract==='wallet-tg'?false:!!base.bounceable,testOnly:base.contract==='wallet-tg'?false:!!base.testOnly,strategy:'standard',importTarget:base.contract==='wallet-tg'?'telegram':'tonkeeper',mnemonicScheme:base.contract==='wallet-tg'?'bip39-12-slip10-ed25519':base.mnemonicScheme,computeEngine:base.mnemonicScheme==='ton-24'&&base.contract!=='wallet-tg'?'cpu':base.computeEngine,gpuDuty:Math.max(.05,Math.min(base.performanceMode==='max'?1:.9,Number(base.gpuDuty)||.2)),threads:Math.max(base.computeEngine==='hybrid'?2:1,Math.min(os.cpus().length,Math.floor(Number(base.threads)||4)))};
}
function trusted(event){return engine&&!engine.isDestroyed()&&event.sender===engine.webContents&&event.senderFrame===engine.webContents.mainFrame&&event.senderFrame.url===ORIGIN+'/engine.html';}
function command(command,value){return new Promise((resolve,reject)=>{if(!ready||!engine||engine.isDestroyed())return reject(Error('Engine unavailable'));const id=++requestId;const timeout=setTimeout(()=>{pending.delete(id);reject(Error('Engine timeout'));},12000);pending.set(id,{resolve,reject,timeout});engine.webContents.send('engine:command',{id,command,value});});}
function state(){const pendingResult=unsavedResult?{id:'pending',address:unsavedResult.address,contract:unsavedResult.contract,walletId:unsavedResult.walletId,words:unsavedResult.mnemonicWordCount}:null;return {name:NAME,...snapshot,error:storageError||snapshot.error,options:prefs.options,searchQueue:prefs.searchQueue,autoStart:prefs.autoStart,resumeOnBoot:prefs.resumeOnBoot,manualPause:prefs.manualPause,profile,monitorFresh:Date.now()-monitorAt<6000,game:!!lastSample.game,externalGpu:lastSample.externalGpu,diskBusy:lastSample.diskBusy,diskLatencyMs:lastSample.diskLatencyMs,externalCpu,ownCpu,ready,webgpuAvailable,persisting,gpuLimit:!!snapshot.gpuLimit,savingFailed:!!storageError,found:publicResult||pendingResult,wallets:pendingResult?[...prefs.wallets,pendingResult]:prefs.wallets,maxThreads:os.cpus().length};}
function notifyFound(){
 if(!pendingNotice||lastSample.game||lastSample.fullscreen||suspended||screenLocked)return;
 pendingNotice=false;
 notice=new Notification({title:NAME,body:smoke?'Проверка приложения: уведомления о найденном адресе работают.':'Найден нужный TON-адрес. Сид-фраза сохранена локально в зашифрованном виде.',icon:path.join(__dirname,'icon.png'),silent:false});
 notice.on('show',()=>{notificationAccepted=true;});notice.on('click',open);notice.on('failed',()=>tray?.displayBalloon({title:NAME,content:smoke?'Проверка уведомлений приложения.':'Кошелёк найден. Открой приложение из трея.'}));notice.show();
}
function open(){shell.openExternal(ORIGIN+'/');}
function menu(){if(!tray)return;const key=JSON.stringify([!!publicResult,snapshot.running,profile.reason,prefs.manualPause,prefs.autoStart]);if(key===menuKey)return;menuKey=key;tray.setToolTip(NAME+'\n'+(publicResult?'Кошелёк найден':snapshot.running?profile.reason:'Готов к поиску'));trayMenu=Menu.buildFromTemplate([
 {label:NAME,enabled:false},{label:'Открыть интерфейс',click:open},{type:'separator'},
 {id:'pause',label:prefs.manualPause?'Продолжить поиск':'Пауза поиска',type:'checkbox',checked:prefs.manualPause,enabled:ready&&snapshot.running,click:()=>setManualPause(!prefs.manualPause).catch(()=>dialog.showErrorBox(NAME,'Не удалось применить паузу. Открой интерфейс и проверь связь.'))},
 {label:'Остановить поиск',enabled:ready&&snapshot.running,click:()=>action('stop',{}).catch(()=>{})},
 {label:'Автозапуск с Windows',type:'checkbox',checked:prefs.autoStart,click:async item=>{await login(item.checked);menu();}},
 {label:'Автоматически освобождает ресурсы для игр',enabled:false},
 {label:publicResult?'Кошелёк найден ✓':snapshot.running?profile.reason:'Поиск остановлен',enabled:false},
 {type:'separator'},{label:'Удалить приложение…',click:uninstall},{label:'Выйти из приложения',click:()=>app.quit()},
 ]);tray.setContextMenu(trayMenu);}
async function setManualPause(paused){prefs.manualPause=!!paused;await tick(true);await savePrefs();menu();}
async function uninstall(){
 if(smoke)return;
 if(persisting||(unsavedResult&&!manualExported)){dialog.showErrorBox(NAME,'Сначала дождись сохранения найденного кошелька или сохрани секретный JSON.');return;}
 const answer=await dialog.showMessageBox({type:'warning',title:NAME,message:'Удалить GENERATOR TON USERNAME?',detail:'Поиск завершится, автозапуск и ярлык будут удалены. Сохранённые кошельки и настройки останутся в папке данных Windows.',buttons:['Отмена','Удалить приложение'],defaultId:0,cancelId:0,noLink:true});
 if(answer.response!==1)return;
 try{
  const {prepareUninstall}=require('./uninstall.cjs');const prepared=await prepareUninstall({installRoot:path.dirname(process.execPath),appRoot:ROOT,pid:process.pid,name:NAME});
  await login(false);prefs.resumeSearch=false;if(prefs.searchQueue)prefs.searchQueue.active=false;await savePrefs();await require('./windows-identity.cjs').unregisterIdentity();
  const shortcut=path.join(app.getPath('appData'),'Microsoft','Windows','Start Menu','Programs',NAME+'.lnk');await fs.unlink(shortcut).catch(error=>{if(error.code!=='ENOENT')throw error;});
  const source=await fs.readFile(prepared.script,'utf8'),argument=Buffer.from(prepared.config,'utf8').toString('base64');
  const code=`& {\n${source}\n} -Config ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${argument}')))`;
  const helper=spawn('powershell.exe',['-NoProfile','-NonInteractive','-EncodedCommand',Buffer.from(code,'utf16le').toString('base64')],{detached:true,windowsHide:true,stdio:'ignore'});await new Promise((resolve,reject)=>{helper.once('spawn',resolve);helper.once('error',reject);});helper.unref();app.quit();
 }catch{dialog.showErrorBox(NAME,'Удаление не запущено. Проверь, что рядом с EXE есть uninstall-manifest.json. Кошельки сохранены.');}
}
async function login(enabled){prefs.autoStart=!!enabled;if(!smoke&&app.isPackaged)app.setLoginItemSettings({openAtLogin:prefs.autoStart,path:process.execPath,args:['--background'],name:NAME});await savePrefs();}
async function encrypt(text){if(safeStorage.isAsyncEncryptionAvailable){if(!await safeStorage.isAsyncEncryptionAvailable())throw Error('Encryption unavailable');return safeStorage.encryptStringAsync(text);}if(!safeStorage.isEncryptionAvailable())throw Error('Encryption unavailable');return safeStorage.encryptString(text);}
async function decrypt(bytes){if(safeStorage.decryptStringAsync){const value=await safeStorage.decryptStringAsync(bytes);return typeof value==='string'?value:value.result;}return safeStorage.decryptString(bytes);}
async function keepFound(result){
 if(persisting||!result?.address||(prefs.wallets.some(item=>item.address===result.address)&&unsavedResult?.address!==result.address)||(unsavedResult?.address===result.address&&Date.now()-lastPersistAttempt<5000))return;
 persisting=true;unsavedResult=result;lastPersistAttempt=Date.now();prefs.resumeSearch=false;
 try{
  const backup=await command('reveal');
  try{
   if(!Array.isArray(backup.mnemonic)||![12,24].includes(backup.mnemonic.length))throw Error('Invalid recovery');
   publicResult=prefs.wallets.find(item=>item.address===result.address);
   if(!publicResult){const id=crypto.randomUUID(),sealed=await encrypt(JSON.stringify(backup));try{await write(path.join(folder,'wallets',id+'.json'),{version:1,encrypted:sealed.toString('base64')});}finally{sealed.fill(0);}
    publicResult={id,address:result.address,contract:result.contract,walletId:result.walletId,pattern:result.pattern,matchedPatterns:result.matchedPatterns,words:backup.mnemonic.length,createdAt:new Date().toISOString()};prefs.wallets.push(publicResult);}
   prefs.searchQueue=queueTools.advanceQueue(prefs.searchQueue,result.matchedPatterns?.length?result.matchedPatterns:result.pattern);prefs.resumeSearch=!!prefs.searchQueue?.active;
   if(prefs.resumeSearch)prefs.options=options({...prefs.options,pattern:prefs.searchQueue.remaining[0],patterns:prefs.searchQueue.remaining});
   await savePrefs();unsavedResult=null;storageError='';pendingNotice=true;notifyFound();
  }finally{backup.mnemonic?.fill('');}
 }catch{storageError='Не удалось сохранить защищённую копию. Сохрани секретный JSON из интерфейса перед выходом.';}
 finally{persisting=false;menu();}
 if(!storageError&&prefs.resumeSearch){try{await command('start',prefs.options);publicResult=null;}catch{snapshot.error='Кошелёк сохранён. Следующий шаблон не удалось запустить — перезапусти поиск.';}}
}
async function action(name,data){
 if(name==='start'){if(persisting||(unsavedResult&&!manualExported))throw Error('Saving result');const patterns=queueTools.parsePatterns(data.patterns??data.options.patterns??data.options.pattern,data.options.caseSensitive);prefs.options=options({...data.options,pattern:patterns[0],patterns});prefs.searchQueue={patterns,index:0,completed:[],remaining:patterns,active:true};prefs.manualPause=false;publicResult=null;unsavedResult=null;storageError='';manualExported=false;await tick();await command('start',prefs.options);prefs.resumeSearch=true;await savePrefs();menu();return {ok:true};}
 if(name==='stop'){prefs.resumeSearch=false;if(prefs.searchQueue)prefs.searchQueue.active=false;await command('stop');snapshot.running=false;await savePrefs();menu();return {ok:true};}
 if(name==='pause'){await setManualPause(data.paused);return {ok:true};}
 if(name==='settings'){prefs.resumeOnBoot=!!data.resumeOnBoot;await login(!!data.autoStart);menu();return {ok:true};}
 if(name==='gpu-limit'){await command('ignore-limit');return {ok:true};}
 if(name==='reveal'){
  if(data.id==='pending'&&unsavedResult){const value=await command('reveal');if(data.export)manualExported=true;return value;}
  const record=prefs.wallets.find(item=>item.id===data.id);if(!record)throw Error('Unknown result');
  const sealed=JSON.parse(await fs.readFile(path.join(folder,'wallets',record.id+'.json'),'utf8'));return JSON.parse(await decrypt(Buffer.from(sealed.encrypted,'base64')));
 }
 throw Error('Unknown action');
}
function totalCpu(){const current=os.cpus();let all=0,idle=0;for(let i=0;i<current.length;i++){const prev=lastCpu[i]?.times||current[i].times;for(const key of Object.keys(current[i].times))all+=current[i].times[key]-prev[key];idle+=current[i].times.idle-prev.idle;}lastCpu=current;return all>0?1-idle/all:0;}
function tick(strict=false){
 if(!prefs)return;
 const now=Date.now(),loopLagMs=lastTickAt?Math.max(0,now-lastTickAt-1000):0;lastTickAt=now;
 const metrics=app.getAppMetrics();ownCpu=ownCpuMeter.sample(metrics,performance.now(),os.cpus().length);const ids=[process.pid,monitor?.pid];for(const metric of metrics){ids.push(metric.pid);try{os.setPriority(metric.pid,os.constants.priority.PRIORITY_BELOW_NORMAL);}catch{}}
 if(monitor?.stdin.writable)monitor.stdin.write(ids.filter(Boolean).join(',')+'\n');
 externalCpu=Math.max(0,totalCpu()-ownCpu);
 profile=governor.decide({threads:prefs.options.threads,logicalThreads:os.cpus().length,computeEngine:prefs.options.computeEngine,performanceMode:prefs.options.performanceMode,gpuLimit:prefs.options.gpuDuty,manualPause:prefs.manualPause,suspended,monitorFresh:Date.now()-monitorAt<6000,onBattery:powerMonitor.isOnBatteryPower(),idleSeconds:powerMonitor.getSystemIdleTime(),game:lastSample.game,fullscreen:lastSample.fullscreen,externalGpu:lastSample.externalGpu||0,externalCpu,diskBusy:lastSample.diskBusy,diskLatencyMs:lastSample.diskLatencyMs,loopLagMs});
 if(findTest&&!profile.paused)profile={...profile,cpuThreads:2,cpuDuty:.4,gpuDuty:.2};
 const applied=ready?command('control',profile):Promise.resolve();notifyFound();menu();return strict?applied:applied.catch(()=>{});
}
async function boot(){
 await app.whenReady();
 if(!smoke&&app.isPackaged){await require('./windows-identity.cjs').registerIdentity({exe:process.execPath,icon:path.join(__dirname,'icon.ico'),version:app.getVersion()});const shortcut=path.join(app.getPath('appData'),'Microsoft','Windows','Start Menu','Programs',NAME+'.lnk');await fs.mkdir(path.dirname(shortcut),{recursive:true});shell.writeShortcutLink(shortcut,'create',{target:process.execPath,cwd:path.dirname(process.execPath),description:NAME,icon:path.join(__dirname,'icon.ico'),iconIndex:0,appUserModelId:'AlexFordash.TonGenerator'});}
 if(!smoke&&app.isPackaged){const oldShortcut=path.join(app.getPath('appData'),'Microsoft','Windows','Start Menu','Programs','Electron.lnk');try{const old=shell.readShortcutLink(oldShortcut);if(path.resolve(old.target).toLowerCase()===path.resolve(process.execPath).toLowerCase())await fs.unlink(oldShortcut);}catch{}}
 if(registerOnly){app.quit();return;}
 queueTools=await import('../src/patterns.js');folder=app.getPath('userData');await fs.mkdir(path.join(folder,'wallets'),{recursive:true});
 try{prefs={...defaults,...JSON.parse(await fs.readFile(path.join(folder,'settings.json'),'utf8'))};prefs.options=options(prefs.options);if(!Array.isArray(prefs.wallets))prefs.wallets=[];}catch{prefs=structuredClone(defaults);}
 publicResult=prefs.resumeSearch?null:prefs.wallets.at(-1)||null;
 server=createDesktopServer({root:ROOT,engineToken,getState:state,action});await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(11111,'127.0.0.1',resolve);});
 tray=new Tray(nativeImage.createFromPath(path.join(__dirname,'icon.png')).resize({width:20,height:20}));tray.on('double-click',open);tray.on('click',open);tray.on('balloon-show',()=>{notificationAccepted=true;});menu();await login(prefs.autoStart);
 engine=new BrowserWindow({title:NAME,icon:path.join(__dirname,'icon.ico'),show:false,width:1000,height:800,skipTaskbar:true,webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,sandbox:true,nodeIntegration:false,backgroundThrottling:false,devTools:false}});
 engine.webContents.setWindowOpenHandler(()=>({action:'deny'}));engine.webContents.on('will-navigate',(event,url)=>{if(url!==ORIGIN+'/engine.html')event.preventDefault();});
 engine.webContents.session.setPermissionRequestHandler((_contents,_permission,callback)=>callback(false));
 engine.webContents.session.webRequest.onBeforeRequest((details,callback)=>callback({cancel:!details.url.startsWith(ORIGIN+'/')&&!details.url.startsWith('blob:'+ORIGIN+'/')}));
 engine.webContents.on('render-process-gone',()=>{ready=false;snapshot.running=false;snapshot.error='Вычислительный процесс остановился. Перезапусти приложение.';menu();});
 ipcMain.on('engine:ready',(event,capabilities)=>{if(!trusted(event))return;ready=true;webgpuAvailable=!!capabilities?.webgpu;if(!webgpuAvailable)prefs.options.computeEngine='cpu';tick();if(!uninstallRequested&&prefs.resumeSearch&&prefs.resumeOnBoot&&!publicResult)command('start',prefs.options).catch(()=>{snapshot.error='Не удалось возобновить поиск.';});});
 ipcMain.on('engine:reply',(event,message)=>{if(!trusted(event))return;const item=pending.get(message.id);if(!item)return;clearTimeout(item.timeout);pending.delete(message.id);message.ok?item.resolve(message.value):item.reject(Error('Engine command failed'));});
 ipcMain.on('engine:snapshot',(event,data)=>{if(!trusted(event))return;snapshot={running:!!data.running,attempts:Math.max(0,Number(data.attempts)||0),keys:Math.max(0,Number(data.keys)||0),elapsedMs:Math.max(0,Number(data.elapsedMs)||0),rate:Math.max(0,Number(data.rate)||0),address:typeof data.address==='string'?data.address.slice(0,48):'',status:typeof data.status==='string'?data.status.slice(0,120):'',error:typeof data.error==='string'?data.error.slice(0,500):'',gpuLimit:!!data.gpuLimit};if(data.result)keepFound(data.result);});
 monitor=spawn(path.join(__dirname,'monitor.exe'),[],{windowsHide:true,stdio:['pipe','pipe','ignore']});monitor.on('error',()=>{monitorAt=0;});monitor.on('exit',()=>{monitorAt=0;});
 readline.createInterface({input:monitor.stdout}).on('line',line=>{try{const value=JSON.parse(line);if(value.error)return;lastSample={game:!!value.game,fullscreen:!!value.fullscreen,externalGpu:typeof value.externalGpu==='number'?Math.max(0,Math.min(1,value.externalGpu)):null,diskBusy:Number.isFinite(value.diskBusy)?Math.max(0,Math.min(1,value.diskBusy)):null,diskLatencyMs:Number.isFinite(value.diskLatencyMs)?Math.max(0,value.diskLatencyMs):null};monitorAt=Date.now();}catch{}});
 powerMonitor.on('suspend',()=>{suspended=true;tick();});powerMonitor.on('resume',()=>{suspended=false;governor.lastBusy=Date.now();tick();});powerMonitor.on('lock-screen',()=>{screenLocked=true;tick();});powerMonitor.on('unlock-screen',()=>{screenLocked=false;governor.lastBusy=Date.now();tick();});
 timer=setInterval(()=>tick().catch(()=>{}),1000);await engine.loadURL(ORIGIN+'/engine.html',{extraHeaders:'X-Generator-Engine: '+engineToken+'\n'});
 app.on('second-instance',(_event,args)=>{if(args.includes('--uninstall'))uninstall();else if(!args.includes('--register-only'))open();});app.on('window-all-closed',()=>{});
 if(uninstallRequested)await uninstall();else if(!process.argv.includes('--background')&&!smoke)open();
 if(smoke){setTimeout(async()=>{
  let encryption=false,foundAndRestored=false,encryptedOnly=false;
  let controlChecks;
  if(controlTest&&ready){
   try{
    await action('start',{options:{...defaults.options,pattern:'________',patterns:['________'],performanceMode:'max',computeEngine:'cpu',threads:1}});
    const waitFor=async(check,timeout=20000)=>{const until=Date.now()+timeout;while(!check()&&Date.now()<until)await new Promise(resolve=>setTimeout(resolve,100));return !!check();};
    const began=await waitFor(()=>snapshot.attempts>0);await action('pause',{paused:true});await new Promise(resolve=>setTimeout(resolve,1200));const count=snapshot.attempts;
    await new Promise(resolve=>setTimeout(resolve,1500));const paused=profile.paused&&prefs.manualPause&&snapshot.attempts===count;
    await action('pause',{paused:false});const resumed=await waitFor(()=>snapshot.attempts>count);await action('stop',{});
    const prior=prefs.wallets.length;await action('start',{options:{...defaults.options,performanceMode:'max',computeEngine:'cpu',threads:1},patterns:['a','b']});
    const completed=await waitFor(()=>prefs.wallets.length===prior+2&&!persisting&&!prefs.resumeSearch,45000);
    const records=prefs.wallets.slice(prior);let restored=completed;
    for(const record of records){const backup=await action('reveal',{id:record.id});try{restored&&=backup.address===record.address&&backup.mnemonic.length===12;}finally{backup.mnemonic.fill('');}}
    controlChecks={began,paused,resumed,queueCompleted:completed,queueRestored:restored,matchedPatterns:records.map(record=>record.pattern)};
   }catch{controlChecks={error:true};}
  }
  try{const value=crypto.randomBytes(32).toString('hex'),sealed=await encrypt(value);encryption=(await decrypt(sealed))===value;sealed.fill(0);}catch{}
  if(findTest&&ready&&!profile.paused){
   try{
    await action('start',{options:{...defaults.options,pattern:'a',patterns:['a'],caseSensitive:false,computeEngine:'gpu',threads:2}});
    const deadline=Date.now()+60000;
    while((!publicResult||persisting)&&Date.now()<deadline&&!snapshot.error)await new Promise(resolve=>setTimeout(resolve,200));
    if(publicResult&&!persisting){const backup=await action('reveal',{id:publicResult.id});try{foundAndRestored=backup.address===publicResult.address&&backup.mnemonic.length===12&&/[aA]$/.test(backup.address);const disk=await fs.readFile(path.join(folder,'wallets',publicResult.id+'.json'),'utf8');encryptedOnly=!disk.includes(backup.mnemonic.join(' '));}finally{backup.mnemonic.fill('');}}
   }catch{}
   await new Promise(resolve=>setTimeout(resolve,500));
  }
  await write(path.join(testRoot,controlTest?'control-result.json':'smoke-result.json'),{ready,monitorFresh:Date.now()-monitorAt<6000,webgpu:webgpuAvailable,server:server.listening,tray:!tray.isDestroyed(),trayItems:trayMenu.items.map(item=>item.label).filter(Boolean),notificationsSupported:Notification.isSupported(),notificationAccepted,encryption,foundAndRestored,encryptedOnly,controlChecks,engineError:snapshot.error,profile,loginDisabled:true});
  if(snapshot.running)await command('stop').catch(()=>{});app.quit();
 },6000);}
 app.on('before-quit',event=>{if(closing)return;if(persisting||(unsavedResult&&!manualExported)){event.preventDefault();if(!persisting&&!smoke)dialog.showErrorBox(NAME,'Сначала сохрани секретный JSON: защищённую копию записать не удалось.');return;}closing=true;clearInterval(timer);monitor?.stdin.end();monitor?.kill();server?.close();tray?.destroy();engine?.destroy();});
}
