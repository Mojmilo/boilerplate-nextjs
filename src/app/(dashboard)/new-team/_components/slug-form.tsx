'use client';

import {useFormContext} from "react-hook-form";
import {SlugSchema} from "@/app/(dashboard)/new-team/validation";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

export default function SlugForm() {
  const { control } = useFormContext<SlugSchema>();

  return (
    <div className={'w-full'}>
      <FormField
        control={control}
        name="slug"
        render={({field}) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input placeholder="my-team" {...field} />
            </FormControl>
            <FormDescription>
              Please enter your slug.
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  )
}