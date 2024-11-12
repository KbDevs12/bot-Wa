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
exports.command = void 0;
const commandHandlers_1 = require("../../handlers/commandHandlers");
exports.command = {
    name: 'help',
    description: 'Menampilkan daftar perintah',
    category: 'utility',
    usage: '!help [command]',
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandHandler = commandHandlers_1.CommandHandler.getInstance();
            if (args.length > 0) {
                const commandName = args[0].toLowerCase();
                const command = commandHandler.getCommand(commandName);
                if (command) {
                    const helpEmbed = `*Detail Perintah: ${command.name}*\n` +
                        `📝 Deskripsi: ${command.description}\n` +
                        `📂 Kategori: ${command.category}\n` +
                        `⌨️ Penggunaan: ${command.usage}`;
                    yield message.reply(helpEmbed);
                    return;
                }
            }
            const categories = new Map();
            commandHandler.commands.forEach(cmd => {
                var _a;
                if (!categories.has(cmd.category)) {
                    categories.set(cmd.category, []);
                }
                (_a = categories.get(cmd.category)) === null || _a === void 0 ? void 0 : _a.push(cmd);
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
            yield message.reply(helpMessage);
        });
    }
};
