import test from 'node:test';import assert from 'node:assert/strict';import {repositoryCommands,archiveCommands} from '../src/install.js';import {parseOptions} from '../cli/options.mjs';
test('Linux installation commands are ready to copy for CPU and optional GPU',()=>{
 assert.match(archiveCommands(),/^unzip .*\ncd ~\/generator-ton-username\nbash scripts\/install-linux.sh\n\.\/generator-ton/);
 assert.match(archiveCommands(true),/install-linux.sh --gpu/);assert.match(archiveCommands(true),/--engine hybrid --threads auto --gpu-load 50/);
 assert.match(repositoryCommands('https://github.com/example/project.git',true),/^git clone 'https:\/\/github.com\/example\/project.git' generator-ton-username\n/);
});
test('MAX guide installs GPU support and generates a command with full CPU and GPU activity',()=>{
 for(const commands of [archiveCommands('max'),repositoryCommands('https://github.com/example/project','max')]){
  assert.match(commands,/install-linux.sh --gpu/);
  const command=commands.split('\n').at(-1),parsed=parseOptions(command.split(' ').slice(1),24);
  assert.equal(parsed.options.computeEngine,'hybrid');assert.equal(parsed.options.performanceMode,'max');
  assert.equal(parsed.threads,24);assert.equal(parsed.cpuLoad,1);assert.equal(parsed.options.gpuDuty,1);
 }
});
test('repository input cannot insert shell commands or point outside GitHub HTTPS',()=>{
 for(const url of ['https://github.com/user/project;id','https://github.com/user/project%27','https://github.com/user/project?x=$(id)','https://evil.test/user/project','http://github.com/user/project','https://token@github.com/user/project','https://github.com/user/project/tree/main',"https://github.com/user/repo'\nrm -rf x",'javascript:alert(1)'])assert.equal(repositoryCommands(url),null);
});
