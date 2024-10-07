import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/app/auth/login/login-form";
import OAuthLoginButton from "@/app/auth/o-auth-login-button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function LoginPage({searchParams}: { searchParams: { error: string } }) {
  return (
    <div className="flex items-center justify-center py-12 col-span-5 min-h-screen">
      <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
        <div className="grid gap-2 text-center">
          <h1 className="text-5xl font-bold text-left">Welcome Back! 👋</h1>
          <p className="text-balance text-left text-muted-foreground">
            Enter Your Credentials to Proceed
          </p>
        </div>
        <OAuthLoginButton provider={'google'} disabled/>
        <OAuthLoginButton provider={'github'}/>
        {searchParams.error === 'OAuthAccountNotLinked' && (
          <Alert variant={'destructive'}>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Your GitHub account is not linked to any account. Please sign up first.
            </AlertDescription>
          </Alert>
        )}
        <Separator/>
        <LoginForm/>
        <div className="text-center text-sm">
          Already have an account?&nbsp;
          <Link
            href="/auth/signup"
            className="hover:text-muted-foreground hover:underline duration-300 transition-all"
          >
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
}