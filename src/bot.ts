import { Client, Message, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { CommandHandler } from './handlers/commandHandlers';
import { EventHandler } from './handlers/EventHandler';

class WhatsAppBot {
    private client: Client;
    private commandHandler: CommandHandler;
    private eventHandler: EventHandler;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
            }
        });

        this.commandHandler = CommandHandler.getInstance();
        this.eventHandler = EventHandler.getInstance(this.client);

        this.client.on('qr', (qr: string) => {
            qrcode.generate(qr, { small: true });
            console.log('QR Code telah dibuat, silakan scan menggunakan WhatsApp anda');
        });

        this.client.on('ready', () => {
            console.log('Bot WhatsApp sudah siap digunakan!');
        });

        this.client.on('message', async (message: Message) => {
            await this.commandHandler.handleMessage(message);
        });
    }

    public start(): void {
        this.client.initialize();
    }
}

const bot = new WhatsAppBot();
bot.start();