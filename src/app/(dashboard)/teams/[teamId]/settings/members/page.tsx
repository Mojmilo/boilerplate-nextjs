import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {createSearchParamsCache} from "nuqs/server";
import {parseAsString} from "nuqs";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import React from "react";
import MembershipTable from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/membership-table";
import InvitationTable from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/invitations/invitation-table";
import SearchInput from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/search-input";
import InviteMemberForm from "@/app/(dashboard)/teams/[teamId]/settings/members/_components/memberships/invite-member-form";

const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
});

export default async function UsersPage({ params, searchParams }: { params: { teamId: string }, searchParams: Record<string, string | string[] | undefined> }) {
  const { q } = searchParamsCache.parse(searchParams);

  return (
    <ContentLayout title="Members">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/teams/${params.teamId}`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/teams/${params.teamId}/settings`}>Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Members</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-6 pt-6 w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <span className={'text-2xl font-semibold'}>Members</span>
          <span className={'text-sm text-muted-foreground'}>
            Manage team members and invitations.
          </span>
        </div>
        <InviteMemberForm/>
        <Tabs defaultValue="memberships" className="w-full">
          <TabsList>
            <TabsTrigger value="memberships">Team Members</TabsTrigger>
            <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value={'memberships'} className={'w-full'}>
            <div className="flex flex-col items-center justify-center gap-2">
              <SearchInput/>
              <MembershipTable teamId={params.teamId} q={q}/>
            </div>
          </TabsContent>
          <TabsContent value={'invitations'} className={'w-full'}>
            <div className="flex flex-col items-center justify-center gap-2">
              <SearchInput/>
              <InvitationTable teamId={params.teamId} q={q}/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
