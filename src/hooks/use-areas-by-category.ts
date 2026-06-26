import { filterByCategory } from "@/service/meal-db-service";
import type { Area } from "@/types/meal-db";

import { useApi } from "./use-api";

export const useAreasByCategory = (category: string) => {
  return useApi<Area[]>(
    () =>
      filterByCategory(category).then((res) =>
        res.meals
          ? res.meals
              .map((m) => m.strArea)
              // avoid duplicates
              .filter((area, index, array) => array.indexOf(area) === index)
              .filter((a) => a !== null)
              .map((a) => ({ strArea: a }))
          : [],
      ),
    [category],
  );
};
