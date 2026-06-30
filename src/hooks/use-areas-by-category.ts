import { filterByCategory } from "@/service/meal-db-service";
import type { Area } from "@/types/meal-db";

import { useApi } from "./use-api";

export const useAreasByCategory = (category: string) => {
  return useApi<Area[]>(
    () =>
      filterByCategory(category).then((res) =>
        Array.isArray(res.meals)
          ? res.meals
              .map((m) => m.strArea)
              .filter((area, index, array) => array.indexOf(area) === index)
              .filter((a) => a !== null)
              .map((a) => ({ strArea: a }))
          : [],
      ),
    [category],
  );
};
