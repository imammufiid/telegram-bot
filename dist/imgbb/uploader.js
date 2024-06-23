"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploader = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
const path = __importStar(require("node:path"));
const constants_1 = require("../constants");
const TAG = "IMGBB-UPLOADER";
const uploader = (fileId /*, callback: (success: boolean, message: string, data: string) => void*/) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '../../outputs', `${fileId}.png`);
        node_fs_1.default.readFile(filePath, (err, data) => {
            if (err) {
                console.error(TAG, err);
                reject(`Failed to read file: ${filePath}`);
                return;
            }
            const base64Image = Buffer.from(data).toString('base64');
            const config = {
                params: { key: constants_1.IMGBB_TOKEN },
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            };
            axios_1.default.post(`https://api.imgbb.com/1/upload`, `image=${encodeURIComponent(base64Image)}`, config)
                .then((response) => {
                const url = response.data.data.url;
                const urlObject = new URL(url);
                const baseUrl = urlObject.origin;
                const modifiedUrl = url.replace(baseUrl, "https://i.ibb.co.com");
                if (response.data.success) {
                    node_fs_1.default.unlinkSync(filePath);
                    resolve({
                        success: response.data.success,
                        message: 'Successfully to upload',
                        data: modifiedUrl
                    });
                }
                else {
                    node_fs_1.default.unlinkSync(filePath);
                    reject(`Failed with status: ${response.data.status}`);
                }
            })
                .catch((error) => {
                console.error(TAG, error.response.data);
                node_fs_1.default.unlinkSync(filePath);
                reject('Failed to upload');
            });
        });
    });
});
exports.uploader = uploader;
//# sourceMappingURL=uploader.js.map