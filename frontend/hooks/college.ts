"use server";
import prisma from "@/lib/db";

export async function fetchColleges() {
  return await prisma.institution.findMany({
    select: {
      name: true,
      institution_id: true,
    },
  });
}
