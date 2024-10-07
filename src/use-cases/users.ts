'use server';

import {updateUser} from "@/data-access/users";
import {Prisma, User} from "@prisma/client";

// * OK
export async function updateUserNameUseCase(user: User, name: string) {
  try {
    await updateUser(user.id, {
      name
    });
  } catch (e) {
    throw new Error('Failed to update name');
  }
}

// * OK
export async function updateUserEmailUseCase(user: User, email: string) {
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