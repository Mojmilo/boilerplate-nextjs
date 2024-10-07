"use client";

import React from "react";
import {loginFormSchema, LoginFormType} from "@/app/auth/validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import {useServerAction} from "zsa-react";
import {signInAction} from "@/app/auth/actions";
import ErrorMessage from "@/components/error-message";

export default function LoginForm() {
  const { isPending, execute, error } = useServerAction(signInAction);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: LoginFormType) {
    await execute({
      email: values.email,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessage error={error} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="flex-1 grid gap-2">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <SubmitButton isPending={isPending} title="Login" />
      </form>
    </Form>
  )
}