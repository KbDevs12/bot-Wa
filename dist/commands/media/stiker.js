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
exports.command = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const sharp_1 = __importDefault(require("sharp"));
const fileManager_1 = require("../../utils/fileManager");
exports.command = {
    name: "sticker",
    description: "Mengubah gambar menjadi stiker",
    category: "media",
    usage: "Kirim gambar dengan caption !sticker atau reply gambar dengan !sticker",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempInputFile = null;
            let tempOutputFile = null;
            try {
                let media;
                if (message.hasMedia) {
                    media = yield message.downloadMedia();
                }
                else if (message.hasQuotedMsg) {
                    const quotedMsg = yield message.getQuotedMessage();
                    if (quotedMsg.hasMedia) {
                        media = yield quotedMsg.downloadMedia();
                    }
                    else {
                        yield message.reply("❌ Silakan kirim atau reply sebuah gambar!");
                        return;
                    }
                }
                else {
                    yield message.reply("❌ Silakan kirim atau reply sebuah gambar!");
                    return;
                }
                if (!media.mimetype.includes("image")) {
                    yield message.reply("❌ File yang dikirim harus berupa gambar!");
                    return;
                }
                // Simpan input ke file temporary
                const imageBuffer = Buffer.from(media.data, "base64");
                tempInputFile = yield fileManager_1.FileManager.writeBuffer(imageBuffer, '.png');
                // Optimize gambar
                const optimizedImage = yield (0, sharp_1.default)(tempInputFile)
                    .resize(512, 512, {
                    fit: "contain",
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                    .webp({ quality: 80 })
                    .toBuffer();
                // Konversi ke base64
                const stickerMedia = new whatsapp_web_js_1.MessageMedia("image/webp", optimizedImage.toString("base64"), `sticker-${Date.now()}.webp`);
                // Kirim stiker
                yield message.reply(stickerMedia, undefined, { sendMediaAsSticker: true });
            }
            catch (error) {
                console.error("Error in sticker command:", error);
                yield message.reply("❌ Terjadi kesalahan saat membuat stiker!");
            }
            finally {
                // Cleanup files
                if (tempInputFile) {
                    yield fileManager_1.FileManager.cleanup(tempInputFile);
                }
                if (tempOutputFile) {
                    yield fileManager_1.FileManager.cleanup(tempOutputFile);
                }
            }
        });
    },
};
