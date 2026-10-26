import fs from 'node:fs/promises';
const intro=`# GENERATOR TON USERNAME · Google Colab

Полный поиск новых адресов: Telegram WalletTg, Tonkeeper V4R2 и V5R1. Настройки, CPU / GPU / CPU+GPU, тест скорости, запуск, пауза, остановка и скачивание кошелька — в панели.

1. Для GPU выбери **Среда выполнения → Сменить среду выполнения → GPU** до запуска ячейки. Для CPU менять ничего не нужно.
2. Запусти ячейку ниже ▶. Выбери **generator-ton-username.source.zip**, скачанный с сайта генератора. Либо укажи публичный репозиторий в поле GitHub.
3. В появившейся панели выбери устройство, нажми **Подготовить среду**, затем **Тест скорости** или **Начать поиск**. Для первого теста попробуй 2–3 символа.
4. При совпадении скачай **Архив с ключом**. Для импорта доступна отдельная кнопка скачивания JSON с открытыми словами.

Панель показывает ожидаемую дату нахождения и даты для вероятностей 50% / 95%, пересчитываемые по текущей скорости. Это оценка, без гарантии. Время по умолчанию UTC+7, его можно сменить. У теста есть время автоматической остановки.

**Секретные слова создаются в облаке Google.** Не загружай существующие сид-фразы. Файлы среды временные: скачай результат до отключения. Архив включает ключ расшифровки и даёт доступ к кошельку — не публикуй его. Слова не выводятся в ячейки блокнота. При публикации убери вывод ячеек с адресами и настройками.

Этот движок GPU использует **WebGPU/Vulkan**. NVIDIA GPU в Colab может не иметь нужного Vulkan-драйвера: панель проверит доступ и сообщит об ошибке; в такой среде доступен CPU. Выделенная модель GPU, время сеанса и лимиты зависят от Colab. Панель не обходит ограничения сервиса.

[Официальные ограничения Colab](https://research.google.com/colaboratory/faq.html)
`;
const bootstrap=await fs.readFile('colab/bootstrap.py','utf8');
const source=`# @title Запустить панель генератора\nrepository_url = "" # @param {type:"string"}\n\n${bootstrap}\n\nlaunch_notebook(repository_url)\n`;
const lines=value=>value.split(/(?<=\n)/);
const notebook={cells:[{id:'ton-intro',cell_type:'markdown',metadata:{},source:lines(intro)},{id:'ton-launch',cell_type:'code',execution_count:null,metadata:{cellView:'form'},outputs:[],source:lines(source)}],metadata:{colab:{name:'GENERATOR_TON_USERNAME_Colab.ipynb',provenance:[]},kernelspec:{display_name:'Python 3',name:'python3'},language_info:{name:'python'}},nbformat:4,nbformat_minor:5};
for(const folder of ['colab','dist','release']){await fs.mkdir(folder,{recursive:true});await fs.writeFile(`${folder}/GENERATOR_TON_USERNAME_Colab.ipynb`,JSON.stringify(notebook,null,2)+'\n','utf8');}
console.log('Built interactive Google Colab notebook.');
