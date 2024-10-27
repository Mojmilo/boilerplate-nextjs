'use server';

import {getMembership} from "@/data-access/membership";
import {Membership} from "@prisma/client";

export async function getMembershipUseCase(userId: string, teamId: string): Promise<Membership> {
  const membership = await getMembership(userId, teamId);

  if (!membership) {
    throw new Error('User not found on team');
  }

  return membership;
}

export async function isTeamOwnerUseCase(userId: string, teamId: string): Promise<boolean> {
  const membership = await getMembershipUseCase(userId, teamId);

  return membership.role === 'OWNER';
}

export async function hasMembershipUseCase(userId: string, teamId: string): Promise<boolean> {
  const membership = await getMembership(userId, teamId);

  return !!membership;
}