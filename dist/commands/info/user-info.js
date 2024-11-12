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
    name: 'user-info',
    description: 'Menampilkan informasi tentang user',
    category: 'info',
    usage: '!user-info',
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let ppLink;
            let status;
            let bioWa;
            try {
                const sender = yield message.getContact();
                const pp = yield sender.getProfilePicUrl();
                const bio = yield sender.getAbout();
                if (pp) {
                    ppLink = pp;
                }
                else {
                    ppLink = 'saya tidak memiliki akses.';
                }
                ;
                if (!bio || bio == null) {
                    bioWa = 'bio di-private.';
                }
                else {
                    bioWa = bio;
                }
                if (sender.isBusiness) {
                    status = 'wa bussines';
                }
                else if (sender.isEnterprise) {
                    status = 'wa enterprise';
                }
                else {
                    status = 'wa biasa';
                }
                ;
                yield message.reply(`user info :\n\n` +
                    `nama: ${sender.pushname}\n` +
                    `nomor Wa: ${sender.number}\n` +
                    `Wa: ${status}\n` +
                    `Bio: ${bio}\n` +
                    `Profile Picture Link: ${ppLink}`);
            }
            catch (error) {
                message.reply('ada error nih: ' + `${console.table(error)}`);
            }
        });
    }
};
