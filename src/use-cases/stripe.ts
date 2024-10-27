'use server';

import {
  createStripeBillingPortalSession,
  createStripeCheckoutSession,
  createStripeCustomer,
  getStripeSubscription,
  updateStripeSubscriptionItem
} from "@/data-access/stripe";
import {getTeamByIdUseCase} from "@/use-cases/teams";
import Stripe from "stripe";

export async function createStripeCustomerUseCase(email: string): Promise<Stripe.Customer> {
  try {
    return await createStripeCustomer(email);
  } catch (e) {
    throw new Error('Failed to create Stripe customer');
  }
}

export async function createStripeCheckoutSessionUseCase(stripeCustomerId: string, priceId: string): Promise<Stripe.Checkout.Session> {
  try {
    return await createStripeCheckoutSession(stripeCustomerId, priceId);
  } catch (e) {
    throw new Error('Failed to create checkout session');
  }
}

export async function createCheckoutLinkUseCase(teamId: string, priceId: string): Promise<string> {
  const team = await getTeamByIdUseCase(teamId);

  const subscription = await getStripeSubscription(team.stripeCustomerId);

  if (subscription) {
    throw new Error('Subscription already exists');
  }

  const checkout = await createStripeCheckoutSessionUseCase(team.stripeCustomerId, priceId);

  if (!checkout.url) {
    throw new Error('Failed to create checkout link');
  }

  return checkout.url;
}

export async function getStripeSubscriptionUseCase(stripeCustomerId: string): Promise<Stripe.Subscription> {
  const subscription = await getStripeSubscription(stripeCustomerId);

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  return subscription;
}

export async function updateStripeSubscriptionItemUseCase(teamId: string, priceId: string): Promise<void> {
  const team = await getTeamByIdUseCase(teamId);

  const subscription = await getStripeSubscriptionUseCase(team.stripeCustomerId);

  try {
    await updateStripeSubscriptionItem(subscription.items.data[0].id, {
      price: priceId,
      quantity: subscription.items.data[0].quantity
    });
  } catch (e) {
    throw new Error('Failed to update subscription item');
  }
}

export async function updateStripeSubscriptionItemQuantityUseCase(teamId: string, quantity: number): Promise<void> {
  const team = await getTeamByIdUseCase(teamId);

  const subscription = await getStripeSubscriptionUseCase(team.stripeCustomerId);

  try {
    await updateStripeSubscriptionItem(subscription.items.data[0].id, {
      quantity
    });
  } catch (e) {
    throw new Error('Failed to update subscription item quantity');
  }
}

export async function createStripeBillingPortalSessionUseCase(stripeCustomerId: string): Promise<Stripe.BillingPortal.Session> {
  try {
    return await createStripeBillingPortalSession(stripeCustomerId);
  } catch (e) {
    throw new Error('Failed to create billing portal session');
  }
}

export async function createBillingPortalLinkUseCase(teamId: string): Promise<string> {
  const team = await getTeamByIdUseCase(teamId);

  const billingPortal = await createStripeBillingPortalSessionUseCase(team.stripeCustomerId);

  if (!billingPortal.url) {
    throw new Error('Failed to create billing portal link');
  }

  return billingPortal.url;
}