import { mention } from "../types/IEvent";
import { Contact, GroupChat } from "whatsapp-web.js";

export default async function mentionEvents({ message, client }: mention) {
  try {
    const mentionedIds = await message.getMentions();
    const botNumber = (client.info as any).wid._serialized;
    
    if (mentionedIds.some(mention => mention.id._serialized === botNumber)) {
        const sender: Contact = await message.getContact();
        const chat = await message.getChat();
        const isGroup = chat.isGroup;
        
        let groupInfo = '';
        if (isGroup) {
            const group = chat as GroupChat;
            const groupName = group.name;
            const participantCount = group.participants.length;
            groupInfo = `\n\n📱 Grup: ${groupName}\n👥 Anggota: ${participantCount}`;
        }
        
        // Format pesan dengan informasi lebih detail
        const replyMessage = `Hai @${sender.id.user}! 👋\n` +
                           `╭───────────────────\n` +
                           `│ 🤖 *BOT INFORMATION*\n` +
                           `│ \n` +
                           `│ ▢ Nama: ${(client.info as any).pushname}\n` +
                           `│ ▢ Mode: ${isGroup ? 'Grup' : 'Private Chat'}\n` +
                           `│ ▢ Prefix: !\n` +
                           `╰───────────────────\n\n` +
                           `Ketik *!help* untuk melihat daftar perintah yang tersedia.` +
                           `${groupInfo}`;
        
        // Kirim pesan dengan delay untuk menghindari spam
        setTimeout(async () => {
            await chat.sendMessage(replyMessage, {
                mentions: [`${sender}`]
            });
        }, 1000);
        
        console.log(`[MENTION] from: ${sender.id.user} in: ${isGroup ? chat.name : 'Private Chat'}`);
        
    }
} catch (error) {
    console.error("[MENTION EVENT ERROR]:", error);
    
}
}
