'use server';

import prisma from "@/lib/db";
import {Prisma, Team} from "@prisma/client";
import TeamCreateManyInput = Prisma.TeamCreateManyInput;

export async function getTeamById(teamId: string): Promise<Team | null> {
  return prisma.team.findUnique({
    where: {
      id: teamId
    }
  });
}

export async function createTeam(userId: string, team: TeamCreateManyInput): Promise<Team> {
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

export async function updateTeam(teamId: string, team: Partial<Team>): Promise<Team> {
  return prisma.team.update({
    where: {
      id: teamId
    },
    data: team
  });
}

export async function getTeamsByUser(userId: string): Promise<Team[]> {
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

export async function getTeamsByInvitation(email: string): Promise<Team[]> {
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