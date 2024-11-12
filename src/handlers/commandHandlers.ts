import { Command } from '../types/command';
import { Message } from 'whatsapp-web.js';
import * as fs from 'fs';
import * as path from 'path';

export class CommandHandler {
    private static instance: CommandHandler;
    public commands: Map<string, Command>;
    private prefix: string;

    private constructor() {
        this.commands = new Map();
        this.prefix = '!';
        this.loadCommands();
    }

    public static getInstance(): CommandHandler {
        if (!CommandHandler.instance) {
            CommandHandler.instance = new CommandHandler();
        }
        return CommandHandler.instance;
    }

    private loadCommands(): void {
        const commandsPath = path.join(__dirname, '..', 'commands');
        const categories = fs.readdirSync(commandsPath);

        for (const category of categories) {
            const categoryPath = path.join(commandsPath, category);
            const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.ts'));

            for (const file of commandFiles) {
                const filePath = path.join(categoryPath, file);
                const { command } = require(filePath);
                this.commands.set(command.name, command);
            }
        }
    }

    public getCommand(name: string): Command | undefined {
        return this.commands.get(name);
    }

    public async handleMessage(message: Message): Promise<void> {
        if (!message.body.startsWith(this.prefix)) return;

        const args = message.body.slice(this.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = this.getCommand(commandName);
        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            await message.reply('Terjadi kesalahan saat menjalankan perintah.');
        }
    }
}
