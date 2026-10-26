# Публикация GENERATOR TON USERNAME

## Как получить tongenerator.github.io

Адрес `<owner>.github.io` привязан к имени аккаунта или организации GitHub. Репозиторий `TonGenerator` в аккаунте `AlexFordash` даст `https://alexfordash.github.io/TonGenerator/`, а не отдельный поддомен.

Чтобы получить именно **https://tongenerator.github.io/**, создай организацию **TonGenerator** под своим аккаунтом AlexFordash и репозиторий **tongenerator.github.io** внутри неё. GitHub должен разрешить занять это имя; отсутствие публичной страницы не гарантирует доступность. Переименовывать личный аккаунт не требуется. [Правила адресов GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## 1. Создай организацию и репозиторий

1. Войди в [GitHub](https://github.com/AlexFordash).
2. Аватар → **Your organizations → New organization**. Выбери бесплатный план и имя **TonGenerator**, если оно доступно. Подтверди создание сам.
3. В организации создай **Public** репозиторий с именем **tongenerator.github.io**. Поля README, license и .gitignore оставь пустыми: исходники уже подготовлены.

Если имя занято, используй личный аккаунт: репозиторий **TonGenerator** даст **https://alexfordash.github.io/TonGenerator/**. Сборка сама подставит правильные ссылки и canonical. Во всех командах ниже тогда замени `TonGenerator/tongenerator.github.io` на `AlexFordash/TonGenerator`.

## 2. Загрузи исходники

Скачай **generator-ton-username.source.zip** с кнопки «Установить» либо возьми файл `release/generator-ton-username.source.zip`. Распакуй **в новую папку**. Не загружай рабочую папку генератора целиком: в ней могут находиться результаты и локальные ключи.

Установи [Git for Windows](https://git-scm.com/downloads/win), если его ещё нет. Открой терминал в распакованной папке и выполни:

```powershell
git init -b main
git add .
git commit -m "Publish TON generator"
git remote add origin https://github.com/TonGenerator/tongenerator.github.io.git
git push -u origin main
```

Если Git попросит имя и email автора коммита, укажи свои данные по его подсказке. Вход в GitHub подтверди в браузере; токены и пароли в исходники не вставляй. Также можно загрузить содержимое архива через GitHub Desktop, сохранив папку `.github/workflows/`.

## 3. Включи сайт

1. В репозитории: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Открой **Actions → Publish website → Run workflow → main → Run workflow**.
3. Дождись зелёных `build` и `deploy`. Ссылка появится в **Settings → Pages**.
4. Открой главную и попробуй короткий шаблон из 1–2 символов. Проверь кнопку «Установить», CPU/GPU и донат.

Workflow `.github/workflows/pages.yml` устанавливает зависимости, собирает сайт и публикует только `dist`. Node-сервер для GitHub Pages не требуется. Следующие обновления публикуются после push в `main`. [Официальная инструкция GitHub Actions для Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 4. Добавь скачивание Windows-программы

Сборка `release/GENERATOR-TON-USERNAME-windows-x64.zip` предназначена для **GitHub Releases**, а не для коммита в исходники или загрузки в Pages.

1. В репозитории: **Releases → Draft a new release**.
2. Создай тег, например `v1.2.0`, для ветки `main`.
3. Прикрепи `GENERATOR-TON-USERNAME-windows-x64.zip` и опубликуй релиз.
4. Кнопка Windows на странице установки откроет последний релиз. Пользователь распаковывает архив в отдельную папку и запускает `GENERATOR TON USERNAME.exe`.

Программа работает через `http://127.0.0.1:11111/`, остаётся в трее. Правой кнопкой доступны пауза, остановка, автозапуск, удаление и выход. Удаление сохраняет кошельки в папке данных Windows. EXE не подписан сертификатом разработчика.

## 5. Индексация Google и Яндекс

Уже подготовлены заголовки и описания, canonical, Open Graph, статический текст, `robots.txt`, `sitemap.xml`, разметка SoftwareApplication и мобильная версия. Сайт должен быть публичным и открываться по HTTPS.

**Google:**

1. Открой [Google Search Console](https://search.google.com/search-console/), добавь ресурс с префиксом URL `https://tongenerator.github.io/` (либо фактический адрес из Pages).
2. Выбери подтверждение **HTML-тег**. Скопируй только значение `content` из `google-site-verification`.
3. GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**. Имя **GOOGLE_SITE_VERIFICATION**, значение — этот код.
4. Повторно запусти **Publish website**, затем подтверди владение в Search Console.
5. В **Sitemaps** отправь `sitemap.xml`. В проверке URL запроси индексацию главной страницы.

**Яндекс:** добавь фактический адрес в [Яндекс Вебмастер](https://webmaster.yandex.ru/), выбери метатег, запиши его код в переменную **YANDEX_SITE_VERIFICATION**, повторно опубликуй и подтверди. Отправь тот же sitemap.

Для сайта в подпапке отправляй полный URL, например `https://alexfordash.github.io/TonGenerator/sitemap.xml`. Поисковики читают robots.txt в корне домена; файл в подпапке не управляет всем доменом. Публикация sitemap и запрос индексации помогают обнаружить страницы, но не гарантируют сроки или позицию в выдаче. [Документация Google по sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Обновление

В своей папке исходников внеси изменения, затем:

```powershell
git add .
git commit -m "Update generator"
git push
```

Не публикуй `recovery.key`, секретные JSON, архивы с кошельками и данные из `%APPDATA%\GENERATOR TON USERNAME`. Подготовленный source ZIP и `.gitignore` исключают локальные результаты, runtime, EXE, логи и зависимости.
