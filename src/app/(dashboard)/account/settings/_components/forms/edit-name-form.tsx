'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useServerAction} from "zsa-react";
import {updateUserNameAction} from "@/app/(dashboard)/account/settings/actions";
import {Input} from "@/components/ui/input";
import React, {useEffect} from "react";
import {nameFormSchema, NameFormType} from "@/app/(dashboard)/account/settings/validation";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import SubmitButton from "@/components/submit-button";
import ErrorMessage from "@/components/error-message";
import {useSaveStore} from "@/stores/use-save-store";

interface NameFormProps {
  name?: string;
}

export default function EditNameForm({
  name
}: NameFormProps) {
  const { isPending, execute, error } = useServerAction(updateUserNameAction, {
    onSuccess: ({data}) => {
      toast.success('Success', {
        description: data.message,
        position: 'top-right'
      });
      form.reset({
        name: form.getValues('name') || undefined,
      });
    }
  });

  const { openSave, closeSave } = useSaveStore();

  const form = useForm<NameFormType>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(values: NameFormType) {
    await execute(values);
  }

  useEffect(() => {
    form.formState.isDirty ? openSave({
      onAction: form.handleSubmit(onSubmit)
    }) : closeSave();
  }, [form.formState.isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
        <Card className="rounded-lg border-none">
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              Update your name
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ErrorMessage error={error}/>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className={'justify-between pt-6 border-t border-dashed'}>
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <InfoCircledIcon/>
              <span className={'text-sm'}>Your name will be visible to other users</span>
            </div>
            <SubmitButton isPending={isPending} disabled={!form.formState.isDirty} title={'Save'}/>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}