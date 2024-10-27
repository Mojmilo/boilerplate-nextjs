'use server';

import {isTeamOwnerUseCase} from "@/use-cases/membership";
import {deleteMembership} from "@/data-access/membership";
import {createTeam, getTeamById} from "@/data-access/teams";
import {Prisma, Team} from "@prisma/client";
import {createStripeCustomerUseCase} from "@/use-cases/stripe";
import TeamCreateManyInput = Prisma.TeamCreateManyInput;
import {getUserByIdUseCase} from "@/use-cases/users";

export async function getTeamByIdUseCase(teamId: string): Promise<Team> {
  const team = await getTeamById(teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  return team;
}

export async function createTeamUseCase(userId: string, team: Omit<TeamCreateManyInput, 'stripeCustomerId'>): Promise<Team> {
  const user = await getUserByIdUseCase(userId);

  const customer = await createStripeCustomerUseCase(user.email);

  try {
    return await createTeam(user.id, {...team, stripeCustomerId: customer.id});
  } catch (e) {
    throw new Error('Failed to create team');
  }
}

export async function leaveTeamUseCase(userId: string, teamId: string): Promise<void> {
  const isOwner = await isTeamOwnerUseCase(userId, teamId);

  if (isOwner) {
    throw new Error('Owner cannot leave team');
  }

  try {
    await deleteMembership(userId, teamId);
  } catch (e) {
    throw new Error('Failed to leave team');
  }
}