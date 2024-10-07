import {MembershipWithUser} from "@/data-access/membership";
import {TableCell, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import MembershipRowActions from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/membership-row-actions";
import {Skeleton} from "@/components/ui/skeleton";
import {getCurrentUser} from "@/lib/session";

type MembershipRowProps = {
  membership: MembershipWithUser;
  teamId: string;
};

export default async function MembershipRow({
  membership,
  teamId
}: MembershipRowProps) {
  return (
    <TableRow>
      <TableCell className={'px-6 py-4'}>
        <div className={'flex justify-start items-center gap-2'}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={membership.user.image || '#'} alt="Avatar" />
            <AvatarFallback>
              {membership.user.name?.split(" ").map((name) => name[0])}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-center">
            <span>{membership.user.name}</span>
            <span className={'text-muted-foreground'}>{membership.user.email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className={'px-6 py-4'}>
        <Badge>{membership.role === 'OWNER' ? 'Owner' :
          membership.role === 'ADMIN' ? 'Admin' : 'Member'}</Badge>
      </TableCell>
      <TableCell className={'px-6 py-4'}>
        <div className="flex justify-end items-center">
          <MembershipRowActions userId={membership.user.id} teamId={teamId}/>
        </div>
      </TableCell>
    </TableRow>
  )
}

export async function MembershipRowSuspense() {
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