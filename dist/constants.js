"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.keyword = exports.REMOVEBG_TOKEN = exports.IMGBB_TOKEN = exports.BOT_TOKEN = void 0;
const prefix = "/";
exports.BOT_TOKEN = "7392557154:AAE_92U1GtLDvbNmOVk61K-a4m50pJOo-4g";
exports.IMGBB_TOKEN = "4483ade27109bfb181a4ba77d4d5a0a6";
exports.REMOVEBG_TOKEN = "czXaYhimypQ1QwqZxfFM6K8U";
exports.keyword = {
    start: new RegExp(`^${prefix}start`),
    bgremove: new RegExp(`^${prefix}bgremove`),
};
exports.commands = [
    { command: '/start', description: 'Start the bot' },
    { command: '/bgremove', description: 'Image background remover' }
];
//# sourceMappingURL=constants.js.map