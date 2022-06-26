# Remindenator

_A simple reminder bot for Telegram._

## Want to host it by yourself?

1. Clone this repository onto your server

```
git clone https://github.com/IGUNUBLUE/remindenator-bot.git
```

2. Install all the dependencies - You'll need `npm` installed!

```
npm install
```

3. Rename `.env.example` to `.env`, add your api key (you can create a new bot and obtain a key using [@BotFather](http://t.me/BotFather)), mongodb url connection and your database name.

4. You can either run it on the shell with `npm start` or in background using pm2 `pm2 start index.js`

Note: it requires MongoDB to run! You can specify the MongoDB uri and the database name into the `.env` file. You'll just need to create a database and create a couple of collections named `events` and `groups` respectively
