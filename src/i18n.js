import {english, dynamicEnglish} from './translations.js';

const storageKey='ton-generator-language';
let language='ru',initialized=false;
export function chooseLanguage({query='',saved='',browser=''}={}){
 return ['en','ru'].includes(query)?query:['en','ru'].includes(saved)?saved:/^en(?:-|$)/i.test(browser)?'en':'ru';
}
export const getLanguage=()=>language;
export const getLocale=()=>language==='en'?'en-US':'ru-RU';
export function translate(value,target=language){
 if(target!=='en'||typeof value!=='string'||!/[А-Яа-яЁё]/.test(value))return value;
 const text=value.trim().replace(/\s+/g,' '),translated=english[text]??dynamicEnglish(text);
 return translated===text?value:value.replace(value.trim(),translated);
}
export function initI18n(){
 if(initialized||typeof document==='undefined')return;
 initialized=true;
 let saved='';try{saved=localStorage.getItem(storageKey)||'';}catch{}
 language=chooseLanguage({query:new URLSearchParams(location.search).get('lang'),saved,browser:navigator.languages?.[0]||navigator.language});
 const originals=new WeakMap();
 const excluded='script,style,code,pre,textarea,input,#seed-words,#words,[data-i18n-ignore]';
 function localize(node){
  if(node.nodeType===3){
   if(!node.parentElement||node.parentElement.closest(excluded))return;
   const value=node.nodeValue,previous=originals.get(node);
   const source=previous&&previous.rendered===value?previous.source:value;
   if(!/[А-Яа-яЁё]/.test(source))return;
   const rendered=translate(source);originals.set(node,{source,rendered});
   if(value!==rendered)node.nodeValue=rendered;
   return;
  }
  if(node.nodeType!==1||node.matches(excluded))return;
  for(const attribute of ['aria-label','title','placeholder']){
   if(!node.hasAttribute(attribute))continue;
   const key=node.getAttributeNode(attribute),value=key.value,previous=originals.get(key);
   const source=previous&&previous.rendered===value?previous.source:value,rendered=translate(source);
   if(/[А-Яа-яЁё]/.test(source))originals.set(key,{source,rendered});
   if(value!==rendered)key.value=rendered;
  }
  for(const child of node.childNodes)localize(child);
 }
 function refresh(){
  document.documentElement.lang=language;
  for(const button of document.querySelectorAll('[data-language]'))button.setAttribute('aria-pressed',String(button.dataset.language===language));
  localize(document.head);localize(document.body);
 }
 for(const button of document.querySelectorAll('[data-language]'))button.addEventListener('click',()=>{
  language=button.dataset.language;try{localStorage.setItem(storageKey,language);}catch{}
  refresh();document.dispatchEvent(new Event('generator-language-change'));
 });
 refresh();
 const observer=new MutationObserver(records=>{
  const changed=new Set();
  for(const record of records){if(record.type==='childList')record.addedNodes.forEach(node=>changed.add(node));else changed.add(record.target);}
  for(const node of changed)localize(node);
 });
 observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
}
