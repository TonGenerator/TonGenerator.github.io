import fs from 'node:fs/promises';
const config=JSON.parse(await fs.readFile('site.config.json','utf8'));
const site=new URL(process.env.SITE_URL||config.url);
if(site.protocol!=='https:'||site.username||site.password||site.search||site.hash)throw Error('SITE_URL must be a public HTTPS website URL');
if(!site.pathname.endsWith('/'))site.pathname+='/';
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const title='GENERATOR TON USERNAME — генератор красивых TON-адресов';
const description='Бесплатный генератор красивых TON-адресов для Telegram WalletTg и Tonkeeper V4/V5. CPU и GPU, несколько шаблонов, приложение Windows и установка Linux.';
for(const [file,pageTitle,copy] of [['index.html',title,description],['install.html','GENERATOR TON USERNAME · Установка','Скачай генератор TON-адресов для Windows, установи на Linux или запусти панель в Google Colab. Инструкции для CPU, GPU и MAX.']]){
 let html=await fs.readFile('dist/'+file,'utf8');const url=new URL(file==='index.html'?'./':file,site).href;
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${pageTitle}</title>`).replace(/<meta name="description"[^>]*>\s*/g,'');
 let tags=`<meta name="description" content="${escape(copy)}">\n<meta name="robots" content="index,follow">\n<link rel="canonical" href="${escape(url)}">\n<meta property="og:title" content="${escape(pageTitle)}">\n<meta property="og:description" content="${escape(copy)}">\n<meta property="og:url" content="${escape(url)}">\n<meta property="og:type" content="website">\n<meta property="og:locale" content="ru_RU">\n<meta name="twitter:card" content="summary">\n`;
 for(const [variable,name] of [['GOOGLE_SITE_VERIFICATION','google-site-verification'],['YANDEX_SITE_VERIFICATION','yandex-verification']]){const value=process.env[variable];if(value){if(!/^[A-Za-z0-9_-]{1,200}$/.test(value))throw Error('Invalid verification token');tags+=`<meta name="${name}" content="${value}">\n`;}}
 if(file==='index.html')tags+=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:'GENERATOR TON USERNAME',url,description,applicationCategory:'UtilitiesApplication',operatingSystem:'Windows, Linux, Web',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}})}</script>\n`;
 html=html.replace('</head>',tags+'</head>');await fs.writeFile('dist/'+file,html,'utf8');
 if(file==='install.html'){const repository=process.env.GITHUB_REPOSITORY||config.repository;if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository))throw Error('Invalid repository');html=html.replace('WINDOWS_RELEASE_URL',`https://github.com/${repository}/releases/latest`);await fs.writeFile('dist/'+file,html,'utf8');}
}
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',site).href}\n`,'utf8');
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','install.html'].map(file=>`<url><loc>${escape(new URL(file,site).href)}</loc></url>`).join('')+'</urlset>\n','utf8');
await fs.writeFile('dist/.nojekyll','','utf8');
await fs.writeFile('dist/404.html',`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Страница не найдена</title><h1>Страница не найдена</h1><a href="${escape(site.href)}">Открыть генератор TON</a></html>\n`,'utf8');
console.log('SEO ready: '+site.href);
