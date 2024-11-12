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
    name: "ping",
    description: "cek bot status",
    category: "info",
    usage: "!ping",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = performance.now();
                const reply = yield message.reply("mengecek ping...");
                const latency = Math.round(performance.now() - startTime);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const pingMessage = `🏓 Pong!\n\n` +
                        `📊 *Status Bot*\n` +
                        `▢ Response Time: ${latency}ms`;
                    yield reply.edit(pingMessage);
                }), 1000);
            }
            catch (error) {
                console.error("Error in ping command:", error);
                yield message.reply("Terjadi kesalahan saat mengecek ping.");
            }
        });
    },
};
