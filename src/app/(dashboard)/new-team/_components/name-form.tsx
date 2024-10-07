'use client';

import {useFormContext} from "react-hook-form";
import {NameSchema} from "@/app/(dashboard)/new-team/validation";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

export default function NameForm() {
  const { control } = useFormContext<NameSchema>();

  return (
    <div className={'w-full'}>
      <FormField
        control={control}
        name="name"
        render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="My team" {...field} />
            </FormControl>
            <FormDescription>
              Please enter your name.
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  )
}