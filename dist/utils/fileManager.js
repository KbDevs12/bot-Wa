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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
class FileManager {
    static createTempFile(extension) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `temp-${(0, uuid_1.v4)()}${extension}`;
            return (0, path_1.join)((0, os_1.tmpdir)(), fileName);
        });
    }
    static writeBuffer(buffer, extension) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = yield this.createTempFile(extension);
            yield fs_1.promises.writeFile(filePath, buffer);
            return filePath;
        });
    }
    static cleanup(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.unlink(filePath);
            }
            catch (error) {
                console.error(`Failed to cleanup file ${filePath}:`, error);
            }
        });
    }
}
exports.FileManager = FileManager;
