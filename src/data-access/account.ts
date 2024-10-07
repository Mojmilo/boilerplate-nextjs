'use server';

import prisma from "@/lib/db";

export async function getAccountsByUser(userId: string) {
  return prisma.account.findMany({
    where: {
      userId,
    }
  });
}