import type { UserRequest } from "@/types/form";

export type FormSlice = UserRequest & {
  setPage1: (data: Pick<UserRequest, "category" | "area">) => void;
  setPage2: (data: Pick<UserRequest, "ingredients">) => void;
  resetForm: () => void;
};

export const createFormSlice = (
  set: (partial: Partial<FormSlice>) => void,
): FormSlice => ({
  category: "",
  area: "",
  ingredients: [],
  setPage1: (data) => set({ category: data.category, area: data.area }),
  setPage2: (data) => set({ ingredients: data.ingredients }),
  resetForm: () => set({ category: "", area: "", ingredients: [] }),
});
