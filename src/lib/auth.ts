import NextAuth from "next-auth"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import prisma from "@/lib/db";
import {userAgentFromString} from "next/server";
import {headers} from "next/headers";
import {updateSession} from "@/data-access/session";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/registration-email-sent"
  },
  providers: [
    GitHub,
    Resend({
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    session: async ({session}) => {
      const agent = userAgentFromString(headers().get('user-agent') || undefined);

      await updateSession(session.sessionToken, {
        browser: agent.browser.name,
        os: agent.os.name,
      })

      return Promise.resolve(session);
    }
  },
  adapter: PrismaAdapter(prisma) as any,
});
