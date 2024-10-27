'use server';

import {emailFormSchema, nameFormSchema} from "@/app/(dashboard)/account/settings/validation";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {Prisma} from "@prisma/client";
import {updateUser} from "@/data-access/users";
import {authedProcedure} from "@/lib/safe-action";
import {updateUserEmailUseCase, updateUserNameUseCase} from "@/use-cases/users";

export const updateUserNameAction = authedProcedure
  .createServerAction()
  .input(nameFormSchema)
  .handler(async ({input, ctx}) => {
    await updateUserNameUseCase(ctx.user.id, input.name);

    revalidatePath('/');

    return { message: 'Name updated successfully' };
  });

export const updateUserEmailAction = authedProcedure
  .createServerAction()
  .input(emailFormSchema)
  .handler(async ({input, ctx}) => {
    await updateUserEmailUseCase(ctx.user.id, input.email);

    revalidatePath('/');

    return { message: 'Email updated successfully' };
  });