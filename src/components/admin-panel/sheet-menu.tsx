import Link from "next/link";
import {MenuIcon, PanelsTopLeft, Rocket} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import TeamSwitch from "@/components/admin-panel/team-switch";
import {MembershipWithTeamInfo} from "@/data-access/membership";

export function SheetMenu({memberships}: {memberships: MembershipWithTeamInfo[]}) {
  return (
    <Sheet modal={false}>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <div className="px-2">
            <TeamSwitch memberships={memberships}/>
          </div>
        </SheetHeader>
        <Menu isOpen/>
      </SheetContent>
    </Sheet>
  );
}
