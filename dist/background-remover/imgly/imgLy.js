/*
import removeBackground from "@imgly/background-removal-node";
import {Readable} from "stream";
import fs from "node:fs";
import path from "node:path";
import {BgRemoverResponse} from "../bg-remover-response";

export const imgLy = (fileId: string, fileStream: Readable): Promise<BgRemoverResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = path.resolve(__dirname, '../../../outputs/temp', `${fileId}.jpg`);
      const writeStream = fs.createWriteStream(filePath);
      fileStream.pipe(writeStream);
      writeStream.on('finish', async () => {
        const blob = await removeBackground(filePath)
        const buffer = Buffer.from(await blob.arrayBuffer());
        const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
        fs.writeFile(
          `outputs/${fileId}.png`,
          dataURL.split(';base64,').pop(),
          {encoding: 'base64'},
          (err) => {
            if (err) {
              console.error('Failed saving file:', err);
              reject('Failed to saving file.')
              return
            }
            fs.unlinkSync(filePath)
            resolve({
              success: true,
              message: 'Background remover is successfully',
            })
          });
      });

      writeStream.on('error', (err) => {
        console.error('Error saving file:', err);
        reject('Error saving file')
      });
    } catch (e) {
      console.error(e)
      reject('Failed to remove bg using img.ly')
    }
  })
}*/
//# sourceMappingURL=imgLy.js.map