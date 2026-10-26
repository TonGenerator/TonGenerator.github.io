import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseLanguage,translate} from '../src/i18n.js';
test('browser language chooses English, with an explicit choice taking priority',()=>{
 assert.equal(chooseLanguage({browser:'en-US'}),'en');
 assert.equal(chooseLanguage({browser:'ru-RU'}),'ru');
 assert.equal(chooseLanguage({browser:'en-GB',saved:'ru'}),'ru');
 assert.equal(chooseLanguage({browser:'ru-RU',saved:'ru',query:'en'}),'en');
 assert.equal(chooseLanguage({browser:'fr-FR',saved:'invalid'}),'ru');
});
test('English covers dynamic multi-pattern progress, estimates and MAX instructions',()=>{
 assert.equal(translate('Ищем одновременно: _GAY · _FURRY. Найдено 1 / 3','en'),'Searching together: _GAY · _FURRY. Found 1 / 3');
 assert.equal(translate('В среднем: ~3 ч','en'),'On average: ~3 h');
 assert.equal(translate('В среднем: ~2 дн','en'),'On average: ~2 days');
 assert.equal(translate('Точный регистр','en'),'Case sensitive');
 assert.equal(translate('Точный регистр','ru'),'Точный регистр');
 assert.equal(translate('CPU + GPU · все потоки · 100%','en'),'CPU + GPU · all threads · 100%');
});
