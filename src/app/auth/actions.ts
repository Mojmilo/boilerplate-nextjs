'use server';

import {createServerAction} from "zsa";
import {loginFormSchema, signupFormSchema} from "@/app/auth/validation";
import {signIn, signOut} from "@/lib/auth";
import {z} from "zod";
import {Prisma} from "@prisma/client";
import {createUser, getUserByEmail} from "@/data-access/users";
import {redirect} from "next/navigation";

export const signInAction = createServerAction()
  .input(loginFormSchema)
  .handler(async ({input}) => {
    try {
      const user = await getUserByEmail(input.email);

      if (!user) {
        throw new Error('User not found');
      }

      await signIn('resend', input);
    } catch (error) {
      throw error;
    }
  });

export const signUpAction = createServerAction()
  .input(signupFormSchema)
  .handler(async ({input}) => {
    try {
      await createUser({...input});

      await signIn('resend', input);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('User already exists');
        }
      }

      throw error;
    }
  });

export const signInOAuthAction = createServerAction()
  .input(z.object({provider: z.string()}))
  .handler(async ({input}) => {
    await signIn(input.provider);
  });