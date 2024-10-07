import React from "react";
import {getTeamsByInvitation} from "@/data-access/teams";
import {getCurrentUser} from "@/lib/session";
import InvitationRow from "@/app/(dashboard)/account/_components/invitations/invitation-row";
import {getInvitationsWithTeamByEmail} from "@/data-access/invitations";

export default async function InvitationList() {
  const user = await getCurrentUser();
  const invitations = await getInvitationsWithTeamByEmail(user.email);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-card divide-y border rounded-md">
      {invitations.length > 0 ? invitations.map((invitation, index) => (
        <InvitationRow key={index} invitation={invitation}/>
      )) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 w-full">
          <span>
            No invitations found
          </span>
          <span className={'text-muted-foreground text-sm'}>
            You have no pending team invitations.
          </span>
        </div>
      )}
    </div>
  )
}