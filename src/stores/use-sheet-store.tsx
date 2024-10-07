import {create} from "zustand";

interface SheetState {
  open: boolean;
  title: string | null;
  description: string | null;
  children: React.ReactNode | null;
}

interface SheetActions {
  openSheet: (data?: {
    title?: string;
    description?: string;
    children?: React.ReactNode;
  }) => void;
  closeSheet: () => void;
}

export const useSheetStore = create<SheetState & SheetActions>(
  (set) => ({
    open: false,
    title: null,
    description: null,
    children: null,
    openSheet: (data) =>
      set((state) => ({
        open: true,
        title: data && data.title || 'Titre',
        description: data && data.description || 'Description.',
        children: data && data.children || <></>
      })),
    closeSheet: () =>
      set((state) => ({
        open: false,
      })),
  })
);

export const sheet = useSheetStore.getState().openSheet;