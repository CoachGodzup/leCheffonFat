import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createFormSlice, FormSlice } from "./slices/form-slice";
import { createHistorySlice, HistorySlice } from "./slices/history-slice";

export type AppStore = FormSlice & HistorySlice;

const persistStorage = {
  getItem: (name: string) => {
    const version = 1;
    const data = localStorage.getItem(name);
    if (!data) return null;
    try {
      const parsed = JSON.parse(data);
      if (parsed.version !== version) {
        console.warn(
          `Store version mismatch. Current: ${version}, Stored: ${parsed.version}`,
        );
      }
      return parsed;
    } catch (error) {
      console.error(`Failed to parse stored state:`, error);
      return null;
    }
  },
  setItem: (name: string, value: unknown) => {
    const state = typeof value === "string" ? JSON.parse(value) : value;
    localStorage.setItem(name, JSON.stringify({ ...state, version: 1 }));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
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
