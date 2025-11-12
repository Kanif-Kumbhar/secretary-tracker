"use server";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.AES_KEY!, {
  encoding: "base64",
  pbkdf2Iterations: 10000,
  saltLength: 10,
});

export async function encryptSocketData(data: string) {
  return cryptr.encrypt(data);
}

export async function decryptSocketData(data: string) {
  return await JSON.parse(cryptr.decrypt(data));
}
