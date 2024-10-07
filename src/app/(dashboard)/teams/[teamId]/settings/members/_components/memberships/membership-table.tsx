import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Suspense} from "react";
import MembershipRows from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/membership-rows";
import {MembershipRowSuspense} from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/membership-row";

export default async function MembershipTable({teamId, q}: {teamId: string, q: string}) {
  return (
    <div className={'rounded-md border overflow-hidden w-full'}>
      <Table>
        <TableHeader className={'bg-muted'}>
          <TableRow>
            <TableHead className={'px-6 py-4'}>Member</TableHead>
            <TableHead className={'px-6 py-4'}>Role</TableHead>
            <TableHead className={'px-6 py-4'}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<MembershipRowSuspense/>}>
            <MembershipRows teamId={teamId} q={q}/>
          </Suspense>
        </TableBody>
      </Table>
    </div>
  )
}