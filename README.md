# Каноническая работа 🍔 Stellar Burger 

[Stellar Burgers](https://spamjacket.github.io/react-stellar-burger/) - страница на хостинге GH Pages

## О проекте
__Stellar Burgers__ — проект космической бургерной.
Здесь вы можете создать свой собственный бургер, добавив в него все что только душа пожелает. Ваш бургер будет приготовлен, а отслеживать вы это сможете, либо на общей ленте заказов, либо на своей __личной__ в профиле.
Кстати, да, у вас будет свой профиль! И если вы не захотите быть Иваном Ивановым, то всегда сможете изменить свое имя.

## О реализацие

* Проект _свёрстан_ для desktop-разрешения.
* Проект обладает _отзывчивым_ интерфейсом.
* Проект реализован на __React__ с использованием __Redux-хранилища__.
* Для асинхронных операций с хранилищем используются __усилители__ (thunks).
* Проект поддерживает работу с __Redux DevTools__.
* В проекте используются __только__ _функциональные компоненты_.
* Для доступа к классовым возможностям используются __хуки__.
* Данные о доступных к заказу ингредиентах подгружаются с сервера с использованием API.
* Для запросов к API сервера подготовлена _универсальная fetch-функция_.
* Меню списка ингредиентов _интерактивно_: по нажатию на тип ингредиента происходит скролл к соответствующей категории; при сколле ингредиентов, тип ингредиента в меню переключается.
* Реализована __Drag'n'Drop__ функциональность:
  * Перетаскивание карточки ингредиента _в зону конструктора_ добавляет ингредиент в конструктор.
  * Перетаскивание элементов _внутри конструктора_ меняет их порядок (кроме булочек).
* Клик на _карточке_ ингредиента открывает модальное окно с подробным описанием.
* Клик на кнопке `Оформить заказ` открывает модальное окно с подтверждением и номером заказа, конструктор при этом очищается.
* Генерация номера заказа происходит путем отправки запроса с массивом из id ингредиентов на сервер.
* Заказ доступен от _одного_ любого ингредиента (булочки приобретаются парой, две разные булочки заказать нельзя).
* Итоговая стоимость подсчитывается _динамически_ в зависимости от набора ингредиентов, добавленных в конструктор.
* Приложение использует роутинг, реализованный с помощью __React Router__.
* Приложение содержит защищенные __HOC-компонентом__ роуты для авторизованных и неавторизованных пользователей.
* Реализован функционал __личного кабинета__ с регистрацией/логинингом, восстановлением пароля, профилем пользователя.
* Авторизация и соответствующие запросы к серверу построены на принципах использования __уникальных токенов__ (accessToken, refreshToken).
* Для запросов, использующих accessToken, реализована универсальная fetch-функция, производящая его обновление в случае окончания времени его жизни.
* Для работы с формами используется _кастомный хук_ __useForm__.
* Сборка проекта, минимизация и транспиляция кода на JS происходит с помощью инструмента __Webpack__ и сопутствующих плагинов.
* В последних версиях бургерной весь код типизирован с использование TypeScript

## Стек технологий

![JS](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white) ![TS](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-blue?style=for-the-badge&logo=css3&logoColor=white)

![React](https://img.shields.io/badge/react-blue?style=for-the-badge&logo=react&logoColor=white) ![React DevTools](https://img.shields.io/badge/React_DevTools-blue?style=for-the-badge) ![React DnD](https://img.shields.io/badge/React_DnD-blue?style=for-the-badge) ![React Router](https://img.shields.io/badge/React_Router-blue?style=for-the-badge) ![Redux](https://img.shields.io/badge/redux-purple?style=for-the-badge&logo=redux&logoColor=white) ![React-Redux](https://img.shields.io/badge/react_Redux-purple?style=for-the-badge) ![Redux-Thunk](https://img.shields.io/badge/redux_Thunk-purple?style=for-the-badge)

![WebPack](https://img.shields.io/badge/WebPack-grey?style=for-the-badge&logo=webpack&logoColor=white) ![Babel](https://img.shields.io/badge/Babel-grey?style=for-the-badge&logo=babel&logoColor=yellow)

### Инструкция по запуску на локальной машине

- Установить [Node.js](https://nodejs.org/ru/)
- Клонировать репозиторий `git clone git@github.com:SpamJacket/react-stellar-burger.git`
- Установить зависимости `npm install`
- Запустить приложение `npm run start`
