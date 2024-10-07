import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {MembershipWithTeamInfo} from "@/data-access/membership";
import MembershipRowActions from "@/app/(dashboard)/account/_components/memberships/membership-row-actions";

export default async function MembershipRow({membership}: {membership: MembershipWithTeamInfo}) {
  return (
    <div className={'flex justify-between items-center p-4 w-full'}>
      <div className={'flex justify-start items-center gap-2 w-full'}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://api.dicebear.com/9.x/rings/svg?seed=${membership.team.id}`}
                       alt="Avatar"/>
          <AvatarFallback className="bg-transparent">
            {membership.team.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <span>{membership.team.name}</span>
          <span className={'text-xs text-muted-foreground'}>
          {membership?.role === 'OWNER' ? 'Owner' :
            membership?.role === 'ADMIN' ? 'Admin' : 'Member'}
            {' '}
            • {membership.team._count.memberships} members
        </span>
        </div>
      </div>
      <MembershipRowActions teamId={membership.team.id}/>
    </div>
  )
}