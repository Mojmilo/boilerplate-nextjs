'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Slider} from "@/components/ui/slider";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import Stripe from "stripe";
import {updateSubscriptionQuantityAction} from "@/app/(dashboard)/teams/[teamId]/settings/billing/actions";
import {useParams} from "next/navigation";
import {toast} from "sonner";
import {useServerAction} from "zsa-react";

const membershipCountSchema = z.object({
  count: z.number().int().min(1, { message: "Must be at least 1" }),
});
type MembershipCountFormType = z.infer<typeof membershipCountSchema>;

export default function MembershipCountForm({ subscription }: { subscription?: Stripe.Subscription }) {
  const {teamId} = useParams() as { teamId: string };
  const { isPending, execute } = useServerAction(updateSubscriptionQuantityAction, {
    onSuccess: ({data}) => {
      toast.success('Success', {
        description: data.message,
        position: 'top-right'
      });
      form.reset({
        count: form.getValues('count') || 1,
      });
    },
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message
      });
    }
  });

  const form = useForm<MembershipCountFormType>({
    resolver: zodResolver(membershipCountSchema),
    defaultValues: {
      count: subscription ? subscription.items.data[0].quantity : 1,
    },
  });

  async function onSubmit(values: MembershipCountFormType) {
    await execute({teamId, quantity: values.count});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
        <Card className={'rounded-lg border-none w-full'}>
          <CardHeader>
            <CardTitle>Membership Count</CardTitle>
            <CardDescription>
              Set the number of new members you expect to add to your team each month.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem className={'flex flex-col items-center justify-center gap-4'}>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={101}
                      step={5}
                      min={1}
                      className={'cursor-grab w-full'}
                    />
                  </FormControl>
                  <FormMessage/>
                  <span className={'text-sm'}>
                    {field.value}
                    {' '}
                    <span className={'text-muted-foreground'}>members</span></span>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className={'justify-between pt-6 border-t border-dashed'}>
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <InfoCircledIcon/>
              <span className={'text-sm'}>This will help us recommend the best plan for your team.</span>
            </div>
            <SubmitButton isPending={isPending} disabled={!form.formState.isDirty} title={'Save'}/>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}