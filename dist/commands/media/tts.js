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
const gtts_1 = __importDefault(require("gtts"));
const fileManager_1 = require("../../utils/fileManager");
const util_1 = require("util");
const promises_1 = require("fs/promises");
exports.command = {
    name: "tts",
    description: "Mengubah teks menjadi suara (Gratis)",
    category: "media",
    usage: "!tts <teks> | !tts <kode_bahasa> <teks>",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempFile = null;
            try {
                if (args.length < 1) {
                    yield message.reply("❌ Silakan masukkan teks yang ingin diubah menjadi suara!");
                    return;
                }
                let text;
                let languageCode = "id";
                if (args[0].length === 2) {
                    languageCode = args[0];
                    text = args.slice(1).join(" ");
                }
                else {
                    text = args.join(" ");
                }
                tempFile = yield fileManager_1.FileManager.createTempFile('.mp3');
                const speech = new gtts_1.default(text, languageCode);
                const saveFile = (0, util_1.promisify)(speech.save).bind(speech);
                yield saveFile(tempFile);
                const audioBuffer = yield (0, promises_1.readFile)(tempFile);
                const media = new whatsapp_web_js_1.MessageMedia("audio/mp3", audioBuffer.toString("base64"), `audio-${Date.now()}.mp3`);
                yield message.reply(media, undefined, { sendAudioAsVoice: true });
            }
            catch (error) {
                console.error("Error in TTS command:", error);
                yield message.reply("❌ Terjadi kesalahan saat mengubah teks menjadi suara!");
            }
            finally {
                // Cleanup file temporary
                if (tempFile) {
                    yield fileManager_1.FileManager.cleanup(tempFile);
                }
            }
        });
    },
};
