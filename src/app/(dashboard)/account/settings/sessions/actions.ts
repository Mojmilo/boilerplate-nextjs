'use server';

import {authedProcedure} from "@/lib/safe-action";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import {deleteSessionUseCase} from "@/use-cases/sessions";

export const deleteSessionAction = authedProcedure.createServerAction()
  .input(z.object({
    sessionToken: z.string(),
  }))
  .handler(async ({input}) => {
    await deleteSessionUseCase(input.sessionToken);

    revalidatePath('/');

    return { message: 'Session deleted' };
  });