'use client';

import React from "react";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import Link from "next/link";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MembershipWithTeamInfo} from "@/data-access/membership";
import {useParams} from "next/navigation";

export default function TeamSwitch({memberships}: { memberships: MembershipWithTeamInfo[] }) {
  const {teamId} = useParams() as { teamId?: string };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          className="w-full justify-between h-12 px-2 overflow-hidden"
        >
          {teamId ? (
            <TeamItem membership={memberships.find((membership) => membership.team.id === teamId)!}/>
          ) : (
            <AccountItem/>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'p-0'} align={'start'}>
        <Command>
          <CommandInput placeholder="Search team..."/>
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {memberships.map((membership) => (
                <Link href={`/teams/${membership.team.id}`} key={membership.team.id}>
                  <CommandItem
                    key={membership.team.id}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        teamId === membership.team.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <TeamItem membership={membership}/>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function TeamItem({membership}: {membership: MembershipWithTeamInfo}) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={`https://api.dicebear.com/9.x/rings/svg?seed=${membership.team.id}`}
                     alt="Avatar"/>
        <AvatarFallback className="bg-transparent">
          {membership.team.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center">
        <span>{membership.team.name}</span>
        <span className={'text-xs text-muted-foreground'}>
          {membership?.role === 'OWNER' ? 'Owner' :
            membership?.role === 'ADMIN' ? 'Admin' : 'Member'}
          {' '}
          • {membership.team._count.memberships} members
        </span>
      </div>
    </div>
  )
}

function AccountItem() {
  const {data: session} = useSession();

  return (
    <div className="flex justify-center items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={session?.user?.image || '#'} alt="Avatar"/>
        <AvatarFallback className="bg-transparent">
          {session?.user?.name?.split(" ").map((name) => name[0])}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center">
        <span>My Account</span>
        <span className={'text-xs text-muted-foreground'}>{session?.user?.email}</span>
      </div>
    </div>
  )
}