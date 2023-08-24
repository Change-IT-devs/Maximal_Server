# Maximal_Server

> Серверная часть проекта (Backend)

---

# Технологии в этом части:
- **Node.js** — основная технология;
- **Express** — для оброботки **I/O** запросов на сервер;
- **MongoDB** — использован в качестве базы данных;
- **mongoose** (ODM) — создание ***Модели(Schema)*** для базы данных **MongoDB**;
- **JWT** — для обработки авторизацию.

---

# Для запуска коды:

1. Скачайте или клонируйте исходники — [здесь(Maximal_server)](https://github.com/maximal-controller/Maximal_Server);
```bash
$ git clone https://github.com/maximal-controller/Maximal_Server.git
$ cd Maximal_Server
```

2. Установите пакеты с помощью ***npm***:
```bash
$ npm install 
```

3. Создайте новый файл с названием `.env` и добавьте нужные переменные(***Environment Variables***);
```env
PORT=<порт для запуска сервера, например "5000|8080">
JWT_EXPIRE=<определяет время для истекание JWT токен, например, "30m|15m|1h" >
ACCESS_TOKEN_SECRET=<секретная слова для JWT токен>
ATLAS_URI=<mongodb подключение URI>
// Вы сможете использовать тестовую базу данных,подключая этот URI "mongodb+srv://Dilrozbek_Raximov:931897318Rd@cluster0.e9gps.mongodb.net/maximal-demo"
```

4. Запускайте проект локально:
```bash
$ npm start
```

---

# Требования
- Node.js v16.0.0 или новее (предпочтительно v18).
