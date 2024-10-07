'use server';

import {
  createStripeBillingPortalSession,
  createStripeCheckoutSession,
  createStripeCustomer,
  getStripeSubscription,
  updateStripeSubscriptionItem
} from "@/data-access/stripe";
import {getTeamByIdUseCase} from "@/use-cases/teams";

// * OK
export async function createStripeCustomerUseCase(email: string) {
  try {
    return await createStripeCustomer(email);
  } catch (e) {
    throw new Error('Failed to create Stripe customer');
  }
}

// * OK
export async function createStripeCheckoutSessionUseCase(stripeCustomerId: string, priceId: string) {
  try {
    return await createStripeCheckoutSession(stripeCustomerId, priceId);
  } catch (e) {
    throw new Error('Failed to create checkout session');
  }
}

// * OK
export async function createCheckoutLinkUseCase(teamId: string, priceId: string) {
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

// * OK
export async function getStripeSubscriptionUseCase(stripeCustomerId: string) {
  const subscription = await getStripeSubscription(stripeCustomerId);

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  return subscription;
}

// * OK
export async function updateStripeSubscriptionItemUseCase(teamId: string, priceId: string) {
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

// * OK
export async function updateStripeSubscriptionItemQuantityUseCase(teamId: string, quantity: number) {
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

// * OK
export async function createStripeBillingPortalSessionUseCase(stripeCustomerId: string) {
  try {
    return await createStripeBillingPortalSession(stripeCustomerId);
  } catch (e) {
    throw new Error('Failed to create billing portal session');
  }
}

// * OK
export async function createBillingPortalLinkUseCase(teamId: string) {
  const team = await getTeamByIdUseCase(teamId);

  const billingPortal = await createStripeBillingPortalSessionUseCase(team.stripeCustomerId);

  if (!billingPortal.url) {
    throw new Error('Failed to create billing portal link');
  }

  return billingPortal.url;
}