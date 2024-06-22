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