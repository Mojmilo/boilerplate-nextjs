import {Account} from "@prisma/client";
import React from "react";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {GoogleLogo} from "@/components/icons";

export default function AccountRow({ account }: { account: Account }) {
  return (
    <div className={'flex justify-between items-center p-4 w-full'}>
      <div className={'flex justify-start items-center gap-2 w-full'}>
        {account.provider === 'github' ? (
          <GitHubLogoIcon className={'w-6 h-6'}/>
        ) : account.provider === 'google' && (
          <GoogleLogo/>
        )}
        <div className="flex flex-col items-start justify-center">
          <span>{account.provider}</span>
          <span className={'text-xs text-muted-foreground'}>
            {account.access_token}
          </span>
        </div>
      </div>
      <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
        {account.createdAt.toDateString()}
      </span>
    </div>
  )
}