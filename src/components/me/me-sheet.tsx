'use client';

import React from "react";
import {useSheetStore} from "@/stores/use-sheet-store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

export default function MeSheet() {
  const { open, title, description, children, closeSheet } = useSheetStore();

  return (
    <Sheet open={open} onOpenChange={closeSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose>
            <Button variant={'outline'}>Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};