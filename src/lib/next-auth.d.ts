import {User, Session as PrismaSession} from "@prisma/client";

declare module 'next-auth' {
  interface Session extends PrismaSession {
    user: User;
  }
}