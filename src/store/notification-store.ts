import { create } from "zustand";

import type { Toast, ToastType } from "@/types/notifications";

type NotificationState = {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
};

let toastCounter = 0;

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  addToast: (message, type = "error") => {
    const id = `toast-${++toastCounter}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
