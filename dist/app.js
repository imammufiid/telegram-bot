"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = require("./bot/telegram");
(0, telegram_1.Telegram)()
    .then(() => {
    console.info("Starting telegram bot");
});
//# sourceMappingURL=app.js.map