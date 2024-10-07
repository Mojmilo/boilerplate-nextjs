'use client';

import PlanCard from "@/app/(onboarding)/_components/pricing/plan-card";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";
import {getMonthlyPlans, getYearlyPlans} from "@/data/plans";

export default function PricingList() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = isYearly ? getYearlyPlans() : getMonthlyPlans();

  return (
    <div className={'flex flex-col items-center justify-center gap-8'}>
      <div className="flex justify-center items-center gap-4">
        <span>Monthly</span>
        <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)}/>
        <span>Yearly</span>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-5">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan}/>
        ))}
      </div>
    </div>
  )
}