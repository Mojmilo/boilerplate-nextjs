import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page({searchParams}: { searchParams: { error: string } }) {
  return (
    <div className="container min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/error.svg"
          alt="Image"
          width="1080"
          height="721"
          className="h-full max-w-xs w-40 object-cover dark:brightness-[0.7]"
        />

        <div className="text-center space-y-3 mb-6 mt-6">
          <h1 className="text-3xl font-bold">
            {searchParams.error === "Configuration" ? "Server error" :
                searchParams.error === "Verification" ? "Unable to sign in" :
                  "Error"}
          </h1>
          <p className="text-muted-foreground">
            {searchParams.error === "Configuration" ? "There is a problem with the server configuration." :
              searchParams.error === "Verification" ? "The sign in link is no longer valid." :
                "An error occurred."}
          </p>
          <p className="text-muted-foreground">
            {searchParams.error === "Configuration" ? "Check the server logs for more information." :
              searchParams.error === "Verification" ? "It may have been used already or it may have expired." :
                "Please try again later."}
          </p>
        </div>

        {searchParams.error === "Configuration" ? (
          <Link href={"/"}>
            <Button>Return to Homepage</Button>
          </Link>
        ) : searchParams.error === "Verification" ? (
          <Link href={"/auth/login"}>
            <Button>Sign in</Button>
          </Link>
        ) : (
          <Link href={"/"}>
            <Button>Return to Homepage</Button>
          </Link>
        )}
      </div>
    </div>
  );
}