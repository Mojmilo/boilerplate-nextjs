'use server';

import {User} from "@prisma/client";
import prisma from "@/lib/db";

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

export type NewUser = {
  name: string;
  email: string;
};

export async function createUser(user: NewUser) {
  await prisma.user.create({
    data: user
  });
}

export async function updateUser(userId: string, user: Partial<User>) {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: user
  });
}