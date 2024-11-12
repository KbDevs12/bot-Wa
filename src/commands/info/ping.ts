import { Command } from "../../types/command";
import { Message } from "whatsapp-web.js";

export const command: Command = {
    name: "ping",
    description: "cek bot status",
    category: "info",
    usage: "!ping",
    async execute(message: Message, args: string[]) {
        try {
            
            const startTime = performance.now();
            const reply = await message.reply("mengecek ping...");
            const latency = Math.round(performance.now() - startTime);
            
            setTimeout(async () => {
                const pingMessage = `🏓 Pong!\n\n` +
                                 `📊 *Status Bot*\n` +
                                 `▢ Response Time: ${latency}ms`;
                
                await reply.edit(pingMessage);
            }, 1000);
            
        } catch (error) {
            console.error("Error in ping command:", error);
            await message.reply("Terjadi kesalahan saat mengecek ping.");
        }
    },
};