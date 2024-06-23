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
exports.imgLy = void 0;
const background_removal_node_1 = __importDefault(require("@imgly/background-removal-node"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const TAG = "IMG.LY";
const imgLy = (fileId, fileStream) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const outputDir = 'outputs';
            const fileTempPath = node_path_1.default.join(outputDir, `${fileId}.jpg`);
            if (!node_fs_1.default.existsSync(outputDir)) {
                node_fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            const writeStream = node_fs_1.default.createWriteStream(fileTempPath);
            fileStream.pipe(writeStream);
            writeStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
                const blob = yield (0, background_removal_node_1.default)(fileTempPath);
                const buffer = Buffer.from(yield blob.arrayBuffer());
                const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
                console.log(TAG, dataURL);
                const filePath = node_path_1.default.join(outputDir, `${fileId}.png`);
                node_fs_1.default.writeFile(filePath, dataURL.split(';base64,').pop(), { encoding: 'base64' }, (err) => {
                    if (err) {
                        console.error(TAG, 'Failed saving file:', err);
                        reject('Failed to saving file.');
                        return;
                    }
                    node_fs_1.default.unlinkSync(fileTempPath);
                    resolve({
                        success: true,
                        message: 'Background remover is successfully',
                    });
                });
            }));
            writeStream.on('error', (err) => {
                console.error(TAG, 'Error saving file:', err);
                reject('Error saving file');
            });
        }
        catch (e) {
            console.error(TAG, e);
            reject('Failed to remove bg using img.ly');
        }
    }));
};
exports.imgLy = imgLy;
//# sourceMappingURL=imgLy.js.map