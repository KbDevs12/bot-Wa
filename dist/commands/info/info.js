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
exports.command = {
    name: 'info',
    description: 'Menampilkan informasi tentang bot',
    category: 'info',
    usage: '!info',
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.reply('Bot ini dibuat menggunakan TypeScript dan whatsapp-web.js dengan system command handler by: KbDev');
        });
    }
};
