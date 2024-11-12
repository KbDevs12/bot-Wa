import { Message } from "whatsapp-web.js";

export interface Command {
  name: string;
  description: string;
  category: string;
  usage: string;
  execute: (message: Message, args: string[]) => Promise<void>;
}
