'use client';

import { defineStepper } from "@stepperize/react";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form
} from "@/components/ui/form";
import React from "react";
import {NameSchema, nameSchema, SlugSchema, slugSchema} from "@/app/(dashboard)/new-team/validation";
import NameForm from "@/app/(dashboard)/new-team/_components/name-form";
import SlugForm from "@/app/(dashboard)/new-team/_components/slug-form";
import {useServerAction} from "zsa-react";
import {createTeamAction} from "@/app/(dashboard)/new-team/actions";
import {toast} from "sonner";
import SubmitButton from "@/components/submit-button";

const { useStepper } = defineStepper(
  { id: "name", label: "Name", schema: nameSchema },
  { id: "slug", label: "Slug", schema: slugSchema },
);

export default function NewTeamForm() {
  const stepper = useStepper();

  const { isPending, execute } = useServerAction(createTeamAction, {
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message
      });
    }
  });

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = async (values: Record<string, z.infer<typeof stepper.current.schema>>) => {
    if (stepper.isLast) {
      await execute({
        nameSchema: form.getValues() as NameSchema,
        slugSchema: form.getValues() as SlugSchema
      });
    } else {
      stepper.next();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex justify-between items-center w-full">
            <div className={'flex justify-center items-center gap-2'}>
              {stepper.all.map((step) => (
                <div
                  key={step.id}
                  className={`${stepper.current.id === step.id ? 'w-6 bg-primary' : 'w-2 bg-primary/10'} h-2 rounded-full duration-300 transition-all`}
                ></div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Step {stepper.all.indexOf(stepper.current) + 1} of {stepper.all.length}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            {stepper.switch({
              name: () => <NameForm/>,
              slug: () => <SlugForm/>,
            })}
            <div className="flex justify-end items-center gap-4 w-full">
              <Button variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
                Back
              </Button>
              <SubmitButton title={stepper.isLast ? "Complete" : "Next"} isPending={isPending}/>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}