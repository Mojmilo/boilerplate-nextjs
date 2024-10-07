'use client';

import {CheckIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import React from "react";
import {acceptInvitationAction} from "@/app/(dashboard)/account/actions";
import {useServerAction} from "zsa-react";
import {toast} from "sonner";
import {LoaderCircle} from "lucide-react";

export default function AcceptInvitationButton({teamId}: { teamId: string }) {
  const { isPending, execute } = useServerAction(acceptInvitationAction, {
    onSuccess: ({data}) => {
      toast.success('Success', {
        description: data.message,
        position: 'top-right',
      });
    },
    onError: ({err}) => {
      toast.error('Uh oh', {
        description: err.message,
      });
    }
  });

  return (
    <Button variant={'outline'} size={'icon'} disabled={isPending} onClick={async () => {
      await execute({teamId});
    }}>
      {isPending ? <LoaderCircle className="animate-spin w-5 h-5"/> : <CheckIcon className={'w-5 h-5'}/>}
    </Button>
  )
}