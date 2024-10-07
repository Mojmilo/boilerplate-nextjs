import MembershipRow from "@/app/(dashboard)/account/_components/memberships/membership-row";
import React from "react";
import {getCurrentUser} from "@/lib/session";
import {getMembershipsWithTeamInfoByUser} from "@/data-access/membership";

export default async function MembershipList() {
  const user = await getCurrentUser();
  const memberships = await getMembershipsWithTeamInfoByUser(user.id);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-card divide-y border rounded-md">
      {memberships.length > 0 ? memberships.map((membership, index) => (
        <MembershipRow key={index} membership={membership}/>
      )) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 w-full">
          <span>
            No teams found
          </span>
          <span className={'text-muted-foreground text-sm'}>
            You have not created or joined any teams yet.
          </span>
        </div>
      )}
    </div>
  )
}