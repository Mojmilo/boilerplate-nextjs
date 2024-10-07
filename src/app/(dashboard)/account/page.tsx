import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ContentLayout} from "@/components/admin-panel/content-layout";
import React from "react";
import MembershipList from "@/app/(dashboard)/account/_components/memberships/membership-list";
import InvitationList from "@/app/(dashboard)/account/_components/invitations/invitation-list";
import {Button} from "@/components/ui/button";

export default async function Page() {
  return (
    <ContentLayout title="Teams">
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
              <Link href={'/account'}>Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Teams</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-10 pt-6">
        <Memberships/>
        <Invitations/>
      </div>
    </ContentLayout>
  )
}

function Memberships() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <span className={'text-2xl font-semibold'}>Teams</span>
          <span className={'text-sm text-muted-foreground'}>
            The teams that are associated with your Boilerplate account.
          </span>
        </div>
        <Link href={'/new-team'}>
          <Button>Create a Team</Button>
        </Link>
      </div>
      <MembershipList/>
    </div>
  )
}

function Invitations() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <span className={'text-2xl font-semibold'}>Invitations</span>
        <span className={'text-sm text-muted-foreground'}>
          The teams that have invited you to join.
        </span>
      </div>
      <InvitationList/>
    </div>
  )
}