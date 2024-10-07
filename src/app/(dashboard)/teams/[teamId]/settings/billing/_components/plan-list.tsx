'use client';

import {getMonthlyPlans, getYearlyPlans} from "@/data/plans";
import PlanCard from "@/app/(dashboard)/teams/[teamId]/settings/billing/_components/plan-card";
import React, {useState} from "react";
import {Switch} from "@/components/ui/switch";
import Stripe from "stripe";

export default function PlanList({ subscription }: { subscription?: Stripe.Subscription}) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = isYearly ? getYearlyPlans() : getMonthlyPlans();

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <span className={'text-2xl font-semibold'}>Plans</span>
          <span className={'text-sm text-muted-foreground'}>
            Choose a plan that fits your team&apos;s needs.
          </span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <span>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)}/>
          <span>Yearly</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} subscription={subscription}/>
        ))}
      </div>
    </div>
  )
}