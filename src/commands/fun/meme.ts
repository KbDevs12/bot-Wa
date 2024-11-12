import { Command } from "../../types/command";
import { Message, MessageMedia } from "whatsapp-web.js";
import fetch from "node-fetch";

export const command: Command = {
    name: "meme",
    description: "Mengirim meme random",
    category: "fun",
    usage: "!meme",
    async execute(message: Message, args: string[]) {
        try {
            // Fetch meme dari Reddit
            const response = await fetch("https://meme-api.com/gimme");
            const data = await response.json();

            // Download gambar
            const imageResponse = await fetch(data.url);
            const imageBuffer = await imageResponse.buffer();

            // Konversi ke format yang bisa dikirim WhatsApp
            const media = new MessageMedia(
                "image/jpeg",
                imageBuffer.toString("base64")
            );

            // Kirim meme
            await message.reply(media, undefined, {
                caption: `${data.title}\n\n👍 ${data.ups} upvotes`
            });

        } catch (error) {
            console.error("Error in meme command:", error);
            await message.reply("❌ Terjadi kesalahan saat mengambil meme!");
        }
    },
};