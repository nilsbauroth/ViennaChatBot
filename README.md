# ViennaChatBot

This is a project for the course "Open Data & Data Ethics" at University of Applied Sciences Technikum Vienna.

The bot is called **@vienna_service_bot** and can be added in Telegram private chats and group chats.

| Starting the bot with `/start`                                                  | Next city bike station                                                          |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src="pictures\demo_image_1.png" alt="small-corrPlot" style="zoom: 40%;" /> | <img src="pictures\demo_image_2.png" alt="small-corrPlot" style="zoom: 40%;" /> |

Members: Nils Bauroth, Sigrid Huemer, Linus Schneider

Goal: creating a Telegram chatbot which lists you interesting points in Vienna near your location. Think of it like a “Vienna Service” Bot. You can list ViennaCityBikes near you or drinking fountains, public toilets etc

Used Data: It may be that we do not manage to include all the datasets, but those are the ones we are interested in (checked boxes are implemented):

- [x] ViennaCityBikes
- [ ] Public Toilets
- [x] Drinking Fountains
- [ ] Cool Streets
- [ ] Recycling places

Tech Stack:

- Telegram BotFather
- Telegraf.js (Telegram Bot Framework)
- Node.js (JavaScript)
- Redis Database
- Google Firebase deployment possible (see branch `firebase`)

Have a look at our [Wiki](https://github.com/nilsbauroth/ViennaChatBot/wiki) for more information about the project and the deployment steps.

## Running the application

### 1. Create a .env file

You need two environment variables (`.env` file inside the root directory).

You can get the telegram bot token by creating a bot with Telegram Botfather ([Telegram: How do I create a bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)).

The redis user password can be retreived from your created free database (e.g. on https://redislabs.com/ - it's free).

For geocoding addresses (address <-> coordinates) we use the service from https://opencagedata.com.

```
BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
REDIS_PASSWORT=<YOUR_REDIS_USER_PASSWORD>
OPENCAGE_API_KEY=<YOUR_OPEN_CAGE_KEY>
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
