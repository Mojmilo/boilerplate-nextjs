'use server';

import prisma from "@/lib/db";
import {Invitation, Prisma, Team} from "@prisma/client";
import InvitationCreateManyInput = Prisma.InvitationCreateManyInput;

export async function getInvitation(teamId: string, email: string): Promise<Invitation | null> {
  return prisma.invitation.findUnique({
    where: {
      email_teamId: {
        email,
        teamId
      }
    }
  });
}

export async function createInvitation(invitation: InvitationCreateManyInput): Promise<Invitation> {
  return prisma.invitation.create({
    data: invitation
  });
}

export async function deleteInvitation(invitationId: string): Promise<void> {
  await prisma.invitation.delete({
    where: {
      id: invitationId
    }
  });
}

export type InvitationWithTeam = Invitation & {
  team: Team
}

export async function getInvitationsWithTeamByEmail(email: string): Promise<InvitationWithTeam[]> {
  return prisma.invitation.findMany({
    where: {
      email
    },
    include: {
      team: true
    }
  });
}

export async function searchInvitationsByTeam(teamId: string, search: {
  q: string
}): Promise<Invitation[]> {
  return prisma.invitation.findMany({
    where: {
      AND: [
        {
          teamId
        },
        {
          email: {
            contains: search.q,
            mode: 'insensitive'
          }
        }
      ]
    }
  });
}