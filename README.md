# Google Book Searcher

Приложение, позволяющее искать книги через [Google Books API](https://developers.google.com/books)

<br />

[Посмотреть деплой](https://proehavshiy.github.io/google-books-searcher/)

<br/>

## Экосистема
* `React SPA`
* `redux`, `react-redux`, `redux-toolkit`, `Thunk` - хранилище, `redux-persist` - для кеширования хранилища в LocalStorage
* `uniqid` -  для уникальных айди
* `sass` -  для scss
* `classnames` - для модулей scss
* `ESlint` - для линтинга
* `gh-pages` - деплой
* `Docker` - для запуска в контейнере

## Функционал
### Элементы
- [x] Форма из инпута ключевой фразы и селектора категорий. Сабмит-кнопка неактивна при пустом инпуте
- [x] При запросе в форме не с главной страницы - редирект на главную с найденными карточками
- [x] Счетчик полученных книг из запроса
- [x] Фильтрация полученных книг по релефантности, старым и новым изданиям (дропдаун показывается, если найдены книги, и скрыт, если ничего не найдено)
- [x] Пагинация с шагом 30 и подгрузкой по кнопке
- [x] Фильтрация дублей результатов запроса к Google Books API
- [x] Заглушки всех элементов книги в случае отсутствия данных в ответе сервера (Картинка, название, автор, дата и тд)
### Информация о статусах 
- [x] Спиннер загрузки
- [x] Попап-информатор об ошибке сервера
- [x] Информатор дефолтного состояния блока с карточками до запроса 
### Роутинг
- [x] Главная страница поиска
- [x] Страница конкретной книги с динамическим роутом
- [x] 404 страница
### Хранилище
- [x] Организовано модульно через Slice
- [x] все стейты сохраняются локально при перезагрузке страницы
- [x] Все reducers и middleware вынесены в отдельные файлы
### Безопасность
- [x] API-ключ вынесен в .env и не хранится в коде
### Верстка
- [x] Адаптивная до 320px

## Reference
* [ТЗ](https://github.com/fugr-ru/frontend-javascript-test-2)

## Команды:
* clone branch with ``
* `npm run start` - run the project
* `npm run build` - build final version
* `npm run deploy` - deploy the project to gh-pages
* `npm run lint` - lint all files
* `npm run lint:fix` - fix all fixable files
### Docker
* `npm run image` - create Docker image
* `npm run container` - run container
* `npm run stop` - stop & delete container
### Docker Make
* `make build` - create Docker image
* `make run` - run container
* `make stop` - stop & delete container
* `make check` - check all containers


