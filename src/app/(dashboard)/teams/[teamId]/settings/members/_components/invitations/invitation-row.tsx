import {Invitation} from "@prisma/client";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import InvitationRowActions from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/invitations/invitation-row-actions";
import {Skeleton} from "@/components/ui/skeleton";

type InvitationRowProps = {
  invitation: Invitation;
};

export default async function InvitationRow({
  invitation
}: InvitationRowProps) {
  return (
    <TableRow>
      <TableCell className={'px-6 py-4'}>
        <span>{invitation.email}</span>
      </TableCell>
      <TableCell className={'px-6 py-4'}>
        <div className="flex justify-end items-center">
          <InvitationRowActions invitationId={invitation.id}/>
        </div>
      </TableCell>
    </TableRow>
  )
}

export async function InvitationRowSuspense() {
  return (
    <TableRow>
      <TableCell className={'px-6 py-4'}>
        <div className={'flex justify-start items-center gap-2'}>
          <Skeleton className="h-8 w-8 rounded-full"/>
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="w-20 h-4"/>
            <Skeleton className="w-40 h-4"/>
          </div>
        </div>
      </TableCell>
      <TableCell className={'px-6 py-4'}>
        <Skeleton className="w-20 h-5"/>
      </TableCell>
      <TableCell className={'px-6 py-4'}>
        <div className="flex justify-end items-center">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}