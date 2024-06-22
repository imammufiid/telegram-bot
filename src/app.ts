import {Telegram} from "./bot/telegram";

Telegram()
  .then(() => {
    console.info("Starting telegram bot")
  })