# Проектная (учебная) практика
# Базовая часть (Документация по созданию статического сайта)
## Введение
Документация описывает процесс разработки статического сайта, созданного в рамках базовой части проектной практики. Сайт содержит основную информацию о проекте, его участниках, ходе выполнения и ресурсах

- **Формат создания сайта**: Использования языков HTML и CSS
- **Репозиторий**: [Папка site](https://github.com/Kristinkins/Practice/tree/master/site)
- **Стек технологий**: HTML, CSS
___
## Структура сайта
#### Основные страницы:
| Страница       | Назначение                                             |
|----------------|--------------------------------------------------------|
|Главная         |Страница с аннотацией проекта                           |
|О проекте       |Описание проекта и его цели, задачи, проблематика и т.д.|
|Моя роль        |Описание моей роли в проекте и начало исследования      |
|Исследование    |Страница с ходом исследования, результаты анализа       |
|Ресурсы         |Полезные ссылки на источники информации для исследования|
___
# Процесс разработки
## 1. Установка инструментов для создания сайта
Прежде чем начать создание сайта, необходимо установить среду, где будет выполняться работа. Для этой задачи был выбран Visual Studio Code.
Также были установлены расширения, для облегчения и ускорения работы:
| Расширение           | Назначение                                                                |
|----------------------|---------------------------------------------------------------------------|
|Live Server           |Запускает сайт с автообновлением                                           |
|Auto Rename Tag       |Автоматически переименовывает парные HTML-теги                             |
|Auto Complete Tag     |Автоматически закрывает HTML/XML-теги при вводе                            |
|Auto Close Tag        |Автоматически добавляет закрывающий тег при вводе >                        |
|eCSStractor for VSCode|Позволяет выносить CSS из HTML-файлов в отдельный .css-файл                |
|indent-rainbow        |Подсвечивает отступы (indents) в коде разными цветами для лучшей читаемости|
## 2. Создание структуры сайта
После того как все было подготовлено, необоходимо было определить структуру сайта. Так как требовалось создать всего 5 страниц, было принято решение сделать все эти страницы главными с быстрым доступом из header.
Чтобы это реализовать, первым делом было создано 5 файлов с расширением html для каждой из страниц.

## 3. Стили
На этапе проектирования я создала наброски будущего интерфейса. Реализация стилей происходит с помощью языка CSS. Файл с данным расширением был подключен к html с помощью ссылки:
```HTML
<link rel="stylesheet" href="./style.css">
```
Реализация стилей в CSS осуществлялась по мере добавления элементов через набор правил, которые описывают, как они должны отображаться на веб-странице. 
## 4. Верстка
Заранее были определены цели страниц и для них был подготовлен соответствующий контент.
Использовался язык разметки HTML. Шапка сайта была оформлена с помощью тега header, где был размещен логотип и главное навигационное меню. Основное содержимое страницы заключено в тег main, разбитого на логические секции section. Для подвала использован footer с контактной информацией и ссылками на социальные сети. Работа с изображениями проводилась через JavaScript и CSS, изображения увеличиваются при наведении, а также открываются в полный размер при нажатии.
#### Текст
Текст — основной элемент контента. В HTML он добавляется с помощью тегов, которые определяют его семантику и оформление:
- Заголовки (```<h1>```–```<h6>```) — для структурирования контента (например, ```<h1>```Главный заголовок```</h1>```).
- Абзацы (```<p>```) — для основного текста (```<p>```Это абзац текста.```</p>```).
- Списки — нумерованные (```<ol>```) и маркированные (```<ul>```), где каждый пункт — ```<li>```.
- Ссылки (```<a href="...">Текст</a>```) — для навигации и внешних ссылок.
- Выделение текста — ```<strong>``` (важность), ```<em>``` (акцент), ```<mark>``` (подсветка), ```<code>``` (код).
#### Изображения
Изображения вставляются тегом ```<img>``` с обязательным атрибутом src (путь к файлу) и альтернативным текстом (alt):
```HTML
<img src="./resources/лого_texel.png" alt="" class="support__img">
```
## Интерактивная часть
Интерактивная часть сайта разрабатывалась на JavaScript без использования сторонних библиотек. Было реализовано несколько ключевых функций: 
- все изображения немного увеличиваются при наведении курсора;
- все изображения можно открыть в полный размер и зарыть с помощью крестика;
- для прототипа нейрофоторамки добавлено несколько изображений, которые можно открыть и пролистать.
```JS
document.addEventListener('DOMContentLoaded', function() {
    //Обычное модальное окно для одиночных изображений
    const popup = document.createElement('div');
    popup.className = 'pop-up';
    popup.style.display = 'none';
    popup.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="" alt="" class="popup-img">
    `;
    document.body.appendChild(popup);

    // Модальное окно для галереи 
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length > 0) {
        const galleryModal = document.createElement('div');
        galleryModal.className = 'gallery-modal';
        galleryModal.style.display = 'none';
        galleryModal.innerHTML = `
            <span class="gallery-close">&times;</span>
            <span class="gallery-prev">&#10094;</span>
            <span class="gallery-next">&#10095;</span>
            <div class="gallery-modal-content">
                <img class="gallery-modal-img" src="" alt="">
            </div>
            <div class="gallery-counter"></div>
        `;
        document.body.appendChild(galleryModal);

// Логика для галереи
        let currentGalleryIndex = 0;
        const modalImg = galleryModal.querySelector('.gallery-modal-img');
        const galleryCounter = galleryModal.querySelector('.gallery-counter');

        function updateGalleryModal(index) {
            currentGalleryIndex = index;
            const img = galleryImages[currentGalleryIndex];
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            galleryCounter.textContent = `${currentGalleryIndex + 1}/${galleryImages.length}`;
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                updateGalleryModal(index);
                galleryModal.style.display = 'flex';
            });
        });

        galleryModal.querySelector('.gallery-close').addEventListener('click', function() {
            galleryModal.style.display = 'none';
        });

        galleryModal.querySelector('.gallery-prev').addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryModal(currentGalleryIndex);
        });

        galleryModal.querySelector('.gallery-next').addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            updateGalleryModal(currentGalleryIndex);
        });

        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
                    updateGalleryModal(currentGalleryIndex);
                } else if (e.key === 'ArrowRight') {
                    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
                    updateGalleryModal(currentGalleryIndex);
                } else if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                }
            }
        });
    }

    // Логика для обычных изображений
    const images = document.querySelectorAll('img:not(.gallery-image)'); // Все изображения кроме галереи
    
    images.forEach(img => {
        // Проверяем, не является ли родитель изображения галереей
        if (!img.closest('.gallery-container')) {
            img.addEventListener('click', function() {
                const popupImg = popup.querySelector('.popup-img');
                popupImg.src = this.src;
                popupImg.alt = this.alt;
                popup.style.display = 'flex';
            });
        }
    });

    popup.querySelector('.close-btn').addEventListener('click', function() {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (popup.style.display === 'flex' && e.key === 'Escape') {
            popup.style.display = 'none';
        }
    });
});
```
# Используемые инструменты
В работе над проектом были использованы такие истуременты как:

1. Язык разметки HTML
2. Язык стилей CSS
3. JavaScript 
4. Технология Git и сайт GitHub для выгрузки проекта в общедоступный репозиторий
5. Visual Studio Code для работы с кодом и написания контента для сайта
