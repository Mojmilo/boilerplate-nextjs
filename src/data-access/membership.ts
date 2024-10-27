'use server';

import prisma from "@/lib/db";
import {Membership, MembershipRole, Team, User} from "@prisma/client";

export async function getMembership(userId: string, teamId: string) {
  return prisma.membership.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId
      }
    }
  });
}

export type MembershipWithTeamInfo = Membership & {
  team: Team & {
    _count: {
      memberships: number
    }
  }
}

export async function getMembershipsWithTeamInfoFromUser(userId: string) {
  return prisma.membership.findMany({
    where: {
      userId
    },
    include: {
      team: {
        include: {
          _count: {
            select: {
              memberships: true
            }
          }
        }
      }
    }
  });
}

export async function createMembership(userId: string, teamId: string, role: MembershipRole) {
  return prisma.membership.create({
    data: {
      userId,
      teamId,
      role
    }
  });
}

export async function deleteMembership(userId: string, teamId: string) {
  return prisma.membership.delete({
    where: {
      userId_teamId: {
        userId,
        teamId
      }
    }
  });
}

export type MembershipWithUser = Membership & {
  user: User
}

export async function searchMembershipsWithUserByTeam(teamId: string, search: {
  q: string;
}) {
  return prisma.membership.findMany({
    where: {
      teamId,
      user: {
        OR: [
          {
            name: {
              contains: search.q,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: search.q,
              mode: 'insensitive'
            }
          }
        ]
      }
    },
    include: {
      user: true
    }
  });
}