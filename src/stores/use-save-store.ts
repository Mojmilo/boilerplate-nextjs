import {create} from "zustand";

interface SaveState {
  open: boolean;
  action: () => Promise<void>;
  onAction: () => void;
  loading: boolean;
}

interface SaveActions {
  openSave: (data?: {
    onAction?: () => Promise<void>;
  }) => void;
  closeSave: () => void;
}

export const useSaveStore = create<SaveState & SaveActions>(
  (set, get) => ({
    open: false,
    action: async () => {},
    onAction: () => {
      set({loading: true});
      get().action().then(() => {
        set({open: false});
      }).catch(() => {}).finally(() => {
        set({loading: false});
      })
    },
    loading: false,
    openSave: (data) =>
      set((state) => ({
        open: true,
        action: data?.onAction ?? (async () => {}),
      })),
    closeSave: () =>
      set((state) => ({
        open: false,
      })),
  })
);

export const save = useSaveStore.getState().openSave;