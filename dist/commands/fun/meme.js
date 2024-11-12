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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.command = {
    name: "meme",
    description: "Mengirim meme random",
    category: "fun",
    usage: "!meme",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch meme dari Reddit
                const response = yield (0, node_fetch_1.default)("https://meme-api.com/gimme");
                const data = yield response.json();
                // Download gambar
                const imageResponse = yield (0, node_fetch_1.default)(data.url);
                const imageBuffer = yield imageResponse.buffer();
                // Konversi ke format yang bisa dikirim WhatsApp
                const media = new whatsapp_web_js_1.MessageMedia("image/jpeg", imageBuffer.toString("base64"));
                // Kirim meme
                yield message.reply(media, undefined, {
                    caption: `${data.title}\n\n👍 ${data.ups} upvotes`
                });
            }
            catch (error) {
                console.error("Error in meme command:", error);
                yield message.reply("❌ Terjadi kesalahan saat mengambil meme!");
            }
        });
    },
};
