import TelegramBot from "node-telegram-bot-api";
import {BOT_TOKEN, commands, keyword} from "../constants";
import {uploader} from "../imgbb/uploader";
import {removeBg} from "../background-remover/removebg/removeBg";
import {imgLy} from "../background-remover/imgly/imgLy"; // Node.js Buffer to Blob utility

export const telegram = async () => {
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
   * Setting up callback "/start" from telegram
   */
  bot.onText(keyword.start, async (data) => {
    console.log("Start conversation")
    await bot.sendMessage(data.chat.id, "Welcome to my Bot", {
      parse_mode: 'HTML',
      reply_markup: {remove_keyboard: true},
    });
  })

  /**
   * Setting up callback "/bgremove" from telegram
   */
  bot.onText(keyword.bgremove, async (data) => {
    console.log("Start to background remover")
    isBgRemover = true
    await bot.sendMessage(data.chat.id, 'Please upload your image')
  })

  bot.on("photo", async (data) => {
    if (isBgRemover) {
      console.log("Start background remove")
      const pleaseWaitMessage = await bot.sendMessage(data.chat.id, 'Please wait...')
      const photo = data.photo[data.photo.length - 1]
      const fileId = photo.file_id
      const fileStream = bot.getFileStream(fileId)
      const chatId = data.chat.id


      try {
        await removeBg(fileId, fileStream)
        console.log("Start upload to cloud imgbb")
        const uploadResponse = await uploader(fileId)
        console.log("Finish background remove")
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