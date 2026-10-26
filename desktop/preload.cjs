const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktopEngine',Object.freeze({
  publish:value=>ipcRenderer.send('engine:snapshot',value),
  ready:value=>ipcRenderer.send('engine:ready',value),
  onCommand:handler=>ipcRenderer.on('engine:command',(_event,message)=>{
    Promise.resolve().then(()=>handler(message.command,message.value)).then(value=>ipcRenderer.send('engine:reply',{id:message.id,ok:true,value})).catch(()=>ipcRenderer.send('engine:reply',{id:message.id,ok:false}));
  }),
}));
