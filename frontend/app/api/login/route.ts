import { signIn } from "@/auth";
import { ADMIN_PASS } from "@/lib/admin";
import { verifyPassword } from "@/lib/bcryptjs";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { role, email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }
    const roleUpperCase = role.toUpperCase() || "ADMIN";

    let checkUserExist;

    switch (roleUpperCase) {
      case "ADMIN":
        if (email !== process.env.ADMIN_EMAIL)
          return new NextResponse(
            "You're not authorized to access the system",
            { status: 400 }
          );
        checkUserExist = {
          id: "admin",
          email: process.env.ADMIN_EMAIL,
          name: "Admin",
          password: ADMIN_PASS,
        };
        break;
      case "TEACHER":
        checkUserExist = await prisma.teacher.findUnique({
          where: {
            email: email,
          },
        });
        break;
      case "SECRETARY":
        checkUserExist = await prisma.secretary.findUnique({
          where: {
            email: email,
          },
        });
        break;
      default:
        return new NextResponse("You're not authorized to access the system", {
          status: 400,
        });
    }

    if (!checkUserExist) {
      return new NextResponse("User doesn't exist on the system", {
        status: 404,
      });
    }

    const verifyPass = await verifyPassword(password, checkUserExist.password);
    if (!verifyPass) {
      return new NextResponse("Invalid password", {
        status: 401,
      });
    }



    await signIn("credentials", {
      redirect: false,
      email,
      password,
      role: roleUpperCase,
    });

    return new NextResponse("Login Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
