import axios, {AxiosResponse} from "axios";
import fs from "node:fs";
import * as path from "node:path";
import {IMGBB_TOKEN} from "../constants";

const TAG = "IMGBB-UPLOADER"

interface UploaderResponse {
  success: boolean
  message: string
  data: string
}

export const uploader = async (fileId: string/*, callback: (success: boolean, message: string, data: string) => void*/): Promise<UploaderResponse> => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '../../outputs', `${fileId}.png`);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(TAG, err);
        reject(`Failed to read file: ${filePath}`);
        return;
      }

      const base64Image = Buffer.from(data).toString('base64');
      const config = {
        params: {key: IMGBB_TOKEN},
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      };

      axios.post(
        `https://api.imgbb.com/1/upload`,
        `image=${encodeURIComponent(base64Image)}`,
        config
      )
        .then((response) => {
          const url = response.data.data.url
          const urlObject = new URL(url);
          const baseUrl = urlObject.origin;
          const modifiedUrl = url.replace(baseUrl, "https://i.ibb.co.com");

          if (response.data.success) {
            fs.unlinkSync(filePath);
            resolve({
              success: response.data.success,
              message: 'Successfully to upload',
              data: modifiedUrl
            });
          } else {
            fs.unlinkSync(filePath);
            reject(`Failed with status: ${response.data.status}`);
          }
        })
        .catch((error) => {
          console.error(TAG, error.response.data);
          fs.unlinkSync(filePath);
          reject('Failed to upload');
        });
    });
  });
}
