import { create } from "zustand";

const DEFAULT_TITLE = "Are you absolutely sure?";
const DEFAULT_DESCRIPTION = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.";
const DEFAULT_CANCEL_LABEL = "Cancel";
const DEFAULT_ACTION_LABEL = "Continue";

interface ConfirmationState {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  actionLabel: string;
  action: () => Promise<void> | void;
  onAction: () => void;
  onCancel: () => void;
  loading: boolean;
}

interface ConfirmationActions {
  openConfirmation: (data?: {
    title?: string;
    description?: string;
    cancelLabel?: string;
    actionLabel?: string;
    onAction?: () => Promise<void> | void;
    onCancel?: () => void;
  }) => void;
  closeConfirmation: () => void;
}

export const useConfirmationStore = create<ConfirmationState & ConfirmationActions>(
  (set, get) => ({
    open: false,
    title: '',
    description: '',
    cancelLabel: '',
    actionLabel: '',
    action: () => {},
    onAction: () => {
      const result = get().action();

      if (result instanceof Promise) {
        set({ loading: true });
        result.then(() => {
          set({ open: false });
        }).catch(() => {
        }).finally(() => {
          set({ loading: false });
        });
      } else {
        set({ open: false });
      }
    },
    onCancel: () => {},
    loading: false,
    openConfirmation: (data) => {
      set((state) => ({
        open: true,
        title: data?.title ?? DEFAULT_TITLE,
        description: data?.description ?? DEFAULT_DESCRIPTION,
        cancelLabel: data?.cancelLabel ?? DEFAULT_CANCEL_LABEL,
        actionLabel: data?.actionLabel ?? DEFAULT_ACTION_LABEL,
        action: data?.onAction ?? (async () => {}),
        onCancel: data?.onCancel ?? (() => {}),
        loading: false,
      }));
    },
    closeConfirmation: () =>
      set((state) => ({
        open: false,
      })),
  })
);

export const confirmation = useConfirmationStore.getState().openConfirmation;