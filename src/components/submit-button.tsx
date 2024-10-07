'use client';

import {LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

interface SubmitButtonProps {
  isPending?: boolean;
  disabled?: boolean;
  title: string;
}

export default function SubmitButton({
  isPending,
  disabled,
  title
}: SubmitButtonProps) {
  return (
    <Button disabled={isPending || disabled}>
      {isPending && <LoaderCircle className="animate-spin w-5 h-5 mr-2"/>}
      <span>{title}</span>
    </Button>
  )
}