import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CheckIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";
import {Plan} from "@/data/plans";
import Link from "next/link";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({
  plan
}: PlanCardProps) {
  return (
    <Card className={`relative w-full lg:w-[300px] ${plan.isPopular && 'border-primary'}`}>
      {plan.isPopular && <Badge className={'absolute right-2 top-2'}>Popular</Badge>}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-center gap-8">
          <div className="flex jusitfy-center items-end gap-2">
            <span className={'text-4xl font-semibold'}>${plan.amount}</span>
            <span className={'text-muted-foreground'}>/{plan.interval}</span>
          </div>
          <Link href={'/auth/login'} className={'w-full'}>
            <Button variant={plan.isPopular ? 'default' : 'outline'} className={'w-full'}>Get started</Button>
          </Link>
          <div className="flex flex-col items-start justify-center gap-2">
          {plan.features.map((feature, index) => (
              <div key={index} className="flex jusitfy-center items-center gap-4">
                <div
                  className={`flex justify-center items-center w-5 h-5 rounded-full ${plan.isPopular ? 'bg-primary' : 'bg-muted'}`}>
                  <CheckIcon className={`${plan.isPopular ? 'text-primary-foreground' : 'text-muted-foreground'}`}/>
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