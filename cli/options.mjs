import os from 'node:os';
import path from 'node:path';
import { validateSearchOptions } from '../src/engine.js';

export function parseOptions(args, cores=os.availableParallelism()) {
  const values={}, flags=new Set(['help','ignore-case','bounceable','testnet','json','ignore-gpu-limit','control-stdin','max']);
  const names=new Set(['pattern','wallet','threads','cpu-load','gpu-load','engine','position','words','output','duration','key']);
  let command='search';
  if(args[0]==='export'){command='export';args=args.slice(1);}
  for(let i=0;i<args.length;i++){
    if(args[i]==='-h'){values.help=true;continue;}
    if(!args[i].startsWith('--'))throw Error('Неизвестный аргумент. Используй --help.');
    const [name,...rest]=args[i].slice(2).split('=');
    if(flags.has(name)){if(rest.length)throw Error('Флаг не принимает значение: --'+name);values[name]=true;continue;}
    if(!names.has(name)&&!(command==='export'&&name==='file'))throw Error('Неизвестный параметр: --'+name);
    const value=rest.length?rest.join('='):args[++i];
    if(!value||value.startsWith('--'))throw Error('Не указано значение: --'+name);
    values[name]=value;
  }
  if(values.help)return {help:true};
  if(command==='export'){
    if(!values.file||!values.output)throw Error('Экспорт: --file найденный.encrypted.json --output SECRET-TON-backup.json');
    return {command,file:path.resolve(values.file),output:path.resolve(values.output),key:values.key?path.resolve(values.key):undefined};
  }
  const integer=(name,fallback,min,max)=>{const value=values[name]===undefined?fallback:Number(values[name]);if(!Number.isInteger(value)||value<min||value>max)throw Error('Некорректное значение --'+name);return value;};
  const threads=values.threads===undefined||values.threads==='auto'?Math.min(256,Math.max(1,values.max?cores:Math.ceil(cores/2))):integer('threads',1,1,256);
  const contract=({telegram:'wallet-tg',v4:'v4r2',v5:'v5r1','wallet-tg':'wallet-tg',v4r2:'v4r2',v5r1:'v5r1'})[values.wallet||'telegram'];
  if(!contract)throw Error('Выбери --wallet telegram, v4 или v5.');
  const words=integer('words',12,12,24);if(![12,24].includes(words))throw Error('Допустимы --words 12 или 24.');
  if(contract==='wallet-tg'&&words!==12)throw Error('Для Telegram нужны 12 слов WalletTg.');
  const engine=values.engine||'cpu';if(!['cpu','gpu','hybrid'].includes(engine))throw Error('Выбери --engine cpu, gpu или hybrid.');
  if(engine==='hybrid'&&threads<2)throw Error('Для hybrid нужны хотя бы два потока.');
  if(engine!=='cpu'&&words!==12)throw Error('GPU поддерживает только 12 слов BIP39.');
  const duration=values.duration===undefined?0:Number(values.duration);if(!Number.isFinite(duration)||duration<0||(duration>0&&duration<.1))throw Error('Некорректная длительность --duration.');
  const options={contract,pattern:values.pattern||'_FURRY',performanceMode:values.max?'max':'adaptive',position:values.position||'suffix',caseSensitive:!values['ignore-case'],bounceable:!!values.bounceable,testOnly:!!values.testnet,strategy:'standard',importTarget:contract==='wallet-tg'?'telegram':'tonkeeper',mnemonicScheme:words===12?'bip39-12-slip10-ed25519':'ton-24',computeEngine:engine,gpuDuty:integer('gpu-load',values.max?100:50,5,values.max?100:90)/100,desktopManaged:true};
  validateSearchOptions(options);
  return {command,options,threads,cpuLoad:integer('cpu-load',values.max?100:50,5,100)/100,duration,json:!!values.json,controlStdin:!!values['control-stdin'],ignoreGpuLimit:!!values['ignore-gpu-limit']||!!values.max,output:path.resolve(values.output||path.join(os.homedir(),'.generator-ton-username','wallets'))};
}

export const help=`GENERATOR TON USERNAME — консольный генератор TON

  npm run cli -- --pattern _FURRY --wallet telegram
  npm run cli -- --pattern ton --wallet v5 --ignore-case --threads 8

  --wallet telegram|v4|v5    Кошелёк (по умолчанию Telegram)
  --pattern ТЕКСТ           1–8 символов; по умолчанию _FURRY
  --position suffix|prefix  В конце / после первых четырёх символов
  --ignore-case             Не учитывать регистр
  --threads auto|ЧИСЛО      CPU-потоки, включая проверку GPU; до 256
  --engine cpu|gpu|hybrid   CPU по умолчанию; GPU требует webgpu@0.6.2
  --max                     MAX: все потоки и полная активность, без автоснижения
  --cpu-load 5..100         Предел активности CPU, по умолчанию 50
  --gpu-load 5..90          Предел активности GPU, по умолчанию 50
  --words 12|24             BIP39 / TON; Telegram только 12
  --output ПАПКА            Зашифрованные результаты и локальный ключ
  --duration СЕКУНДЫ        Короткий замер вместо бесконечного поиска
  --json                    Публичный прогресс в JSON, без сид-фраз
  --control-stdin           Команды pause/resume/stop в JSON через stdin
  --bounceable --testnet    Только Tonkeeper V4/V5
  --ignore-gpu-limit        Разрешить длинные GPU-команды

  npm run cli -- export --file wallet.encrypted.json --output SECRET-TON-backup.json
  --key ФАЙЛ                recovery.key для экспорта из другой папки

Ctrl+C завершает поиск. Секретные слова в терминал не выводятся.
Для переноса сохрани и найденный .encrypted.json, и recovery.key.
`;
