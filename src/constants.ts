const prefix = "/"
export const BOT_TOKEN = "7392557154:AAE_92U1GtLDvbNmOVk61K-a4m50pJOo-4g"
export const IMGBB_TOKEN = "4483ade27109bfb181a4ba77d4d5a0a6"
export const REMOVEBG_TOKEN = "czXaYhimypQ1QwqZxfFM6K8U"
export const keyword = {
  start: new RegExp(`^${prefix}start`),
  bgremove: new RegExp(`^${prefix}bgremove`),
}

export const commands = [
  {command: '/start', description: 'Start the bot'},
  {command: '/bgremove', description: 'Image background remover'}
];