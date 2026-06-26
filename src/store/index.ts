import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { FormSlice, createFormSlice } from "./slices/form-slice";
import { HistorySlice, createHistorySlice } from "./slices/history-slice";

export type AppStore = FormSlice & HistorySlice;

const persistStorage = {
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: unknown) => {
    try {
      localStorage.setItem(name, value as string);
    } catch {
      /* noop */
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      /* noop */
    }
  },
};

export const useStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createFormSlice(...a),
      ...createHistorySlice(...a),
    }),
    {
      name: "global-store",
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
