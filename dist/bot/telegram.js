"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegram = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const constants_1 = require("../constants");
const uploader_1 = require("../imgbb/uploader");
const imgLy_1 = require("../background-remover/imgly/imgLy"); // Node.js Buffer to Blob utility
const Telegram = () => __awaiter(void 0, void 0, void 0, function* () {
    let isBgRemover = false;
    const options = {
        polling: true
    };
    const bot = new node_telegram_bot_api_1.default(constants_1.BOT_TOKEN, options);
    /**
     * Setting up command
     */
    yield bot.setMyCommands(constants_1.commands);
    /**
     * Setting up callback "/hai" from telegram
     */
    bot.onText(constants_1.keyword.sayHi, (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.sendMessage(data.from.id, "Halo juga!");
    }));
    /**
     * Setting up callback "/myname" from telegram
     */
    bot.onText(constants_1.keyword.myName, (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.sendMessage(data.from.id, data.from.username);
    }));
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
    bot.onText(constants_1.keyword.menus, (data) => __awaiter(void 0, void 0, void 0, function* () {
        const inlineKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Option 1', callback_data: 'option1' }, {
                            text: 'Option 2',
                            callback_data: 'option2'
                        }, { text: 'Option x', callback_data: 'optionx' }],
                    [{ text: 'Option 3', callback_data: 'option3' }, {
                            text: 'Option 4',
                            callback_data: 'option4'
                        }, { text: 'Option y', callback_data: 'optiony' }],
                    [{ text: 'Option 5', callback_data: 'option5' }, {
                            text: 'Option 6',
                            callback_data: 'option6'
                        }, { text: 'Option z', callback_data: 'optionz' }]
                ]
            }
        };
        yield bot.sendMessage(data.chat.id, `<b>The Menus</b>`, Object.assign(Object.assign({}, inlineKeyboard), { parse_mode: "HTML" }));
    }));
    /**
     * Setting up callback from clicked "/menus" options from telegram
     */
    bot.on("callback_query", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = data.message.chat.id;
        const responseData = data.data;
        switch (responseData) {
            case 'option1':
                yield bot.sendMessage(chatId, 'You selected Option 1');
                break;
            case 'option2':
                yield bot.sendMessage(chatId, 'You selected Option 2');
                break;
            case 'option3':
                yield bot.sendMessage(chatId, 'You selected Option 3');
                break;
            case 'option4':
                yield bot.sendMessage(chatId, 'You selected Option 4');
                break;
            case 'option5':
                yield bot.sendMessage(chatId, 'You selected Option 5');
                break;
            case 'option6':
                yield bot.sendMessage(chatId, 'You selected Option 6');
                break;
            default:
                break;
        }
        yield bot.answerCallbackQuery(data.id);
    }));
    /**
     * Setting up callback "/start" from telegram
     */
    bot.onText(constants_1.keyword.start, (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.sendMessage(data.chat.id, "Welcome to my Bot", {
            parse_mode: 'HTML',
            reply_markup: { remove_keyboard: true },
        });
    }));
    /**
     * Setting up callback "/bgremove" from telegram
     */
    bot.onText(constants_1.keyword.bgremove, (data) => __awaiter(void 0, void 0, void 0, function* () {
        isBgRemover = true;
        yield bot.sendMessage(data.chat.id, 'Please upload your image');
    }));
    bot.on("photo", (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (isBgRemover) {
            const pleaseWaitMessage = yield bot.sendMessage(data.chat.id, 'Please wait...');
            const photo = data.photo[data.photo.length - 1];
            const fileId = photo.file_id;
            const fileStream = bot.getFileStream(fileId);
            const chatId = data.chat.id;
            try {
                yield (0, imgLy_1.imgLy)(fileId, fileStream);
                //await removeBg(fileId, fileStream)
                const uploadResponse = yield (0, uploader_1.uploader)(fileId);
                yield bot.sendPhoto(chatId, uploadResponse.data, { caption: `Link download: ${uploadResponse.data}` });
            }
            catch (e) {
                yield bot.sendMessage(chatId, e);
            }
            finally {
                yield bot.deleteMessage(chatId, pleaseWaitMessage.message_id);
                isBgRemover = false;
            }
        }
    }));
});
exports.Telegram = Telegram;
//# sourceMappingURL=telegram.js.map