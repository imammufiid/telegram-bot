import {telegram} from "./bot/telegram";
import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

app.get('/start', async (_req: Request, res: Response) => {
  /*telegram()
    .then(() => {
      return res.send("Starting telegram bot")
    })
    .catch((e) => {
      return res.send(`Failed start telegram bot ${e}`)
    })*/
  await telegram()
  return res.send("Starting telegram bot")
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

