'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {LoaderCircle} from "lucide-react";
import {GoogleLogo} from "@/components/icons";
import {useServerAction} from "zsa-react";
import {signInOAuthAction} from "@/app/auth/actions";
import {toast} from "sonner";

interface OAuthLoginButtonProps {
  provider: 'google' | 'github';
  disabled?: boolean;
}

export default function OAuthLoginButton({
  provider,
  disabled
}: OAuthLoginButtonProps) {
  const { isPending, execute } = useServerAction(signInOAuthAction, {
    onError: ({err}) => {
      toast.error('Uh ok', {
        description: err.message
      });
    }
  });

  return (
    <Button variant={"outline"} disabled={isPending || disabled} onClick={async () => {
      await execute({provider});
    }}>
      {isPending ? (
        <LoaderCircle className={'animate-spin w-5 h-5'} />
      ) : (
        <>
          {provider === 'github' && <GitHubLogoIcon className={'w-5 h-5'} />}
          {provider === 'google' && <GoogleLogo />}
        </>
      )}
      <span className={'ml-2'}>
        {provider === 'google' && 'Continue with Google'}
        {provider === 'github' && 'Continue with GitHub'}
      </span>
    </Button>
  );
}