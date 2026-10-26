#!/usr/bin/env node
import {parseOptions,help} from '../cli/options.mjs';
import {runSearch} from '../cli/run.mjs';
import {exportWallet} from '../cli/vault.mjs';
let parsing=true;
try{
  if(Number(process.versions.node.split('.')[0])<22)throw Error('Нужен Node.js 22 или новее. Рекомендуется Node.js 24 LTS.');
  const config=parseOptions(process.argv.slice(2));
  parsing=false;
  if(config.help)process.stdout.write(help);
  else if(config.command==='export'){
    await exportWallet(config.file,config.output,config.key);
    process.stdout.write('Секретная копия сохранена: '+config.output+'\nОна содержит сид-фразу. Не загружай её в GitHub.\n');
  }else process.exitCode=await runSearch(config);
}catch(error){
  const safe=parsing?error.message:error.code==='EEXIST'?'Файл уже существует: перезапись запрещена.':error.code==='EACCES'||error.code==='EPERM'?'Нет доступа к папке или файлу результата.':'Не удалось выполнить действие. Проверь параметры, путь результата и ключ восстановления (на Linux нужны права 600).';
  process.stderr.write(safe+'\n');process.exitCode=1;
}
