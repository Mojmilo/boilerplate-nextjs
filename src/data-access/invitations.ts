'use server';

import prisma from "@/lib/db";
import {Invitation, Team} from "@prisma/client";

export async function getInvitation(teamId: string, email: string) {
  return prisma.invitation.findUnique({
    where: {
      email_teamId: {
        email,
        teamId
      }
    }
  });
}

export type InvitationWithTeam = Invitation & {
  team: Team
}

export async function getInvitationsWithTeamByEmail(email: string) {
  return prisma.invitation.findMany({
    where: {
      email
    },
    include: {
      team: true
    }
  });
}

type NewInvitation = {
  teamId: string;
  email: string;
}

export async function createInvitation(invitation: NewInvitation) {
  return prisma.invitation.create({
    data: invitation
  });
}

export async function deleteInvitation(invitationId: string) {
  return prisma.invitation.delete({
    where: {
      id: invitationId
    }
  });
}

export async function searchInvitationsByTeam(teamId: string, search: {
  q: string
}) {
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