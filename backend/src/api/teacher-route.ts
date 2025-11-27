import express, { Express, Request, Response } from "express";
import prisma from "../utils/prisma";

const app: Express = express();

app.patch(
  "/verify-secretary/:secretaryId",
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

      let status: any = "REJECTED";
      if (adminAction === "APPROVED") {
        status = "APPROVED";
        const instituteData = await prisma.institution.findUnique({
          where: {
            name: user.collegeName,
          },
          select: {
            teacherId: true,
            institution_id: true,
          },
        });

        const checkIfSecretaryExists = await prisma.secretary.findUnique({
          where: {
            institution_id: instituteData?.institution_id,
          },
        });
        if (checkIfSecretaryExists) {
          return response.status(409).send("Secretary Exists");
        }
        await prisma.secretary.create({
          data: {
            name: user?.fullName,
            email: user?.email,
            password: user?.passwordHash,
            contactNumber: user?.contactNumber,
            institution_id: instituteData?.institution_id!,
            teacherId: instituteData?.teacherId!,
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
  "/unverified-secretary/:teacherId",
  async function (request: Request, response: Response) {
    try {
      const { teacherId } = request.params;

      const instituteData = await prisma.institution.findUnique({
        where: {
          teacherId: teacherId,
        },
        select: {
          name: true,
        },
      });
      const secretary = await prisma.usersTemp.findMany({
        where: {
          role: "SECRETARY",
          adminAction: null,
          collegeName: instituteData?.name,
        },
      });

      console.log(secretary);
      return response.status(200).send(secretary);
    } catch (error) {
      return response.send("Internal Server Error").status(500);
    }
  }
);

export default app;
