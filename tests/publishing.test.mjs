import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
test('published pages contain crawlable content, canonical URLs, install/MAX controls and relative assets',async()=>{
 const home=await fs.readFile('dist/index.html','utf8'),install=await fs.readFile('dist/install.html','utf8');
 assert.match(home,/<meta name="robots" content="index,follow">/);assert.match(home,/<link rel="canonical" href="https:\/\/[^"<>]+\/">/);
 assert.match(home,/Бесплатный генератор красивых TON-адресов/);assert.match(home,/application\/ld\+json/);
 assert.match(home,/src="\.\/app.js"/);assert.match(home,/href="\.\/style.css"/);assert.match(home,/id="performance-mode"/);assert.match(home,/data-donate/);
 assert.match(install,/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/releases\/latest/);assert.doesNotMatch(install,/WINDOWS_RELEASE_URL/);
 const robots=await fs.readFile('dist/robots.txt','utf8');assert.match(robots,/Sitemap: https:\/\/.+\/sitemap.xml/);
 const sitemap=await fs.readFile('dist/sitemap.xml','utf8');assert.match(sitemap,/install.html/);assert.doesNotMatch(sitemap,/127\.0\.0\.1|api\//);
});
