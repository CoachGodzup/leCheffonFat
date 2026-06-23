import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createFormSlice, FormSlice } from "./slices/form-slice";
import { createHistorySlice, HistorySlice } from "./slices/history-slice";

export type AppStore = FormSlice & HistorySlice;

export const useStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createFormSlice(a[0]),
      ...createHistorySlice(...a),
    }),
    { name: "global-store" },
  ),
);
