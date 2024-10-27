'use server';

import {Session} from "@prisma/client";
import prisma from "@/lib/db";

export async function updateSession(sessionToken: string, session: Partial<Session>): Promise<Session> {
  return prisma.session.update({
    where: {
      sessionToken: sessionToken
    },
    data: session
  });
}

export async function deleteSession(sessionToken: string): Promise<void> {
  await prisma.session.delete({
    where: {
      sessionToken
    }
  });
}

export async function getSessionByUser(userId: string): Promise<Session[]> {
  return prisma.session.findMany({
    where: {
      userId
    }
  });
}