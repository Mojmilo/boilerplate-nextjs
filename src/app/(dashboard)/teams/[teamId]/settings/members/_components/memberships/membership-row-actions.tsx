'use client';

import React from "react";
import {toast} from "sonner";
import {leaveTeamAction} from "@/app/(dashboard)/teams/[teamId]/settings/members/actions";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {confirmation} from "@/stores/use-confirmation-store";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

export default function MembershipRowActions({userId, teamId}: { userId: string, teamId: string }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem
          onClick={() => confirmation({
            title: 'Leave Team',
            description: 'Are you sure you want to leave this team?',
            onAction: async () => {
              const [data, err] = await leaveTeamAction({userId, teamId});
              if (data) {
                toast.success('Success', {
                  description: data.message,
                  position: 'top-right'
                });
              }
              if (err) {
                toast.error('Uh oh', {
                  description: err.message
                });
                throw new Error(err.message);
              }
            }
          })}
          className={'text-destructive focus:text-destructive'}
        >Leave Team</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}