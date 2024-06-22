const prefix = "/"
export const BOT_TOKEN = "7095448513:AAFAkHFzH-R3I9xE1dg4YN_5_20Ls3SQrP8"
export const IMGBB_TOKEN = "37322567426713834d9f58b0e4c97071"
export const REMOVEBG_TOKEN = "czXaYhimypQ1QwqZxfFM6K8U"
export const keyword = {
  start: new RegExp(`^${prefix}start`),
  sayHi: new RegExp(`^${prefix}hai$`),
  myName: new RegExp(`^${prefix}myname$`),
  /*gempa: new RegExp(`^${prefix}gempa`),*/
  menus: new RegExp(`^${prefix}menus`),
  bgremove: new RegExp(`^${prefix}bgremove`),
}

export const commands = [
  {command: '/start', description: 'Start the bot'},
  {command: '/hai', description: 'Say hai'},
  {command: '/myname', description: 'Get your username'},
  /*{command: '/gempa', description: 'Getting the earthquake information'},*/
  {command: '/menus', description: 'Getting the menus'},
  {command: '/bgremove', description: 'Image background remover'}
];