'use server';

import prisma from "@/lib/db";
import {Account} from "@prisma/client";

export async function getAccountsByUser(userId: string): Promise<Account[]> {
  return prisma.account.findMany({
    where: {
      userId,
    }
  });
}