import { Command } from "../../types/command";
import { Message } from "whatsapp-web.js";
import { createWorker } from "tesseract.js";
import { FileManager } from "../../utils/fileManager";

export const command: Command = {
    name: "ocr",
    description: "Mengekstrak teks dari gambar (Gratis)",
    category: "media",
    usage: "Kirim gambar dengan caption !ocr atau reply gambar dengan !ocr",
    async execute(message: Message, args: string[]) {
        let tempFile: string | null = null;
        let worker: Tesseract.Worker | null = null;

        try {
            // Cek media
            let media;
            if (message.hasMedia) {
                media = await message.downloadMedia();
            } else if (message.hasQuotedMsg) {
                const quotedMsg = await message.getQuotedMessage();
                if (quotedMsg.hasMedia) {
                    media = await quotedMsg.downloadMedia();
                } else {
                    await message.reply("❌ Silakan kirim atau reply sebuah gambar!");
                    return;
                }
            } else {
                await message.reply("❌ Silakan kirim atau reply sebuah gambar!");
                return;
            }

            if (!media.mimetype.includes("image")) {
                await message.reply("❌ File yang dikirim harus berupa gambar!");
                return;
            }

            // Simpan gambar ke file temporary
            const imageBuffer = Buffer.from(media.data, "base64");
            tempFile = await FileManager.writeBuffer(imageBuffer, '.png');

            // Inisialisasi Tesseract
            worker = await createWorker(['ind', 'eng']);

            // Proses OCR
            const { data: { text } } = await worker.recognize(tempFile);

            if (!text || text.trim().length === 0) {
                await message.reply("❌ Tidak ada teks yang terdeteksi dalam gambar!");
                return;
            }

            // Kirim hasil
            const response = `📝 *Teks yang Terdeteksi:*\n\n${text}`;
            await message.reply(response);

        } catch (error) {
            console.error("Error in OCR command:", error);
            await message.reply("❌ Terjadi kesalahan saat mengekstrak teks dari gambar!");
        } finally {
            // Cleanup
            if (worker) {
                await worker.terminate();
            }
            if (tempFile) {
                await FileManager.cleanup(tempFile);
            }
        }
    },
};