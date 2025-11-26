"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const app = (0, express_1.default)();
app.patch("/verify-teacher/:userId", async (request, response) => {
    try {
        const { userId } = request.params;
        const { adminAction } = await request.body;
        if (!userId) {
            return response.status(400).send("Please provide user id");
        }
        const user = await prisma_1.default.usersTemp.findUnique({
            where: {
                id: userId,
                AND: {
                    role: "TEACHER",
                },
            },
        });
        if (!user) {
            return response.status(404).send("User not found");
        }
        let status = "REJECTED";
        if (adminAction === "APPROVED") {
            status = "APPROVED";
            const teacher = await prisma_1.default.teacher.create({
                data: {
                    name: user?.fullName,
                    email: user?.email,
                    password: user?.passwordHash,
                    contactNumber: user?.contactNumber,
                },
            });
            await prisma_1.default.institution.create({
                data: {
                    name: user.collegeName,
                    teacherId: teacher.id,
                },
            });
        }
        await prisma_1.default.usersTemp.update({
            where: { id: userId },
            data: {
                adminAction: status,
                adminActionTime: new Date(Date.now()),
            },
        });
        return response
            .status(200)
            .send(adminAction === "APPROVED" ? "Teacher approved" : "Teacher rejected");
    }
    catch (error) {
        return response.status(500).send(error);
    }
});
app.get("/unverified-teachers", async function (request, response) {
    try {
        const teachers = await prisma_1.default.usersTemp.findMany({
            where: {
                role: "TEACHER",
                AND: [
                    {
                        adminAction: null,
                    },
                ],
            },
        });
        return response.status(200).send(teachers);
    }
    catch (error) {
        return response.status(500).send(error);
    }
});
exports.default = app;
