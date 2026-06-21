import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createFormSlice, FormSlice } from "./slices/form-slice";

export type AppStore = FormSlice;

export const useStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createFormSlice(a[0]),
    }),
    { name: "global-store" },
  ),
);
