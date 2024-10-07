import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import AcceptInvitationButton from "@/app/(dashboard)/account/_components/invitations/accept-invitation-button";
import DeclineInvitationButton from "@/app/(dashboard)/account/_components/invitations/decline-invitation-button";
import {InvitationWithTeam} from "@/data-access/invitations";

export default async function InvitationRow({invitation}: {invitation: InvitationWithTeam}) {
  return (
    <div className={'flex justify-between items-center p-4 w-full'}>
      <div className={'flex justify-start items-center gap-2 w-full'}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://api.dicebear.com/9.x/rings/svg?seed=${invitation.team.id}`}
                       alt="Avatar"/>
          <AvatarFallback className="bg-transparent">
            {invitation.team.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <span>{invitation.team.name}</span>
          <span className={'text-xs text-muted-foreground'}>
            {invitation.createdAt.toDateString()}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <AcceptInvitationButton teamId={invitation.team.id}/>
        <DeclineInvitationButton teamId={invitation.team.id}/>
      </div>
    </div>
  )
}