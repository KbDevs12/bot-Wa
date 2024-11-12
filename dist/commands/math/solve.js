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
exports.command = void 0;
const math = __importStar(require("mathjs"));
exports.command = {
    name: "solve",
    description: "Menyelesaikan soal matematika",
    category: "math",
    usage: "!solve <ekspresi_matematika>\nContoh penggunaan:\n- Operasi dasar: `!solve 2 + 2`\n- Kalkulus (integral numerik): `!solve integral(x^2, x, 0, 1)`\n- Matriks: `!solve [1, 2; 3, 4] * [5, 6; 7, 8]`",
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (args.length < 1) {
                    yield message.reply("❌ Silakan masukkan ekspresi matematika!");
                    return;
                }
                const expression = args.join(" ");
                if (!isValidExpression(expression)) {
                    yield message.reply("❌ Ekspresi matematika tidak valid!");
                    return;
                }
                let result;
                try {
                    if (expression.includes("integral")) {
                        const integralMatch = expression.match(/integral\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
                        if (integralMatch) {
                            const [_, func, variable, lower, upper] = integralMatch;
                            result = calculateIntegral(func, variable, parseFloat(lower), parseFloat(upper));
                        }
                        else {
                            throw new Error("Format integral tidak valid.");
                        }
                    }
                    else {
                        result = math.evaluate(expression);
                    }
                }
                catch (evalError) {
                    yield message.reply("❌ Ekspresi matematika tidak dapat dievaluasi.");
                }
                let response = `📝 *Ekspresi:*\n${expression}\n\n`;
                response += `📊 *Hasil:*\n${result}`;
                yield message.reply(response);
            }
            catch (error) {
                console.error("Error in math command:", error);
                yield message.reply("❌ Terjadi kesalahan saat menyelesaikan soal matematika!");
            }
        });
    },
};
function isValidExpression(expression) {
    const validChars = /^[0-9+\-*/().\s^a-zA-Z,;[\]]*$/;
    return validChars.test(expression);
}
function calculateIntegral(func, variable, lower, upper, steps = 1000) {
    const delta = (upper - lower) / steps;
    let area = 0;
    for (let i = 0; i < steps; i++) {
        const x1 = lower + i * delta;
        const x2 = x1 + delta;
        const y1 = math.evaluate(func, { [variable]: x1 });
        const y2 = math.evaluate(func, { [variable]: x2 });
        area += (y1 + y2) * delta / 2;
    }
    return area;
}
