"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = require("./bot/telegram");
const express_1 = __importDefault(require("express"));
const index = (0, express_1.default)();
const port = process.env.PORT || 8080;
index.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
index.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
index.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
(0, telegram_1.telegram)().then(() => {
    console.log("Starting telegram bot");
});
//# sourceMappingURL=index.js.map