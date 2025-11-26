import express, { Express, Request, Response } from "express";
import prisma from "../utils/prisma";

const app: Express = express();

app.patch(
  "/verify-teacher/:userId",
  async (request: Request, response: Response) => {
    try {
      const { userId } = request.params;
      const { adminAction } = await request.body;
      if (!userId) {
        return response.status(400).send("Please provide user id");
      }

      const user = await prisma.usersTemp.findUnique({
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
      let status: any = "REJECTED";
      if (adminAction === "APPROVED") {
        status = "APPROVED";

        const teacher = await prisma.teacher.create({
          data: {
            name: user?.fullName,
            email: user?.email,
            password: user?.passwordHash,
            contactNumber: user?.contactNumber,
          },
        });

        await prisma.institution.create({
          data: {
            name: user.collegeName,
            teacherId: teacher.id,
          },
        });
      }

      await prisma.usersTemp.update({
        where: { id: userId },
        data: {
          adminAction: status!,
          adminActionTime: new Date(Date.now()),
        },
      });

      return response
        .status(200)
        .send(
          adminAction === "APPROVED" ? "Teacher approved" : "Teacher rejected"
        );
    } catch (error) {
      return response.status(500).send(error);
    }
  }
);

app.get(
  "/unverified-teachers",
  async function (request: Request, response: Response) {
    try {
      const teachers = await prisma.usersTemp.findMany({
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
    } catch (error) {
      return response.status(500).send(error);
    }
  }
);

export default app;
