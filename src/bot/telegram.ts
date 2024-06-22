import TelegramBot from "node-telegram-bot-api";
import {BOT_TOKEN, commands, keyword} from "../constants";
import {uploader} from "../imgbb/uploader";
import {removeBg} from "../background-remover/removebg/removeBg";
import * as path from "node:path";
import fs from "node:fs";
import {imgLy} from "../background-remover/imgly/imgLy"; // Node.js Buffer to Blob utility

export const Telegram = async () => {
  let isBgRemover = false
  const options = {
    polling: true
  }

  const bot = new TelegramBot(BOT_TOKEN, options)

  /**
   * Setting up command
   */
  await bot.setMyCommands(commands)

  /**
   * Setting up callback "/hai" from telegram
   */
  bot.onText(keyword.sayHi, async (data) => {
    await bot.sendMessage(data.from.id, "Halo juga!")
  })

  /**
   * Setting up callback "/myname" from telegram
   */
  bot.onText(keyword.myName, async (data) => {
    await bot.sendMessage(data.from.id, data.from.username)
  })

  /**
   * Setting up callback "/gempa" from telegram
   */
  /*bot.onText(keyword.gempa, async (data) => {
    const URL = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const call = await fetch(URL + 'autogempa.json')
    const {
      Infogempa: {
        gempa: {
          Tanggal, Jam, Magnitude, Wilayah, Potensi, Kedalaman, Shakemap
        }
      }
    } = await call.json()

    const image = URL + Shakemap
    const result = `
*Berita Gempa Terkini!*
Waktu: ${Tanggal} - ${Jam},
Besaran Gempa: ${Magnitude} SR,
Kedalaman: ${Kedalaman}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
  `
    await bot.sendPhoto(data.from.id, image, {caption: result})
  })*/

  /**
   * Setting up callback "/menus" from telegram to show chat inline button
   */
  bot.onText(keyword.menus, async (data) => {
    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Option 1', callback_data: 'option1'}, {
            text: 'Option 2',
            callback_data: 'option2'
          }, {text: 'Option x', callback_data: 'optionx'}],
          [{text: 'Option 3', callback_data: 'option3'}, {
            text: 'Option 4',
            callback_data: 'option4'
          }, {text: 'Option y', callback_data: 'optiony'}],
          [{text: 'Option 5', callback_data: 'option5'}, {
            text: 'Option 6',
            callback_data: 'option6'
          }, {text: 'Option z', callback_data: 'optionz'}]
        ]
      }
    };

    await bot.sendMessage(data.chat.id, `<b>The Menus</b>`, {
      ...inlineKeyboard,
      parse_mode: "HTML"
    });
  })

  /**
   * Setting up callback from clicked "/menus" options from telegram
   */
  bot.on("callback_query", async (data) => {
    const chatId = data.message.chat.id;
    const responseData = data.data;

    switch (responseData) {
      case 'option1':
        await bot.sendMessage(chatId, 'You selected Option 1');
        break;
      case 'option2':
        await bot.sendMessage(chatId, 'You selected Option 2');
        break;
      case 'option3':
        await bot.sendMessage(chatId, 'You selected Option 3');
        break;
      case 'option4':
        await bot.sendMessage(chatId, 'You selected Option 4');
        break;
      case 'option5':
        await bot.sendMessage(chatId, 'You selected Option 5');
        break;
      case 'option6':
        await bot.sendMessage(chatId, 'You selected Option 6');
        break;
      default:
        break;
    }

    await bot.answerCallbackQuery(data.id);
  })

  /**
   * Setting up callback "/start" from telegram
   */
  bot.onText(keyword.start, async (data) => {
    await bot.sendMessage(data.chat.id, "Welcome to my Bot", {
      parse_mode: 'HTML',
      reply_markup: {remove_keyboard: true},
    });
  })

  /**
   * Setting up callback "/bgremove" from telegram
   */
  bot.onText(keyword.bgremove, async (data) => {
    isBgRemover = true
    await bot.sendMessage(data.chat.id, 'Please upload your image')
  })

  bot.on("photo", async (data) => {
    if (isBgRemover) {
      const pleaseWaitMessage = await bot.sendMessage(data.chat.id, 'Please wait...')
      const photo = data.photo[data.photo.length - 1]
      const fileId = photo.file_id
      const fileStream = bot.getFileStream(fileId)
      const chatId = data.chat.id


      try {
        await imgLy(fileId, fileStream)
        //await removeBg(fileId, fileStream)
        const uploadResponse = await uploader(fileId)
        await bot.sendPhoto(chatId, uploadResponse.data, {caption: `Link download: ${uploadResponse.data}`})
      } catch (e) {
        await bot.sendMessage(chatId, e)
      } finally {
        await bot.deleteMessage(chatId, pleaseWaitMessage.message_id)
        isBgRemover = false
      }
    }
  })
}