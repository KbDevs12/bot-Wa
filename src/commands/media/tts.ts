import { Command } from "../../types/command";
import { Message, MessageMedia } from "whatsapp-web.js";
import gtts from "gtts";
import { FileManager } from "../../utils/fileManager";
import { promisify } from "util";
import { readFile } from "fs/promises";

export const command: Command = {
    name: "tts",
    description: "Mengubah teks menjadi suara (Gratis)",
    category: "media",
    usage: "!tts <teks> | !tts <kode_bahasa> <teks>",
    async execute(message: Message, args: string[]) {
        let tempFile: string | null = null;
        
        try {
            if (args.length < 1) {
                await message.reply("❌ Silakan masukkan teks yang ingin diubah menjadi suara!");
                return;
            }

            let text: string;
            let languageCode: string = "id";

            if (args[0].length === 2) {
                languageCode = args[0];
                text = args.slice(1).join(" ");
            } else {
                text = args.join(" ");
            }

            tempFile = await FileManager.createTempFile('.mp3');
            
            const speech = new gtts(text, languageCode);
            const saveFile = promisify(speech.save).bind(speech);
            await saveFile(tempFile);
            
            const audioBuffer = await readFile(tempFile);
            
            const media = new MessageMedia(
                "audio/mp3",
                audioBuffer.toString("base64"),
                `audio-${Date.now()}.mp3`
            );

            await message.reply(media, undefined, { sendAudioAsVoice: true });

        } catch (error) {
            console.error("Error in TTS command:", error);
            await message.reply("❌ Terjadi kesalahan saat mengubah teks menjadi suara!");
        } finally {
            // Cleanup file temporary
            if (tempFile) {
                await FileManager.cleanup(tempFile);
            }
        }
    },
};