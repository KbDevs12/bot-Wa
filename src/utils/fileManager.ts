import { tmpdir } from "os";
import { join } from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid'

export class FileManager {
    static async createTempFile(extension: string): Promise<string> {
        const fileName = `temp-${uuidv4()}${extension}`;
        return join(tmpdir(), fileName);
    }

    static async writeBuffer(buffer: Buffer, extension: string): Promise<string> {
        const filePath = await this.createTempFile(extension);
        await fs.writeFile(filePath, buffer);
        return filePath;
    }

    static async cleanup(filePath: string): Promise<void> {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error(`Failed to cleanup file ${filePath}:`, error);
        }
    }
}
