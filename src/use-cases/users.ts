'use server';

import {getUserById, updateUser} from "@/data-access/users";
import {Prisma, User} from "@prisma/client";

export async function getUserByIdUseCase(teamId: string): Promise<User> {
  const team = await getUserById(teamId);

  if (!team) {
    throw new Error('User not found');
  }

  return team;
}

export async function updateUserNameUseCase(userId: string, name: string): Promise<void> {
  const user = await getUserByIdUseCase(userId);

  try {
    await updateUser(user.id, {
      name
    });
  } catch (e) {
    throw new Error('Failed to update name');
  }
}

export async function updateUserEmailUseCase(userId: string, email: string): Promise<void> {
  const user = await getUserByIdUseCase(userId);

  try {
    await updateUser(user.id, {
      email
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new Error('Email already exists');
      }
    }
    throw new Error('Failed to update email');
  }
}