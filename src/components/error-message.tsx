'use client';

import {CrossCircledIcon} from "@radix-ui/react-icons";
import React from "react";

interface ErrorMessageProps {
  error?: Error;
}

export default function ErrorMessage({
  error
}: ErrorMessageProps) {
  return error ? (
    <span className={'text-sm text-destructive'}>
      <CrossCircledIcon className={'inline-block mr-2'}/>
      {error.message}
    </span>
  ) : null;
}