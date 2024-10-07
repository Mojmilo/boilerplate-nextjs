'use server';

import {getMembership} from "@/data-access/membership";

// * OK
export async function getMembershipUseCase(userId: string, teamId: string) {
  const membership = await getMembership(userId, teamId);

  if (!membership) {
    throw new Error('User not found on team');
  }

  return membership;
}

// * OK
export async function isTeamOwnerUseCase(userId: string, teamId: string) {
  const membership = await getMembershipUseCase(userId, teamId);

  return membership.role === 'OWNER';
}

// * OK
export async function hasMembershipUseCase(userId: string, teamId: string) {
  const membership = await getMembership(userId, teamId);

  return !!membership;
}