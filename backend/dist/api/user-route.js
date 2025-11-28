"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const express_1 = __importDefault(require("express"));
const user_1 = require("../utils/user");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = require("../utils/bcryptjs");
const cryptr_1 = require("../utils/cryptr");
const app = (0, express_1.default)();
app.post("/register", async (request, response) => {
    try {
        const { fullName, email, password, phoneNumber, role, college } = await request.body;
        if (!fullName || !email || !password || !phoneNumber || !role || !college) {
            return response
                .status(400)
                .send("Please provide all the required fields");
        }
        if (await (0, user_1.checkIfUserExistByEmail)(email, phoneNumber)) {
            return response.status(409).send("User already exist");
        }
        if (role === "TEACHER".toLowerCase()) {
            const newUser = await prisma_1.default.usersTemp.create({
                data: {
                    fullName,
                    email,
                    passwordHash: await (0, bcryptjs_1.hashPassword)(password),
                    contactNumber: phoneNumber,
                    role: role.toUpperCase(),
                    collegeName: college,
                },
            });
            const payload = {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                college: newUser.collegeName,
                contactNumber: newUser.contactNumber,
            };
            server_1.io.emit("new-teacher", await (0, cryptr_1.encryptSocketData)(JSON.stringify(payload)));
        }
        else {
            let instituteData = await prisma_1.default.institution.findUnique({
                where: {
                    institution_id: college,
                },
                select: {
                    teacherId: true,
                    name: true,
                },
            });
            if (!instituteData) {
                return response.status(400).send("Bad request");
            }
            const data = await prisma_1.default.usersTemp.create({
                data: {
                    fullName,
                    email,
                    passwordHash: await (0, bcryptjs_1.hashPassword)(password),
                    contactNumber: phoneNumber,
                    role: role.toUpperCase(),
                    collegeName: instituteData?.name,
                },
            });
            const payload = {
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                role: data.role,
                college: data.collegeName,
                contactNumber: data.contactNumber,
            };
            switch (payload.role) {
                case "SECRETARY": {
                    server_1.io.emit(`new-secretary-${instituteData?.teacherId}`, await (0, cryptr_1.encryptSocketData)(JSON.stringify(payload)));
                    break;
                }
                default:
                    break;
            }
        }
        return response
            .send("User registered successfully and waiting for approval")
            .status(201);
    }
    catch (error) {
        return response.status(500).send("Internal Server Error");
    }
});
exports.default = app;
