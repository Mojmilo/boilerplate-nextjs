import {Session} from "@prisma/client";
import React from "react";
import SessionRowActions from "@/app/(dashboard)/account/settings/sessions/_components/session-row-actions";

export default function SessionRow({ session }: { session: Session }) {
  return (
    <div className={'flex justify-between items-center p-4 w-full'}>
      <div className="flex flex-col items-start justify-center">
        <span>{session.browser}, {session.os}</span>
        <span className={'text-xs text-muted-foreground'}>
            {session.expires.toDateString()}
          </span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
          {session.updatedAt.toDateString()}
        </span>
        <SessionRowActions sessionToken={session.sessionToken}/>
      </div>
    </div>
  )
}