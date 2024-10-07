import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SignupForm from "@/app/auth/signup/signup-form";
import OAuthLoginButton from "@/app/auth/o-auth-login-button";
import React from "react";

export default function SingUpPage() {
  return (
    <div className="flex items-center justify-center py-12 col-span-5 min-h-screen">
      <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
        <div className="grid gap-2 text-center">
          <h1 className="text-4xl font-bold text-left">
            🌟 Ready to Be Awesome?
          </h1>
          <p className="text-balance text-muted-foreground text-left">
            Create Your Account and Dive In 🌟
          </p>
        </div>
        <OAuthLoginButton provider={'google'} disabled/>
        <OAuthLoginButton provider={'github'}/>
        <Separator/>

        <SignupForm/>

        <div className="text-center text-sm space-y-2">
          Already have an account?&nbsp;
          <Link
            href="/auth/login"
            className="hover:text-muted-foreground hover:underline duration-300 transition-all"
          >
            Login here!
          </Link>
          <p>
            By Signing up, you agree to our&nbsp;
            <Link
              href={"/public/terms-of-use"}
              className="underline duration-300 transition-all hover:text-muted-foreground"
            >
              Terms of Use
            </Link>
            &nbsp;and&nbsp;
            <Link
              href={"/public/privacy-policy"}
              className="underline duration-300 transition-all hover:text-muted-foreground"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}