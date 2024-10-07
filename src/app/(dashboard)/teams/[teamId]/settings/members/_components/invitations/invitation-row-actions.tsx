'use client';

import React from "react";
import {toast} from "sonner";
import {cancelInvitationAction} from "@/app/(dashboard)/teams/[teamId]/settings/members/actions";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {confirmation} from "@/stores/use-confirmation-store";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

export default function InvitationRowActions({invitationId}: { invitationId: string }) {
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
            title: 'Cancel Invitation',
            description: 'Are you sure you want to cancel this invitation?',
            onAction: async () => {
              const [data, err] = await cancelInvitationAction({invitationId});
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
        >Cancel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}