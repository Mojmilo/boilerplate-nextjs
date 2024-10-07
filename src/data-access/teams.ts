'use server';

import prisma from "@/lib/db";
import {Team} from "@prisma/client";

export async function getTeamById(teamId: string) {
  return prisma.team.findUnique({
    where: {
      id: teamId
    }
  });
}

export async function getTeamsByUser(userId: string) {
  return prisma.team.findMany({
    where: {
      memberships: {
        some: {
          userId
        }
      }
    }
  });
}

export async function getTeamsByInvitation(email: string) {
  return prisma.team.findMany({
    where: {
      invitations: {
        some: {
          email
        }
      }
    }
  });
}

type NewTeam = {
  name: string;
  slug: string;
  stripeCustomerId: string;
}

export async function createTeam(userId: string, team: NewTeam) {
  return prisma.team.create({
    data: {
      ...team,
      memberships: {
        create: {
          userId,
          role: 'OWNER'
        }
      }
    }
  });
}

export async function updateTeam(teamId: string, team: Partial<Team>) {
  await prisma.team.update({
    where: {
      id: teamId
    },
    data: team
  });
}