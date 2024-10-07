'use client';

import {Card, CardContent} from "@/components/ui/card";
import {useSaveStore} from "@/stores/use-save-store";
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {LoaderCircle} from "lucide-react";

export default function MeSave() {
  const {open, onAction, loading} = useSaveStore();

  useEffect(() => {
    if (open) {
      const down = (e: KeyboardEvent) => {
        if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          onAction()
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }
  }, [open, onAction]);

  return (
    <Card className={`fixed ${open ? 'bottom-10' : '-bottom-full lg:-bottom-14'} left-1/2 -translate-x-1/2 duration-300 transition-all`}>
      <CardContent className={'flex justify-center items-center gap-2 p-2'}>
        <span className={'text-sm'}>Changes have been made. Save now!</span>
        <Button onClick={onAction} disabled={loading}>
          {loading && <LoaderCircle className="animate-spin w-5 h-5 mr-2"/>}
          <span className={'mr-2'}>Save</span>
          <div className={'flex justify-center items-center w-5 h-5 rounded-md bg-muted text-muted-foreground mr-2'}>⌘</div>
          <div className={'flex justify-center items-center w-5 h-5 rounded-md bg-muted text-muted-foreground'}>S</div>
        </Button>
      </CardContent>
    </Card>
  )
}