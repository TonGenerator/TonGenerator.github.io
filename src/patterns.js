export function parsePatterns(value,caseSensitive=true){
 const items=Array.isArray(value)?value:String(value||'').split(/[\s,;]+/);
 const seen=new Set(),patterns=[];
 for(const item of items){const text=String(item).trim();if(!text)continue;if(!/^[A-Za-z0-9_-]{1,8}$/.test(text))throw Error('Каждый шаблон: 1–8 латинских букв, цифр, _ или -.');const key=caseSensitive?text:text.toLowerCase();if(!seen.has(key)){seen.add(key);patterns.push(text);}}
 if(!patterns.length||patterns.length>32)throw Error('Добавь от 1 до 32 шаблонов через пробел, запятую или с новой строки.');
 return patterns;
}
export function advanceQueue(queue,pattern){
 if(!queue?.active)return queue;
 const found=Array.isArray(pattern)?pattern:[pattern],completed=queue.completed||queue.patterns.slice(0,queue.index||0);
 const added=queue.patterns.filter(item=>found.includes(item)&&!completed.includes(item));if(!added.length)return queue;
 const done=[...completed,...added],remaining=queue.patterns.filter(item=>!done.includes(item));
 return {...queue,completed:done,remaining,index:done.length,active:remaining.length>0};
}
export function patternsProbability(value,caseSensitive=true,position='suffix'){
 const patterns=parsePatterns(value,caseSensitive),root={next:new Map(),terminal:false};
 for(let pattern of patterns){if(!caseSensitive)pattern=pattern.toLowerCase();if(position==='suffix')pattern=[...pattern].reverse().join('');let node=root;for(const char of pattern){if(!node.next.has(char))node.next.set(char,{next:new Map(),terminal:false});node=node.next.get(char);}node.terminal=true;}
 const probability=node=>node.terminal?1:[...node.next].reduce((sum,[char,next])=>sum+((!caseSensitive&&/[a-z]/.test(char))?2:1)/64*probability(next),0);
 return probability(root);
}
