'use server';

import {authedProcedure} from "@/lib/safe-action";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import {acceptInvitationUseCase, declineInvitationUseCase} from "@/use-cases/invitations";
import {leaveTeamUseCase} from "@/use-cases/teams";

export const leaveTeamAction = authedProcedure.createServerAction()
  .input(z.object({
    teamId: z.string()
  }))
  .handler(async ({input, ctx}) => {
    await leaveTeamUseCase(ctx.user.id, input.teamId);

    revalidatePath('/');

    return { message: 'Left team' };
  });

export const acceptInvitationAction = authedProcedure.createServerAction()
  .input(z.object({
    teamId: z.string()
  }))
  .handler(async ({input, ctx}) => {
    await acceptInvitationUseCase(ctx.user, input.teamId);

    revalidatePath('/');

    return { message: 'Invitation accepted' };
  });

export const declineInvitationAction = authedProcedure.createServerAction()
  .input(z.object({
    teamId: z.string()
  }))
  .handler(async ({input, ctx}) => {
    await declineInvitationUseCase(ctx.user, input.teamId);

    revalidatePath('/');

    return { message: 'Invitation declined' };
  });