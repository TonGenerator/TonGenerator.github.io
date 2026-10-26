import {initI18n} from './i18n.js';
import {initDonation} from './donate.js';
function modeOptions(mode){
 const selected=mode===true?'hybrid':mode===false?'cpu':mode;
 if(!['cpu','hybrid','max'].includes(selected))throw new Error('Unknown installation mode');
 return {gpu:selected!=='cpu',args:selected==='max'?' --engine hybrid --threads auto --max':selected==='hybrid'?' --engine hybrid --threads auto --gpu-load 50':''};
}
export function repositoryCommands(value,mode='cpu'){
 let url;try{url=new URL(value.trim());}catch{return null;}
 if(url.protocol!=='https:'||url.hostname!=='github.com'||url.port||url.username||url.password||url.search||url.hash||!/^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname))return null;
 const parts=url.pathname.split('/').filter(Boolean);if(parts.some(part=>part==='.'||part==='..'))return null;
 const repository=parts[1].replace(/\.git$/,'');if(!repository)return null;
 const {gpu,args}=modeOptions(mode);
 return `git clone 'https://github.com/${parts[0]}/${repository}.git' generator-ton-username\ncd generator-ton-username\nbash scripts/install-linux.sh${gpu?' --gpu':''}\n./generator-ton --pattern _FURRY --wallet telegram${args}`;
}
export function archiveCommands(mode='cpu'){const {gpu,args}=modeOptions(mode);return `unzip ~/Downloads/generator-ton-username.source.zip -d ~/generator-ton-username\ncd ~/generator-ton-username\nbash scripts/install-linux.sh${gpu?' --gpu':''}\n./generator-ton --pattern _FURRY --wallet telegram${args}`;}
if(typeof document!=='undefined'){
 initI18n();initDonation();
 const $=id=>document.getElementById(id);let method='archive',mode='cpu';
 function render(){
  $('archive-setup').hidden=method!=='archive';$('github-setup').hidden=method!=='github';
  $('archive-tab').setAttribute('aria-pressed',String(method==='archive'));$('github-tab').setAttribute('aria-pressed',String(method==='github'));
  for(const [id,value] of [['cpu-mode','cpu'],['gpu-mode','hybrid'],['max-mode','max']])$(id).setAttribute('aria-pressed',String(mode===value));
  const commands=method==='archive'?archiveCommands(mode):repositoryCommands($('repository').value,mode);
  $('install-command').textContent=commands||'Вставь ссылку на репозиторий GitHub выше.';$('copy-install').disabled=!commands;
  $('repository-status').textContent=commands?'Готовые команды ниже.':$('repository').value?'Нужна ссылка вида https://github.com/owner/repository, без дополнительных параметров.':'Добавь ссылку, чтобы получить готовые команды.';
  $('command-note').textContent=method==='archive'?'Команды предполагают, что архив лежит в папке Downloads. Если он в другом месте, измени путь к архиву.':'Клонирование создаст папку generator-ton-username. Выполни команды из домашней папки.';
  $('mode-note').textContent=mode==='max'?'MAX: CPU + GPU, все доступные потоки и 100% активности без автоснижения. GPU-модуль установится дополнительно. Может мешать работе и играм.':mode==='hybrid'?'CPU + GPU: половина потоков CPU и активность 50% по умолчанию. Нагрузку можно менять через --threads, --cpu-load и --gpu-load.':'По умолчанию используется половина потоков CPU с активностью 50%. Нагрузка регулируется автоматически.';
 }
 for(const name of ['archive','github'])$(name+'-tab').onclick=()=>{method=name;render();};
 for(const [id,value] of [['cpu-mode','cpu'],['gpu-mode','hybrid'],['max-mode','max']])$(id).onclick=()=>{mode=value;render();};$('repository').oninput=render;
 for(const [button,code] of [['copy-install','install-command'],['copy-tools','tools-command']])$(button).onclick=async()=>{
  try{await navigator.clipboard.writeText($(code).textContent);$(button).textContent='Скопировано ✓';}
  catch{$(button).textContent='Выдели команды вручную';}
  setTimeout(()=>{$(button).textContent='Скопировать';},1800);
 };
 render();
}
