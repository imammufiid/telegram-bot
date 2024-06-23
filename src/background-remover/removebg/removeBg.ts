import {Readable} from "stream";
import FormData from "form-data";
import axios, {AxiosRequestConfig} from "axios";
import fs from "node:fs";
import {REMOVEBG_TOKEN} from "../../constants";
import {BgRemoverResponse} from "../bg-remover-response";

export const removeBg = (fileId: string, fileStream: Readable): Promise<BgRemoverResponse> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image_file', fileStream);
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        'X-Api-Key': REMOVEBG_TOKEN
      },
      responseType: 'arraybuffer'
    }
    const url = 'https://api.remove.bg/v1.0/removebg'
    axios.post(url, formData, config)
      .then((response) => response.data)
      .then(async (arrayBuffer) => {
        fs.writeFile(`outputs/${fileId}.png`, arrayBuffer, (err) => {
          if (err) {
            console.error(err)
            reject('Failed to saving file.')
            return
          }
          resolve({
            success: true,
            message: 'Background remover is successfully',
          })
        });
      })
      .catch((e) => {
        console.error(e)
        reject('Failed to remove background image')
      })
  })
}