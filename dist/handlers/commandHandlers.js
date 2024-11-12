"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CommandHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CommandHandler {
    constructor() {
        this.commands = new Map();
        this.prefix = '!';
        this.loadCommands();
    }
    static getInstance() {
        if (!CommandHandler.instance) {
            CommandHandler.instance = new CommandHandler();
        }
        return CommandHandler.instance;
    }
    loadCommands() {
        const commandsPath = path.join(__dirname, '..', 'commands');
        const categories = fs.readdirSync(commandsPath);
        for (const category of categories) {
            const categoryPath = path.join(commandsPath, category);
            const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.ts'));
            for (const file of commandFiles) {
                const filePath = path.join(categoryPath, file);
                const { command } = require(filePath);
                this.commands.set(command.name, command);
            }
        }
    }
    getCommand(name) {
        return this.commands.get(name);
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!message.body.startsWith(this.prefix))
                return;
            const args = message.body.slice(this.prefix.length).trim().split(/ +/);
            const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (!commandName)
                return;
            const command = this.getCommand(commandName);
            if (!command)
                return;
            try {
                yield command.execute(message, args);
            }
            catch (error) {
                console.error(error);
                yield message.reply('Terjadi kesalahan saat menjalankan perintah.');
            }
        });
    }
}
exports.CommandHandler = CommandHandler;
