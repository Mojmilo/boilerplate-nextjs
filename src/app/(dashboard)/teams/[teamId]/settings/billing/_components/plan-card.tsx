'use client';

import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CheckIcon} from "@radix-ui/react-icons";
import React from "react";
import {Plan} from "@/data/plans";
import {
  createCheckoutLinkAction,
  updateSubscriptionAction
} from "@/app/(dashboard)/teams/[teamId]/settings/billing/actions";
import {toast} from "sonner";
import {useParams} from "next/navigation";
import Stripe from "stripe";
import {useServerAction} from "zsa-react";

export default function PlanCard({ plan, subscription }: { plan: Plan, subscription?: Stripe.Subscription }) {
  return (
    <Card className={`relative ${plan.isPopular && 'border-primary'}`}>
      {plan.isPopular && <Badge className={'absolute right-2 top-2'}>Popular</Badge>}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-center gap-8">
          <div className="flex jusitfy-center items-end gap-2">
            <span className={'text-4xl font-semibold'}>${plan.amount}</span>
            <span className={'text-muted-foreground'}>/member /{plan.interval}</span>
          </div>
          {subscription ?
            subscription.items.data[0].price.id === plan.priceId ?
              <Button disabled className={'w-full'}>Current Plan</Button> :
              <UpgradeButton plan={plan}/> :
            <CheckoutButton plan={plan}/>}
          <div className="flex flex-col items-start justify-center gap-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex jusitfy-center items-center gap-4">
                <div
                  className={`flex justify-center items-center w-5 h-5 rounded-full ${plan.isPopular ? 'bg-primary' : 'bg-muted'}`}>
                  <CheckIcon
                    className={`${plan.isPopular ? 'text-primary-foreground' : 'text-muted-foreground'}`}/>
                </div>
                <span
                  className={`${plan.isPopular ? 'text-foreground' : 'text-muted-foreground'}`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CheckoutButton({ plan }: { plan: Plan }) {
  const {teamId} = useParams() as { teamId: string };
  const {execute} = useServerAction(createCheckoutLinkAction, {
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message
      });
    }
  });

  return (
    <Button
      variant={plan.isPopular ? 'default' : 'outline'}
      className={'w-full'}
      onClick={async () => {
        await execute({ teamId, priceId: plan.priceId });
      }}
    >
      Choose Plan
    </Button>
  )
}

function UpgradeButton({ plan }: { plan: Plan }) {
  const {teamId} = useParams() as { teamId: string };
  const {execute} = useServerAction(updateSubscriptionAction, {
    onSuccess: ({data}) => {
      toast.success('success', {
        description: data.message,
        position: 'top-right'
      });
    },
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message
      });
    }
  });

  return (
    <Button
      variant={plan.isPopular ? 'default' : 'outline'}
      className={'w-full'}
      onClick={async () => {
        await execute({ teamId, priceId: plan.priceId });
      }}
    >
      Upgrade Plan
    </Button>
  )
}