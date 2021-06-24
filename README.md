# ViennaChatBot

Members: Nils Bauroth, Sigrid Huemer, Linus Schneider

Goal: creating a Telegram chatbot which lists you interesting points in Vienna near your location. Think of it like a “Vienna Service” Bot. You can list ViennaCityBikes near you or drinking fountains, public toilets etc

Used Data: It may be that we do not manage to include all the datasets, but those are the ones we are interested in (checked boxes are implemented):

- [x] ViennaCityBikes
- [ ] Public Toilets
- [x] Drinking Fountains
- [ ] Cool Streets
- [ ] Mistplätze

Tech Stack:

- Telegram Bot API
- Telegram BotFather
- JavaScript
- Node JS

Approach: We begin with using ViennaCityBike data and build our bot around this use case.

## Running the application

### 1. Create a .env file

You need two environment variables (`.env` file inside the root directory).

You can get the telegram bot token by creating a bot with Telegram Botfather ([Telegram: How do I create a bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)).

The redis user password can be retreived from your created free database (e.g. on https://redislabs.com/ - it's free).

```
BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
REDIS_PASSWORT=<YOUR_REDIS_USER_PASSWORD>
```

### 2. Start the application

First install all required libraries with

```
npm install
```

Then start the app with

```
npm run start
```

## Building the application for production

You can build the application with

```
npm run build
```

This creates a `dist` folder with the babel-transpiled files.

After that, run

```
npm run start:prod
```

to run the files from the `dist` folder.
