'use client';

import Link from "next/link";
import {Rocket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/mode-toggle";
import {useMediaQuery} from "@/hooks/use-media-query";
import * as React from "react";
import {HeaderNavigation} from "@/app/(onboarding)/_components/header-navigation";

const desktop = "(min-width: 768px)";

export default function Header() {
  const isDesktop = useMediaQuery(desktop);

  return (
    <header
      id={'header'}
      className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
      <div className="relative container h-14 flex justify-between items-center">
        <HeaderLogo isDesktop={isDesktop}/>
        <nav className="flex items-center gap-2">
          {!isDesktop && <ModeToggle/>}
          <HeaderNavigation isDesktop={isDesktop}/>
        </nav>
        {isDesktop && (
          <nav className="flex items-center gap-2">
            <ModeToggle/>
            <Link href="/auth/login">
              <Button>Get started</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

function HeaderLogo({isDesktop}: { isDesktop: boolean }) {
  return (
    <Link
      href="/public"
      className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
    >
      <Rocket className="w-6 h-6 mr-3"/>
      {isDesktop && (
        <>
          <span className="font-bold text-lg">QuickSaaSBoilerplate</span>
          <span className="sr-only">QuickSaaSBoilerplate</span>
        </>
      )}
    </Link>
  )
}