import express, { Express, Request, Response } from "express";
import prisma from "../utils/prisma";

const app: Express = express();

app.post(
  "verify-secretary/:secretaryId",
  async function (request: Request, response: Response) {
    try {
      const { secretaryId } = request.params;
      const { adminAction } = await request.body;

      if (!secretaryId) {
        return response.status(400).send("Please provide user id");
      }

      const user = await prisma.usersTemp.findUnique({
        where: {
          id: secretaryId,
        },
      });

      if (!user) {
        return response.send("User not found").status(404);
      }

      let status: any = "REJECTED";
      if (adminAction === "APPROVED") {
        status = "APPROVED";
        await prisma.secretary.create({
          data: {
            name: user?.fullName,
            email: user?.email,
            password: user?.passwordHash,
            contactNumber: user?.contactNumber,
          },
        });
      }

      await prisma.usersTemp.update({
        where: { id: secretaryId },
        data: {
          adminAction: status!,
          adminActionTime: new Date(Date.now()),
        },
      });
      return response
        .status(200)
        .send(
          adminAction === "APPROVED"
            ? "Secretary approved"
            : "Secretary rejected"
        );
    } catch (error) {
      return response.send("Internal Server Error").status(500);
    }
  }
);

app.get(
  "/unverified-secretary",
  async function (request: Request, response: Response) {
    try {
      const secretary = await prisma.usersTemp.findMany({
        where: {
          role: "SECRETARY",
          AND: [
            {
              adminAction: null,
            },
          ],
        },
      });

      return response.status(200).send(secretary);
    } catch (error) {
      return response.send("Internal Server Error").status(500);
    }
  }
);
