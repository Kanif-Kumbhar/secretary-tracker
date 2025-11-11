import { io } from "../server";
import express, { Express, Request, Response } from "express";
import { checkIfUserExistByEmail } from "../utils/user";
import prisma from "../utils/prisma";
import { hashPassword } from "../utils/bcryptjs";
import { encryptSocketData } from "../utils/cryptr";

const app: Express = express();
app.post("/register", async (request: Request, response: Response) => {
  try {
    const { fullName, email, password, phoneNumber, role, college } =
      await request.body;

    if (!fullName || !email || !password || !phoneNumber || !role || !college) {
      return response
        .status(400)
        .send("Please provide all the required fields");
    }

    if (await checkIfUserExistByEmail(email, phoneNumber)) {
      return response.status(409).send("User already exist");
    }

    const data = await prisma.usersTemp.create({
      data: {
        fullName,
        email,
        passwordHash: await hashPassword(password),
        contactNumber: phoneNumber,
        role: role.toUpperCase(),
        collegeName: college,
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
      case "TEACHER":
        io.emit(
          "new-teacher",
          await encryptSocketData(JSON.stringify(payload))
        );
        break;

      case "SECRETARY":
        io.emit(
          "new-secretary",
          await encryptSocketData(JSON.stringify(payload))
        );
        break;

      default:
        break;
    }

    return response
      .send("User registered successfully and waiting for approval")
      .status(201);
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
});

export default app;
