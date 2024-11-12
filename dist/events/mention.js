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
exports.default = mentionEvents;
function mentionEvents(_a) {
    return __awaiter(this, arguments, void 0, function* ({ message, client }) {
        try {
            const mentionedIds = yield message.getMentions();
            const botNumber = client.info.wid._serialized;
            if (mentionedIds.some(mention => mention.id._serialized === botNumber)) {
                const sender = yield message.getContact();
                const chat = yield message.getChat();
                const isGroup = chat.isGroup;
                let groupInfo = '';
                if (isGroup) {
                    const group = chat;
                    const groupName = group.name;
                    const participantCount = group.participants.length;
                    groupInfo = `\n\n📱 Grup: ${groupName}\n👥 Anggota: ${participantCount}`;
                }
                // Format pesan dengan informasi lebih detail
                const replyMessage = `Hai @${sender.id.user}! 👋\n` +
                    `╭───────────────────\n` +
                    `│ 🤖 *BOT INFORMATION*\n` +
                    `│ \n` +
                    `│ ▢ Nama: ${client.info.pushname}\n` +
                    `│ ▢ Mode: ${isGroup ? 'Grup' : 'Private Chat'}\n` +
                    `│ ▢ Prefix: !\n` +
                    `╰───────────────────\n\n` +
                    `Ketik *!help* untuk melihat daftar perintah yang tersedia.` +
                    `${groupInfo}`;
                // Kirim pesan dengan delay untuk menghindari spam
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield chat.sendMessage(replyMessage, {
                        mentions: [`${sender}`]
                    });
                }), 1000);
                console.log(`[MENTION] from: ${sender.id.user} in: ${isGroup ? chat.name : 'Private Chat'}`);
            }
        }
        catch (error) {
            console.error("[MENTION EVENT ERROR]:", error);
        }
    });
}
