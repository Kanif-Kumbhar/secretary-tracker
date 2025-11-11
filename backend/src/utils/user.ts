import prisma from "./prisma";

export async function checkIfUserExistByEmail(
  email: string,
  phoneNumber: string
): Promise<boolean> {
  return !!(await prisma.usersTemp.findUnique({
    where: {
      email,
      AND: {
        contactNumber: phoneNumber,
      },
    },
    select: { id: true },
  }));
}


