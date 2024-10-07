'use server';

import {auth} from "@/lib/auth";

export async function getSession() {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session.user) {
    throw new Error('Unauthorized');
  }

  return session.user;
}
