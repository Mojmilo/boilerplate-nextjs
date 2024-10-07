import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ContentLayout} from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import {Button} from "@/components/ui/button";
import React from "react";
import AccountList from "@/app/(dashboard)/account/settings/authentication/_components/account-list";

export default function Page() {
  return (
    <ContentLayout title="Authentication">
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
            <BreadcrumbPage>Authentication</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-6 pt-6 w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <span className={'text-2xl font-semibold'}>Authentication</span>
          <span className={'text-sm text-muted-foreground'}>
              Connect your Boilerplate account with your favorite authentication providers.
            </span>
        </div>
        <AccountList/>
      </div>
    </ContentLayout>
  )
}