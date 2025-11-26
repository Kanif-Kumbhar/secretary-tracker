"use strict";
"use server";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptSocketData = encryptSocketData;
exports.decryptSocketData = decryptSocketData;
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default(process.env.AES_KEY, {
    encoding: "base64",
    pbkdf2Iterations: 10000,
    saltLength: 10,
});
async function encryptSocketData(data) {
    return cryptr.encrypt(data);
}
async function decryptSocketData(data) {
    return await JSON.parse(cryptr.decrypt(data));
}
