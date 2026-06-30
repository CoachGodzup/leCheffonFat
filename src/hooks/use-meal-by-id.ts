import { getMealById } from "@/service/meal-db-service";
import type { Meal } from "@/types/meal-db";

import { useApi } from "./use-api";

export const useMealById = (id: string) => {
  return useApi<Meal>(async () => {
    const res = await getMealById(id);
    if (typeof res.meals === "string") {
      throw new TypeError(`Invalid meal ID: ${res.meals}`);
    }
    const meal = res.meals?.[0] ?? null;
    if (!meal) {
      throw new TypeError("No meal found");
    }
    return meal;
  }, [id]);
};
