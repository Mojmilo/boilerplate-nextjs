'use server';

import {authedProcedure} from "@/lib/safe-action";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import {
  createBillingPortalLinkUseCase,
  createCheckoutLinkUseCase,
  updateStripeSubscriptionItemQuantityUseCase,
  updateStripeSubscriptionItemUseCase
} from "@/use-cases/stripe";
import {redirect} from "next/navigation";

export const createCheckoutLinkAction = authedProcedure
  .createServerAction()
  .input(z.object({
    teamId: z.string(),
    priceId: z.string(),
  }))
  .handler(async ({input}) => {
    const url = await createCheckoutLinkUseCase(input.teamId, input.priceId);

    redirect(url);
  });

export const updateSubscriptionAction = authedProcedure
  .createServerAction()
  .input(z.object({
    teamId: z.string(),
    priceId: z.string(),
  }))
  .handler(async ({input}) => {
    await updateStripeSubscriptionItemUseCase(input.teamId, input.priceId);

    revalidatePath('/');

    return { message: 'Subscription updated successfully' };
  });

export const updateSubscriptionQuantityAction = authedProcedure
  .createServerAction()
  .input(z.object({
    teamId: z.string(),
    quantity: z.number().int().min(1),
  }))
  .handler(async ({input}) => {
    await updateStripeSubscriptionItemQuantityUseCase(input.teamId, input.quantity);

    revalidatePath('/');

    return { message: 'Subscription quantity updated successfully' };
  });

export const createBillingPortalLinkAction = authedProcedure
  .createServerAction()
  .input(z.object({
    teamId: z.string(),
  }))
  .handler(async ({input}) => {
    const url = await createBillingPortalLinkUseCase(input.teamId);

    redirect(url);
  });