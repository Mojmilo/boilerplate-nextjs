import {getCurrentUser} from "@/lib/session";
import {getSessionByUser} from "@/data-access/session";
import React from "react";
import SessionRow from "@/app/(dashboard)/account/settings/sessions/_components/session-row";

export default async function SessionList() {
  const user = await getCurrentUser();
  const sessions = await getSessionByUser(user.id);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-card divide-y border rounded-md">
      {sessions.length > 0 ? sessions.map((session, index) => (
        <SessionRow key={session.sessionToken} session={session}/>
      )) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 w-full">
          <span>
            No sessions found
          </span>
          <span className={'text-muted-foreground text-sm'}>
            You have not signed in from any device yet.
          </span>
        </div>
      )}
    </div>
  )
}