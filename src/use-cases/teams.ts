'use server';

import {isTeamOwnerUseCase} from "@/use-cases/membership";
import {deleteMembership} from "@/data-access/membership";
import {createTeam, getTeamById, updateTeam} from "@/data-access/teams";
import {Team, User} from "@prisma/client";
import {createStripeCustomerUseCase} from "@/use-cases/stripe";

type NewTeam = {
  name: string;
  slug: string;
}

// * OK
export async function createTeamUseCase(user: User, team: NewTeam) {
  const customer = await createStripeCustomerUseCase(user.email);

  try {
    return await createTeam(user.id, {...team, stripeCustomerId: customer.id});
  } catch (e) {
    throw new Error('Failed to create team');
  }
}

// * OK
export async function leaveTeamUseCase(userId: string, teamId: string) {
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

// * OK
export async function getTeamByIdUseCase(teamId: string) {
  const team = await getTeamById(teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  return team;
}