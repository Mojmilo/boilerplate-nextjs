'use server';

import {authedProcedure} from "@/lib/safe-action";
import {inviteUserFormSchema} from "@/app/(dashboard)/teams/[teamId]/settings/members/validation";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import {cancelInvitationUseCase, inviteUserUseCase} from "@/use-cases/invitations";
import {leaveTeamUseCase} from "@/use-cases/teams";

export const inviteUserAction = authedProcedure.createServerAction()
  .input(z.object({
    teamId: z.string(),
    inviteUserFormSchema
  }))
  .handler(async ({input, ctx}) => {
    await inviteUserUseCase(ctx.user, input.teamId, input.inviteUserFormSchema.email);

    revalidatePath('/');

    return { message: 'User invited successfully' };
  });

export const leaveTeamAction = authedProcedure.createServerAction()
  .input(z.object({
    userId: z.string(),
    teamId: z.string()
  }))
  .handler(async ({input}) => {
    await leaveTeamUseCase(input.userId, input.teamId);

    revalidatePath('/');

    return { message: 'Team left successfully' };
  });

export const cancelInvitationAction = authedProcedure.createServerAction()
  .input(z.object({
    invitationId: z.string()
  }))
  .handler(async ({input}) => {
    await cancelInvitationUseCase(input.invitationId);

    revalidatePath('/');

    return { message: 'Invitation cancelled successfully' };
  });