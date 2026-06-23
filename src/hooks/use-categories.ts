import type { Category } from "@/types/meal-db";
import { getCategories } from "@/service/meal-db-service";
import { useApi } from "./use-api";

export const useCategories = () => {
  return useApi<Category[]>(
    () => getCategories().then((res) => res.categories),
    [],
  );
};
