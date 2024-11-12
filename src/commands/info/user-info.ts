import { Command } from '../../types/command';
import { Message } from 'whatsapp-web.js';

export const command: Command = {
    name: 'user-info',
    description: 'Menampilkan informasi tentang user',
    category: 'info',
    usage: '!user-info',
    async execute(message: Message, args: string[]) {
        let ppLink: string;
        let status: string;
        let bioWa;
        try {
            const sender = await message.getContact();
            const pp = await sender.getProfilePicUrl();
            const bio = await sender.getAbout();
            if (pp) {
                ppLink = pp;
            } else {
                ppLink = 'saya tidak memiliki akses.'
            };

            if (!bio || bio == null) {
                bioWa = 'bio di-private.'
            } else {
                bioWa = bio;
            }

            if(sender.isBusiness) {
                status = 'wa bussines'
            } else if (sender.isEnterprise) {
                status = 'wa enterprise'
            } else {
                status = 'wa biasa'
            };

            await message.reply(
                `user info :\n\n` + 
                `nama: ${sender.pushname}\n` +
                `nomor Wa: ${sender.number}\n` +
                `Wa: ${status}\n` +
                `Bio: ${bio}\n` +
                `Profile Picture Link: ${ppLink}`
            );
        } catch (error) {
            message.reply('ada error nih: ' + `${console.table(error)}`);
        }
    }
};