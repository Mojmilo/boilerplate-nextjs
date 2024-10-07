'use server';

import {Session} from "@prisma/client";
import prisma from "@/lib/db";

export async function updateSession(sessionToken: string, session: Partial<Session>) {
  await prisma.session.update({
    where: {
      sessionToken: sessionToken
    },
    data: session
  });
}

export async function getSessionByUser(userId: string) {
  return prisma.session.findMany({
    where: {
      userId
    }
  });
}

export async function deleteSession(sessionToken: string) {
  await prisma.session.delete({
    where: {
      sessionToken
    }
  });
}