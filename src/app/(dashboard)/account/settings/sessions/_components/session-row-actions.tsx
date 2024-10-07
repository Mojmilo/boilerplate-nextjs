'use client';

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";
import {confirmation} from "@/stores/use-confirmation-store";
import {deleteSessionAction} from "@/app/(dashboard)/account/settings/sessions/actions";
import {toast} from "sonner";

export default function SessionRowActions({ sessionToken }: { sessionToken: string }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem
          className={'text-destructive focus:text-destructive'}
          onClick={() => confirmation({
            title: 'Delete Session',
            description: 'Are you sure you want to delete this session?',
            onAction: async () => {
              const [data, err] = await deleteSessionAction({sessionToken});
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
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}