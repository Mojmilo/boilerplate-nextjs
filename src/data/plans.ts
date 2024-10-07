export type Plan = {
  name: string;
  description: string;
  amount: number;
  interval: PlanInterval;
  priceId: string;
  isPopular?: boolean;
  features: string[];
}

export enum PlanInterval {
  MONTH = 'month',
  YEAR = 'year'
}

const plans: Plan[] = [
    {
      name: 'Starter Plan',
      description: 'For small teams or personal use',
      amount: 9.99,
      interval: PlanInterval.MONTH,
      priceId: 'price_1PsW7GIoZQNUASoceBq0VR2G',
      features: [
        'Unlimited projects',
        'Unlimited storage',
        'Unlimited collaborators'
      ]
    },
  {
    name: 'Starter Plan',
    description: 'For small teams or personal use',
    amount: 99.9,
    interval: PlanInterval.YEAR,
    priceId: 'price_1PsW7rIoZQNUASocBsPmOHdN',
    features: [
      'Unlimited projects',
      'Unlimited storage',
      'Unlimited collaborators'
    ]
  },
  {
    name: 'Pro Plan',
    description: 'For medium to large teams',
    isPopular: true,
    amount: 39.99,
    interval: PlanInterval.MONTH,
    priceId: 'price_1PsWBeIoZQNUASocAchNCdON',
    features: [
      'All Free Plan features',
      'Priority support',
      'Advanced analytics',
      'Custom domain'
    ]
  },
  {
    name: 'Pro Plan',
    description: 'For medium to large teams',
    isPopular: true,
    amount: 399.9,
    interval: PlanInterval.YEAR,
    priceId: 'price_1PsUw4IoZQNUASoc0nUBfR8V',
    features: [
      'All Free Plan features',
      'Priority support',
      'Advanced analytics',
      'Custom domain'
    ]
  },
  {
    name: 'Enterprise Plan',
    description: 'For large teams and organizations',
    amount: 119.99,
    interval: PlanInterval.MONTH,
    priceId: 'price_1PsWHiIoZQNUASoczJRBBqaN',
    features: [
      'All Pro Plan features',
      'Custom branding',
      'Custom integrations',
      'Dedicated account manager',
      'SLA and uptime guarantee'
    ]
  },
  {
    name: 'Enterprise Plan',
    description: 'For large teams and organizations',
    amount: 1199.9,
    interval: PlanInterval.YEAR,
    priceId: 'price_1PsWI3IoZQNUASocZwHxdMOk',
    features: [
      'All Pro Plan features',
      'Custom branding',
      'Custom integrations',
      'Dedicated account manager',
      'SLA and uptime guarantee'
    ]
  }
];

export function getPlans() {
  return plans;
}

export function getMonthlyPlans() {
  return plans.filter(plan => plan.interval === PlanInterval.MONTH);
}

export function getYearlyPlans() {
  return plans.filter(plan => plan.interval === PlanInterval.YEAR);
}

export function getPlanByPriceId(priceId: string) {
  return plans.find(plan => plan.priceId === priceId);
}