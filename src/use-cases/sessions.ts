'use server';

import {deleteSession} from "@/data-access/session";

export async function deleteSessionUseCase(sessionToken: string): Promise<void> {
  try {
    await deleteSession(sessionToken);
  } catch (error) {
    throw new Error('Failed to delete session');
  }
}