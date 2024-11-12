import { Command } from "../../types/command";
import { Message } from "whatsapp-web.js";
import * as math from "mathjs";

export const command: Command = {
    name: "solve",
    description: "Menyelesaikan soal matematika",
    category: "math",
    usage: "!solve <ekspresi_matematika>\nContoh penggunaan:\n- Operasi dasar: `!solve 2 + 2`\n- Kalkulus (integral numerik): `!solve integral(x^2, x, 0, 1)`\n- Matriks: `!solve [1, 2; 3, 4] * [5, 6; 7, 8]`",
    async execute(message: Message, args: string[]) {
        try {
            if (args.length < 1) {
                await message.reply("❌ Silakan masukkan ekspresi matematika!");
                return;
            }

            const expression = args.join(" ");

            if (!isValidExpression(expression)) {
                await message.reply("❌ Ekspresi matematika tidak valid!");
                return;
            }

            let result;

            try {
                if (expression.includes("integral")) {
                    const integralMatch = expression.match(/integral\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
                    if (integralMatch) {
                        const [_, func, variable, lower, upper] = integralMatch;
                        result = calculateIntegral(func, variable, parseFloat(lower), parseFloat(upper));
                    } else {
                        throw new Error("Format integral tidak valid.");
                    }
                } else {
                    result = math.evaluate(expression);
                }
            } catch (evalError) {

                await message.reply("❌ Ekspresi matematika tidak dapat dievaluasi.");

            }

            let response = `📝 *Ekspresi:*\n${expression}\n\n`;
            response += `📊 *Hasil:*\n${result}`;

            await message.reply(response);

        } catch (error) {
            console.error("Error in math command:", error);
            await message.reply("❌ Terjadi kesalahan saat menyelesaikan soal matematika!");
        }
    },
};

function isValidExpression(expression: string): boolean {
    const validChars = /^[0-9+\-*/().\s^a-zA-Z,;[\]]*$/;
    return validChars.test(expression);
}

function calculateIntegral(func: string, variable: string, lower: number, upper: number, steps: number = 1000): number {
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
