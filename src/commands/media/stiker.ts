import { Command } from "../../types/command";
import { Message, MessageMedia } from "whatsapp-web.js";
import sharp from "sharp";
import { FileManager } from "../../utils/fileManager";

export const command: Command = {
    name: "sticker",
    description: "Mengubah gambar menjadi stiker",
    category: "media",
    usage: "Kirim gambar dengan caption !sticker atau reply gambar dengan !sticker",
    async execute(message: Message, args: string[]) {
        let tempInputFile: string | null = null;
        let tempOutputFile: string | null = null;

        try {
            let media: MessageMedia;
            
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

            // Simpan input ke file temporary
            const imageBuffer = Buffer.from(media.data, "base64");
            tempInputFile = await FileManager.writeBuffer(imageBuffer, '.png');

            // Optimize gambar
            const optimizedImage = await sharp(tempInputFile)
                .resize(512, 512, {
                    fit: "contain",
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .webp({ quality: 80 })
                .toBuffer();

            // Konversi ke base64
            const stickerMedia = new MessageMedia(
                "image/webp",
                optimizedImage.toString("base64"),
                `sticker-${Date.now()}.webp`
            );

            // Kirim stiker
            await message.reply(stickerMedia, undefined, { sendMediaAsSticker: true });

        } catch (error) {
            console.error("Error in sticker command:", error);
            await message.reply("❌ Terjadi kesalahan saat membuat stiker!");
        } finally {
            // Cleanup files
            if (tempInputFile) {
                await FileManager.cleanup(tempInputFile);
            }
            if (tempOutputFile) {
                await FileManager.cleanup(tempOutputFile);
            }
        }
    },
};