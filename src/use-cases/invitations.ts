'use server';

import {createInvitation, deleteInvitation, getInvitation} from "@/data-access/invitations";
import {createMembership} from "@/data-access/membership";
import {User} from "@prisma/client";
import {hasMembershipUseCase, isTeamOwnerUseCase} from "@/use-cases/membership";
import {getUserByEmail} from "@/data-access/users";

// * OK
export async function getInvitationUseCase(teamId: string, email: string) {
  const invitation = await getInvitation(teamId, email);

  if (!invitation) {
    throw new Error('Invitation not found');
  }

  return invitation;
}

// * OK
export async function acceptInvitationUseCase(user: User, teamId: string) {
  const invitation = await getInvitationUseCase(teamId, user.email);

  try {
    await createMembership(user.id, teamId, 'MEMBER');

    await deleteInvitation(invitation.id);
  } catch (e) {
    throw new Error('Failed to accept invitation');
  }
}

// * OK
export async function declineInvitationUseCase(user: User, teamId: string) {
  const invitation = await getInvitationUseCase(teamId, user.email);

  try {
    await deleteInvitation(invitation.id);
  } catch (e) {
    throw new Error('Failed to decline invitation');
  }
}

// * OK
export async function inviteUserUseCase(authenticatedUser: User, teamId: string, email: string) {
  const isTeamOwner = await isTeamOwnerUseCase(authenticatedUser.id, teamId);

  if (!isTeamOwner) {
    throw new Error('Only team owners can invite users');
  }

  const user = await getUserByEmail(email);

  if (user) {
    const hasMembership = await hasMembershipUseCase(user.id, teamId);

    if (hasMembership) {
      throw new Error('User is already on the team');
    }
  }

  try {
    await createInvitation({
      teamId: teamId,
      email: email,
    })
  } catch (e) {
    throw new Error('Failed to invite user');
  }
}

// * OK
export async function cancelInvitationUseCase(invitationId: string) {
  try {
    await deleteInvitation(invitationId);
  } catch (e) {
    throw new Error('Failed to cancel invitation');
  }
}