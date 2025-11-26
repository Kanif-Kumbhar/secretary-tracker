"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExistByEmail = checkIfUserExistByEmail;
const prisma_1 = __importDefault(require("./prisma"));
async function checkIfUserExistByEmail(email, phoneNumber) {
    return !!(await prisma_1.default.usersTemp.findUnique({
        where: {
            email,
            AND: {
                contactNumber: phoneNumber,
            },
        },
        select: { id: true },
    }));
}
