import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Suspense} from "react";
import InvitationRows from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/invitations/invitation-rows";
import {InvitationRowSuspense} from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/invitations/invitation-row";

export default async function InvitationTable({teamId, q}: {teamId: string, q: string}) {
  return (
    <div className={'rounded-md border overflow-hidden w-full'}>
      <Table>
        <TableHeader className={'bg-muted'}>
          <TableRow>
            <TableHead className={'px-6 py-4'}>Email</TableHead>
            <TableHead className={'px-6 py-4'}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<InvitationRowSuspense/>}>
            <InvitationRows teamId={teamId} q={q}/>
          </Suspense>
        </TableBody>
      </Table>
    </div>
  )
}