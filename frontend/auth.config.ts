import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/db";
import { verifyPassword } from "./lib/bcryptjs";
import { ADMIN_PASS } from "./lib/admin";

const AuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials: any) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          return null;
        }
        let user;

        switch (credentials.role) {
          case "TEACHER": {
            user = await prisma.teacher.findUnique({
              where: { email: credentials.email },
            });
            break;
          }
          case "SECRETARY": {
            user = await prisma.secretary.findUnique({
              where: { email: credentials.email },
            });
            break;
          }
          case "ADMIN": {
            if (credentials.email !== process.env.ADMIN_EMAIL) return null;
            user = {
              id: "admin",
              email: credentials.email,
              name: "Admin",
              password: ADMIN_PASS,
            };
            break;
          }
          default:
            return null;
        }

        if (!user) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: credentials.role,
        };
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig;

export default AuthConfig;
