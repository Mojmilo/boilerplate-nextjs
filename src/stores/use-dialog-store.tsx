import {create} from "zustand";

interface DialogState {
  open: boolean;
  children: React.ReactNode | null;
}

interface DialogActions {
  openDialog: (data?: {
    children?: React.ReactNode;
  }) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState & DialogActions>(
  (set) => ({
    open: false,
    children: null,
    openDialog: (data) =>
      set((state) => ({
        open: true,
        children: data && data.children || <></>
      })),
    closeDialog: () =>
      set((state) => ({
        open: false,
      })),
  })
);

export const dialog = useDialogStore.getState().openDialog;