import {searchMembershipsWithUserByTeam} from "@/data-access/membership";
import {TableCell, TableRow} from "@/components/ui/table";
import MembershipRow from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/membership-row";

export default async function MembershipRows({teamId, q}: {teamId: string, q: string}) {
  const memberships = await searchMembershipsWithUserByTeam(teamId, {q});

  return (
    <>
      {memberships.length > 0 ? memberships.map((membership) => (
        <MembershipRow key={membership.user.id} membership={membership} teamId={teamId}/>
      )) : (
        <TableRow>
          <TableCell className={'py-10'} colSpan={3}>
            <div className={'flex justify-center items-center gap-2'}>
              <span>No members found</span>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}