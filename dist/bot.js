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
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const commandHandlers_1 = require("./handlers/commandHandlers");
const EventHandler_1 = require("./handlers/EventHandler");
class WhatsAppBot {
    constructor() {
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth(),
            puppeteer: {
                headless: true,
            }
        });
        this.commandHandler = commandHandlers_1.CommandHandler.getInstance();
        this.eventHandler = EventHandler_1.EventHandler.getInstance(this.client);
        this.client.on('qr', (qr) => {
            qrcode_terminal_1.default.generate(qr, { small: true });
            console.log('QR Code telah dibuat, silakan scan menggunakan WhatsApp anda');
        });
        this.client.on('ready', () => {
            console.log('Bot WhatsApp sudah siap digunakan!');
        });
        this.client.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            yield this.commandHandler.handleMessage(message);
        }));
    }
    start() {
        this.client.initialize();
    }
}
const bot = new WhatsAppBot();
bot.start();
