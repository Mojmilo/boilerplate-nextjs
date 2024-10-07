import NewTeamForm from "@/app/(dashboard)/new-team/_components/new-team-form";
import React from "react";
import {ArrowLeftIcon} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center py-12 col-span-5 min-h-screen">
      <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
        <Link href={'/account'} className={'flex justify-center items-center gap-2 w-fit'}>
          <ArrowLeftIcon className={'w-5 h-5'}/>
          <span className={'text-sm text-muted-foreground'}>Account</span>
        </Link>
        <div className="grid gap-2 text-center">
          <h1 className="text-5xl font-bold text-left">Create a new team</h1>
          <p className="text-balance text-left text-muted-foreground">
            Create a new team to start collaborating with your team members
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <NewTeamForm/>
        </div>
      </div>
    </div>
  )
}