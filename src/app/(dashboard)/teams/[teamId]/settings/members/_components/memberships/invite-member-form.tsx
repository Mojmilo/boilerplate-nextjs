'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useServerAction} from "zsa-react";
import {Input} from "@/components/ui/input";
import React from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import SubmitButton from "@/components/submit-button";
import ErrorMessage from "@/components/error-message";
import {inviteUserFormSchema, InviteUserFormType} from "@/app/(dashboard)/teams/[teamId]/settings/members/validation";
import {inviteUserAction} from "@/app/(dashboard)/teams/[teamId]/settings/members/actions";
import {useParams} from "next/navigation";

export default function InviteMemberForm() {
  const {teamId} = useParams() as { teamId?: string };
  const { isPending, execute, error } = useServerAction(inviteUserAction, {
    onSuccess: ({data}) => {
      toast.success('Success', {
        description: data.message,
        position: 'top-right'
      });
      form.reset();
    }
  });

  const form = useForm<InviteUserFormType>({
    resolver: zodResolver(inviteUserFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: InviteUserFormType) {
    await execute({
      teamId: teamId!,
      inviteUserFormSchema: values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
        <Card className="rounded-lg border-none">
          <CardHeader>
            <CardTitle>Invite Member</CardTitle>
            <CardDescription>
              Invite a new member to your team
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ErrorMessage error={error}/>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className={'justify-between pt-6 border-t border-dashed'}>
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <InfoCircledIcon/>
              <span className={'text-sm'}>The user will receive an email invitation to join the team</span>
            </div>
            <SubmitButton isPending={isPending} disabled={!form.formState.isDirty} title={'Invite'}/>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}