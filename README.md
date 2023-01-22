# Node.js CRUD API

Простой Node.js сервер с базой данных в оперативной памяти, который может обрабатывать запросы `GET`, `POST`, `PUT` и `DELETE`

Для запуска приложения потребуется [Node.js](https://nodejs.org/en/download/) 18 версии или выше c менеджером пакетов npm и система контроля версий [Git](https://git-scm.com/downloads). Скачайте и установите их по ссылкам

---

## 1. Подготовка файлов приложения

Склонируйте этот репозиторий командой:

```
git clone https://github.com/freczz/nodejs-crud-api.git
```

или по ssh

```
git clone git@github.com:freczz/nodejs-crud-api.git
```

Перейдите в только что созданную папку:

```
cd nodejs-crud-api
```

Установите зависимости командой:

```
npm i
```

## 2. Запуск приложения

Для удобства запуска приложения имеет ряд скриптов для запуска или сборки в разных режимах.

Команда

```
npm run start:prod
```

собирает продакшн билд в режиме без горизонтального масштабирования и запускает его.

Команда

```
npm run start:dev
```

запускает приложение в режиме разработки без горизонтального масштабирования. В этом режиме можно вносить изменения в код приложения, оно будет автоматически перезапускаться при сохранении изменений.

Для выхода из приложения нажмите на клавиатуре `CTRL+C` и подтвердите выход или просто закройте командную строку, в которой запущено приложение.

---

## 3. Использование приложения

Рекомендуется использование программы [Postman](https://www.postman.com/) для отправки запросов.

Приложение поддерживает только методы `GET`, `POST`, `PUT` и `DELETE`.

Пользователи в базе данных хранятся в виде объектов:

```ts
{
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
```

id пользователя является неизменяемым и генерируется на сервере в момент создания пользователя. Остальные поля являются **ОБЯЗАТЕЛЬНЫМИ** для передачи в запросах, если запрос должен содержать тело.

При `GET` запросе на `http://localhost:${YOUR_PORT}/api/users` приложение возвращает список всех пользователей в формате JSON.

При `GET` запросе на `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` приложение возвращает пользователя с переданным `id === SOME_USER_ID`. Если пользователь с таким id не найден, то приложение отвечает 404 ошибкой.

При `POST` запросе на `http://localhost:${YOUR_PORT}/api/users` с телом, содержащим все обязательные поля, в базе данных создаётся новая запись о пользователе. Ей присваевается уникальный id. Приложение отвечает только что созданной новой записью с пользователем.

При `PUT` запросе на `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` с телом, содержащим все обязательные поля, в базе данных происходит перезапись данных ранее созданного пользователя. id пользователя при этом не меняется. Если пользователь с таким id не найден, то приложение отвечает 404 ошибкой.

При `DELETE` запросе на `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` из базы данных удаляется запись о пользователе с `id === SOME_USER_ID`. Если пользователь с таким id не найден, то приложение отвечает 404 ошибкой.

Приложение отвечает 400 ошибкой на запросы с другими методами, запросы на несуществующие url адреса, запросы с невалидными id или телом содержащим не все обязательные поля. Приложение реализовано таким образом, что значения обязательных полей никак не проверяются, кроме как на соответствие ожидаемому типу. Таким образом пустые строки в именах, отрицательные значения возраста и пр. является допустимым. Приложение игнорирует любые лишние поля в `POST` и `PUT` запросах, никак их не сохраняя.

---

## 4. Запуск тестов

Команда

```
npm run test
```
