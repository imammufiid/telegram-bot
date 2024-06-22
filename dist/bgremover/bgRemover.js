"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bgRemover = void 0;
const stream_1 = require("stream");
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
const constants_1 = require("../constants");
const bgRemover = (fileId, fileStream) => {
    return new Promise((resolve, reject) => {
        const formData = new form_data_1.default();
        formData.append('image_file', fileStream);
        formData.append('size', 'auto');
        formData.append('format', 'png');
        const config = {
            headers: {
                'X-Api-Key': constants_1.REMOVEBG_TOKEN
            },
            responseType: 'arraybuffer'
        };
        const url = 'https://api.remove.bg/v1.0/removebg';
        axios_1.default.post(url, formData, config)
            .then((response) => response.data)
            .then((arrayBuffer) => __awaiter(void 0, void 0, void 0, function* () {
            node_fs_1.default.writeFile(`outputs/${fileId}.png`, arrayBuffer, (err) => {
                if (err) {
                    reject('Failed to saving file.');
                    return;
                }
                resolve({
                    success: true,
                    message: 'Background remover is successfully',
                });
            });
        }))
            .catch((e) => {
            console.error(e);
            reject('Failed to remove background image');
        });
    });
};
exports.bgRemover = bgRemover;
const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
};
const readableBuffer = (buffer) => {
    const readableStream = new stream_1.Readable();
    readableStream._read = () => {
    }; // No-op
    readableStream.push(buffer);
    readableStream.push(null);
    return readableStream;
};
//# sourceMappingURL=bgRemover.js.map