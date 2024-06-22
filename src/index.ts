import {telegram} from "./bot/telegram";
import express, { Request, Response } from 'express'

const index = express()
const port = process.env.PORT || 8080

index.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

index.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

index.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

telegram().then(() => {
  console.log("Starting telegram bot")
})

