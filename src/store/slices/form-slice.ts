import type { UserRequest } from "@/types/form";

export type FormSlice = UserRequest & {
  setPage1: (data: Pick<UserRequest, "category">) => void;
  setPage2: (data: Pick<UserRequest, "area">) => void;
  resetForm: () => void;
};

export const createFormSlice = (
  set: (
    partial: Partial<FormSlice> | ((current: FormSlice) => Partial<FormSlice>),
  ) => void,
  _get: () => FormSlice,
  _api: unknown,
): FormSlice => ({
  category: "",
  area: "",
  setPage1: (data) => set({ category: data.category }),
  setPage2: (data) => set({ area: data.area }),
  resetForm: () => set({ category: "", area: "" }),
});
