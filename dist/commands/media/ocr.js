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
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const tesseract_js_1 = require("tesseract.js");
const fileManager_1 = require("../../utils/fileManager");
exports.command = {
    name: "ocr",
    description: "Mengekstrak teks dari gambar (Gratis)",
    category: "media",
    usage: "Kirim gambar dengan caption !ocr atau reply gambar dengan !ocr",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempFile = null;
            let worker = null;
            try {
                // Cek media
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
                // Simpan gambar ke file temporary
                const imageBuffer = Buffer.from(media.data, "base64");
                tempFile = yield fileManager_1.FileManager.writeBuffer(imageBuffer, '.png');
                // Inisialisasi Tesseract
                worker = yield (0, tesseract_js_1.createWorker)(['ind', 'eng']);
                // Proses OCR
                const { data: { text } } = yield worker.recognize(tempFile);
                if (!text || text.trim().length === 0) {
                    yield message.reply("❌ Tidak ada teks yang terdeteksi dalam gambar!");
                    return;
                }
                // Kirim hasil
                const response = `📝 *Teks yang Terdeteksi:*\n\n${text}`;
                yield message.reply(response);
            }
            catch (error) {
                console.error("Error in OCR command:", error);
                yield message.reply("❌ Terjadi kesalahan saat mengekstrak teks dari gambar!");
            }
            finally {
                // Cleanup
                if (worker) {
                    yield worker.terminate();
                }
                if (tempFile) {
                    yield fileManager_1.FileManager.cleanup(tempFile);
                }
            }
        });
    },
};
