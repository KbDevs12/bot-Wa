import { Client, Message } from 'whatsapp-web.js';
import mentionEvents from '../events/mention';

export class EventHandler {
    private static instance: EventHandler;
    private client: Client;

    private constructor(client: Client) {
        this.client = client;
        this.registerEvents();
    }

    public static getInstance(client: Client): EventHandler {
        if (!EventHandler.instance) {
            EventHandler.instance = new EventHandler(client);
        }
        return EventHandler.instance;
    }

    private registerEvents(): void {
        this.client.on('message', async (message: Message) => {
            await this.handleMention(message);
            
        });
    }

    private async handleMention(message: Message): Promise<void> {
        await mentionEvents({ message, client: this.client });
    }
}