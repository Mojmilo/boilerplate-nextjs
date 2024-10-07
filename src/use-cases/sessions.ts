'use server';

import {deleteSession} from "@/data-access/session";

// * OK
export async function deleteSessionUseCase(sessionToken: string) {
  try {
    await deleteSession(sessionToken);
  } catch (error) {
    throw new Error('Failed to delete session');
  }
}