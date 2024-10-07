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
import SessionList from "@/app/(dashboard)/account/settings/sessions/_components/session-list";

export default function Page() {
  return (
    <ContentLayout title="Sessions">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={'/account'}>Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={'/account/settings'}>Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Sessions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-6 pt-6 w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <span className={'text-2xl font-semibold'}>Sessions</span>
          <span className={'text-sm text-muted-foreground'}>
            Manage your active sessions and sign out from devices you no longer use.
          </span>
        </div>
        <SessionList/>
      </div>
    </ContentLayout>
  )
}