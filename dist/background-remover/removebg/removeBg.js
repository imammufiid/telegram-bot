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
exports.removeBg = void 0;
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
const constants_1 = require("../../constants");
const path = __importStar(require("node:path"));
const removeBg = (fileId, fileStream) => {
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
            const outputDir = 'outputs';
            const filePath = path.join(outputDir, `${fileId}.png`);
            if (!node_fs_1.default.existsSync(outputDir)) {
                node_fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            node_fs_1.default.writeFile(filePath, arrayBuffer, (err) => {
                if (err) {
                    console.error(err);
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
exports.removeBg = removeBg;
//# sourceMappingURL=removeBg.js.map