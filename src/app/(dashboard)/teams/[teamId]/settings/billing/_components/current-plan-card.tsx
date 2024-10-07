'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import React from "react";
import {createBillingPortalLinkAction} from "@/app/(dashboard)/teams/[teamId]/settings/billing/actions";
import {useParams} from "next/navigation";
import {toast} from "sonner";
import Stripe from "stripe";
import {getPlanByPriceId} from "@/data/plans";
import {useServerAction} from "zsa-react";

export default function CurrentPlanCard({ subscription }: { subscription?: Stripe.Subscription }) {
  const plan = subscription && getPlanByPriceId(subscription.items.data[0].price.id);

  return (
    <Card className="rounded-lg border-none w-full">
      <CardHeader>
        <CardTitle>{plan ? plan.name : 'Free Plan'}</CardTitle>
        <CardDescription>
          You are currently on the {plan ? plan.name : 'Free Plan'}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-center justify-center">
          <span>Usage</span>
          <span className={'text-sm text-muted-foreground'}>
            To unlock additional usage and add team members, upgrade your plan to Pro.
          </span>
        </div>
      </CardContent>
      <CardFooter className={'justify-between pt-6 border-t border-dashed'}>
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <InfoCircledIcon/>
          <span className={'text-sm'}>Upgrade to unlock more features</span>
        </div>
        <BillingPortalButton/>
      </CardFooter>
    </Card>
  )
}

function BillingPortalButton() {
  const {teamId} = useParams() as { teamId: string };
  const {execute} = useServerAction(createBillingPortalLinkAction, {
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message
      });
    }
  });

  return (
    <Button onClick={async () => {
      await execute({teamId});
    }}>Billing Portal</Button>
  )
}