"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.keyword = exports.REMOVEBG_TOKEN = exports.IMGBB_TOKEN = exports.BOT_TOKEN = void 0;
const prefix = "/";
exports.BOT_TOKEN = "7095448513:AAFAkHFzH-R3I9xE1dg4YN_5_20Ls3SQrP8";
exports.IMGBB_TOKEN = "37322567426713834d9f58b0e4c97071";
exports.REMOVEBG_TOKEN = "czXaYhimypQ1QwqZxfFM6K8U";
exports.keyword = {
    start: new RegExp(`^${prefix}start`),
    sayHi: new RegExp(`^${prefix}hai$`),
    myName: new RegExp(`^${prefix}myname$`),
    /*gempa: new RegExp(`^${prefix}gempa`),*/
    menus: new RegExp(`^${prefix}menus`),
    bgremove: new RegExp(`^${prefix}bgremove`),
};
exports.commands = [
    { command: '/start', description: 'Start the bot' },
    { command: '/hai', description: 'Say hai' },
    { command: '/myname', description: 'Get your username' },
    /*{command: '/gempa', description: 'Getting the earthquake information'},*/
    { command: '/menus', description: 'Getting the menus' },
    { command: '/bgremove', description: 'Image background remover' }
];
//# sourceMappingURL=constants.js.map