'use server';

import {authedProcedure} from "@/lib/safe-action";
import {redirect} from "next/navigation";
import {nameSchema, slugSchema} from "@/app/(dashboard)/new-team/validation";
import {z} from "zod";
import {createTeamUseCase} from "@/use-cases/teams";

export const createTeamAction = authedProcedure.createServerAction()
  .input(z.object({
    nameSchema,
    slugSchema
  }))
  .handler(async ({input, ctx}) => {
    const team = await createTeamUseCase(ctx.user, {
      name: input.nameSchema.name,
      slug: input.slugSchema.slug
    });

    redirect(`/teams/${team.id}`);
  });