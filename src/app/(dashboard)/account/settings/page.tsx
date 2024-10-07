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
import EditNameForm from "@/app/(dashboard)/account/settings/_components/forms/edit-name-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import EditEmailForm from "@/app/(dashboard)/account/settings/_components/forms/edit-email-form";
import {Input} from "@/components/ui/input";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import React from "react";
import {getCurrentUser} from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <ContentLayout title="General">
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
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-5 w-full mt-6">
        <EditNameForm name={user.name!}/>
        <Card className="rounded-lg border-none w-full">
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Update your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col items-end justify-center">
              <EditEmailForm/>
              <Input placeholder="you@example.com" disabled value={user.email!}/>
            </div>
          </CardContent>
          <CardFooter className={'justify-between pt-6 border-t border-dashed'}>
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <InfoCircledIcon/>
              <span className={'text-sm'}>We will send a confirmation email to your new address</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </ContentLayout>
  )
}