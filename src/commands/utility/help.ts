import { Command } from '../../types/command';
import { Message } from 'whatsapp-web.js';
import { CommandHandler } from '../../handlers/commandHandlers';

export const command: Command = {
    name: 'help',
    description: 'Menampilkan daftar perintah',
    category: 'utility',
    usage: '!help [command]',
    async execute(message: Message, args: string[]) {
        const commandHandler = CommandHandler.getInstance();
        
        if (args.length > 0) {
            const commandName = args[0].toLowerCase();
            const command = commandHandler.getCommand(commandName);
            
            if (command) {
                const helpEmbed = `*Detail Perintah: ${command.name}*\n` +
                    `📝 Deskripsi: ${command.description}\n` +
                    `📂 Kategori: ${command.category}\n` +
                    `⌨️ Penggunaan: ${command.usage}`;
                
                await message.reply(helpEmbed);
                return;
            }
        }

        const categories = new Map<string, Command[]>();
        
        commandHandler.commands.forEach(cmd => {
            if (!categories.has(cmd.category)) {
                categories.set(cmd.category, []);
            }
            categories.get(cmd.category)?.push(cmd);
        });

        let helpMessage = '*📚 Daftar Perintah Bot*\n\n';
        
        categories.forEach((commands, category) => {
            helpMessage += `*${category.toUpperCase()}*\n`;
            commands.forEach(cmd => {
                helpMessage += `▢ !${cmd.name}: ${cmd.description}\n`;
            });
            helpMessage += '\n';
        });
        
        helpMessage += '\nKetik !help [nama_perintah] untuk informasi detail perintah.';
        
        await message.reply(helpMessage);
    }
};