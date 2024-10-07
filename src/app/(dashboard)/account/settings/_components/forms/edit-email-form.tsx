'use client';

import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useServerAction} from "zsa-react";
import {updateUserEmailAction} from "@/app/(dashboard)/account/settings/actions";
import {Input} from "@/components/ui/input";
import React from "react";
import {emailFormSchema, EmailFormType} from "@/app/(dashboard)/account/settings/validation";
import {toast} from "sonner";
import {
  Credenza, CredenzaBody, CredenzaClose,
  CredenzaContent,
  CredenzaDescription, CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger
} from "@/components/ui/credenza";
import SubmitButton from "@/components/submit-button";
import ErrorMessage from "@/components/error-message";

export default function EditEmailForm() {
  const [open, setOpen] = React.useState(false);

  const { isPending, execute, error } = useServerAction(updateUserEmailAction, {
    onSuccess: ({data}) => {
      toast.success('Success', {
        description: data.message,
        position: 'top-right'
      });
      form.reset();
      setOpen(false);
    }
  });

  const form = useForm<EmailFormType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      emailConfirmation: '',
    },
  });

  async function onSubmit(values: EmailFormType) {
    await execute(values);
  }

  return (
    <Form {...form}>
      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaTrigger asChild>
            <Button type="button" variant={'link'}>Update email</Button>
        </CredenzaTrigger>
        <CredenzaContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'grid gap-4'}>
            <CredenzaHeader>
              <CredenzaTitle>Email</CredenzaTitle>
              <CredenzaDescription>
                Update your email address
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              <div className="grid gap-4">
                <ErrorMessage error={error}/>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email confirmation</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="button" variant={'outline'}>Cancel</Button>
              </CredenzaClose>
              <SubmitButton isPending={isPending} disabled={!form.formState.isDirty} title={'Save'}/>
            </CredenzaFooter>
          </form>
        </CredenzaContent>
      </Credenza>
    </Form>
  )
}