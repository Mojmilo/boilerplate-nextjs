import {searchInvitationsByTeam} from "@/data-access/invitations";
import {TableCell, TableRow} from "@/components/ui/table";
import InvitationRow from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/invitations/invitation-row";

export default async function InvitationRows({teamId, q}: {teamId: string, q: string}) {
  const invitations = await searchInvitationsByTeam(teamId, {q});

  return (
    <>
      {invitations.length > 0 ? invitations.map((invitation) => (
        <InvitationRow key={invitation.id} invitation={invitation}/>
      )) : (
        <TableRow>
          <TableCell className={'py-10'} colSpan={3}>
            <div className={'flex justify-center items-center gap-2'}>
              <span>No invitation found</span>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}