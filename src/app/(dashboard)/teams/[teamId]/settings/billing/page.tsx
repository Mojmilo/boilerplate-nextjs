import {ContentLayout} from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import MembershipCountForm
  from "@/app/(dashboard)/teams/[teamId]/settings/billing/_components/membership-count-form";
import CurrentPlanCard from "@/app/(dashboard)/teams/[teamId]/settings/billing/_components/current-plan-card";
import PlanList from "@/app/(dashboard)/teams/[teamId]/settings/billing/_components/plan-list";
import {getStripeSubscription} from "@/data-access/stripe";
import {getTeamByIdUseCase} from "@/use-cases/teams";

export default async function Page({ params }: { params: { teamId: string } }) {
  const team = await getTeamByIdUseCase(params.teamId);
  const subscription = await getStripeSubscription(team.stripeCustomerId);

  return (
    <ContentLayout title={"Billing"}>
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
              <Link href={`/teams/${params.teamId}`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/teams/${params.teamId}/settings`}>Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Billing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center justify-center gap-6 w-full mt-6">
        <CurrentPlanCard subscription={subscription}/>
        <MembershipCountForm subscription={subscription}/>
        <PlanList subscription={subscription}/>
      </div>
    </ContentLayout>
  )
}