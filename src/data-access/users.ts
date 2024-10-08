'use server';

import {Prisma, User} from "@prisma/client";
import prisma from "@/lib/db";
import UserCreateInput = Prisma.UserCreateInput;
import UserUpdateInput = Prisma.UserUpdateInput;

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

export async function createUser(user: UserCreateInput): Promise<User> {
  return prisma.user.create({
    data: user
  });
}

export async function updateUser(userId: string, user: UserUpdateInput): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: user
  });
}

export async function deleteUser(userId: string): Promise<void> {
  await prisma.user.delete({
    where: {
      id: userId
    }
  });
}