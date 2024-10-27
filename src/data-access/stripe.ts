'use server';

import {stripe} from "@/lib/stripe";
import Stripe from "stripe";

export async function createStripeCustomer(email: string): Promise<Stripe.Customer> {
  return stripe.customers.create({
    email
  });
}

export async function createStripeCheckoutSession(stripeCustomerId: string, priceId: string): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
    mode: 'subscription',
  });
}

export async function getStripeSubscription(stripeCustomerId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    expand: ['data.plan.product']
  });

  return subscription.data[0];
}

export async function updateStripeSubscriptionItem(itemId: string, item: Stripe.SubscriptionItemUpdateParams): Promise<void> {
  await stripe.subscriptionItems.update(itemId, item);
}

export async function createStripeBillingPortalSession(stripeCustomerId: string): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    return_url: 'http://localhost:3000/back',
    customer: stripeCustomerId,
  });
}