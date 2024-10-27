'use server';

import {Prisma, User} from "@prisma/client";
import prisma from "@/lib/db";
import UserCreateManyInput = Prisma.UserCreateManyInput;

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: userId
    }
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

export async function createUser(user: UserCreateManyInput): Promise<User> {
  return prisma.user.create({
    data: user
  });
}

export async function updateUser(userId: string, user: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: user
  });
}