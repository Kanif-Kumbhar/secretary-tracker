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
    if (role === "TEACHER".toLowerCase()) {
      const newUser = await prisma.usersTemp.create({
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
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        college: newUser.collegeName,
        contactNumber: newUser.contactNumber,
      };
      io.emit("new-teacher", await encryptSocketData(JSON.stringify(payload)));
    } else {
      let instituteData = await prisma.institution.findUnique({
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
      const data = await prisma.usersTemp.create({
        data: {
          fullName,
          email,
          passwordHash: await hashPassword(password),
          contactNumber: phoneNumber,
          role: role.toUpperCase(),
          collegeName: instituteData?.name!,
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
          io.emit(
            `new-secretary-${instituteData?.teacherId}`,
            await encryptSocketData(JSON.stringify(payload))
          );
          break;
        }

        default:
          break;
      }
    }
    return response
      .send("User registered successfully and waiting for approval")
      .status(201);
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
});

export default app;
