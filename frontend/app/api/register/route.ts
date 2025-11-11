import { hashPassword } from "@/lib/bcryptjs";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, phoneNumber, role, college } =
      await request.json();

    if (!fullName || !email || !password || !phoneNumber || !role || !college) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const existingUser = await prisma.usersTemp.findUnique({
      where: {
        email: email,
        OR: [
          {
            contactNumber: phoneNumber,
          },
        ],
      },
      select: {
        email: true,
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "phoneNumber";
      const message = `${
        field === "email" ? "Email" : "Phone number"
      } already in use`;

      return NextResponse.json(field + message, { status: 409 });
    }
    const roleUpper = role.toUpperCase();
    await prisma.usersTemp.create({
      data: {
        fullName,
        email,
        passwordHash: await hashPassword(password),
        role: roleUpper,
        collegeName: college,
        contactNumber: phoneNumber,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
