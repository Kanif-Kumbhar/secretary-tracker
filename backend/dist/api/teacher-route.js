"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const app = (0, express_1.default)();
app.patch("/verify-secretary/:secretaryId", async function (request, response) {
    try {
        const { secretaryId } = request.params;
        const { adminAction } = await request.body;
        if (!secretaryId) {
            return response.status(400).send("Please provide user id");
        }
        const user = await prisma_1.default.usersTemp.findUnique({
            where: {
                id: secretaryId,
            },
            select: {
                fullName: true,
                passwordHash: true,
                email: true,
                contactNumber: true,
                collegeName: true,
            },
        });
        if (!user) {
            return response.send("User not found").status(404);
        }
        let status = "REJECTED";
        if (adminAction === "APPROVED") {
            status = "APPROVED";
            const instituteData = await prisma_1.default.institution.findUnique({
                where: {
                    name: user.collegeName,
                },
                select: {
                    teacherId: true,
                    institution_id: true,
                },
            });
            const checkIfSecretaryExists = await prisma_1.default.secretary.findUnique({
                where: {
                    institution_id: instituteData?.institution_id,
                },
            });
            if (checkIfSecretaryExists) {
                return response.status(409).send("Secretary Exists");
            }
            await prisma_1.default.secretary.create({
                data: {
                    name: user?.fullName,
                    email: user?.email,
                    password: user?.passwordHash,
                    contactNumber: user?.contactNumber,
                    institution_id: instituteData?.institution_id,
                    teacherId: instituteData?.teacherId,
                },
            });
        }
        await prisma_1.default.usersTemp.update({
            where: { id: secretaryId },
            data: {
                adminAction: status,
                adminActionTime: new Date(Date.now()),
            },
        });
        return response
            .status(200)
            .send(adminAction === "APPROVED"
            ? "Secretary approved"
            : "Secretary rejected");
    }
    catch (error) {
        return response.send("Internal Server Error").status(500);
    }
});
app.get("/unverified-secretary/:teacherId", async function (request, response) {
    try {
        const { teacherId } = request.params;
        const instituteData = await prisma_1.default.institution.findUnique({
            where: {
                teacherId: teacherId,
            },
            select: {
                name: true,
            },
        });
        const secretary = await prisma_1.default.usersTemp.findMany({
            where: {
                role: "SECRETARY",
                adminAction: null,
                collegeName: instituteData?.name,
            },
        });
        console.log(secretary);
        return response.status(200).send(secretary);
    }
    catch (error) {
        return response.send("Internal Server Error").status(500);
    }
});
exports.default = app;
