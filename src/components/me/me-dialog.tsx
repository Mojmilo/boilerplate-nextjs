'use client';

import React from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useDialogStore} from "@/stores/use-dialog-store";

export default function MeDialog() {
  const { open, children, closeDialog } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};