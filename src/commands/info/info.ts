import { Command } from '../../types/command';
import { Message } from 'whatsapp-web.js';

export const command: Command = {
    name: 'info',
    description: 'Menampilkan informasi tentang bot',
    category: 'info',
    usage: '!info',
    async execute(message: Message, args: string[]) {
        await message.reply('Bot ini dibuat menggunakan TypeScript dan whatsapp-web.js dengan system command handler by: KbDev');
    }
};