import {getCurrentUser} from "@/lib/session";
import {getAccountsByUser} from "@/data-access/account";
import React from "react";
import AccountRow from "@/app/(dashboard)/account/settings/authentication/_components/account-row";

export default async function AccountList() {
  const user = await getCurrentUser();
  const accounts = await getAccountsByUser(user.id);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-card divide-y border rounded-md">
      {accounts.length > 0 ? accounts.map((account, index) => (
        <AccountRow key={account.access_token} account={account}/>
      )) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 w-full">
          <span>
            No accounts found
          </span>
          <span className={'text-muted-foreground text-sm'}>
            You have not connected any accounts yet.
          </span>
        </div>
      )}
    </div>
  )
}