import { getMealById } from "@/service/meal-db-service";
import { InvalidMealId, type Meal } from "@/types/meal-db";

import { useApi } from "./use-api";

export const useMealById = (id: string) => {
  return useApi<Meal>(async () => {
    const res = await getMealById(id);
    const meal = res.meals?.[0] ?? null;
    if (typeof meal === 'string') {
      throw new Error(`New error found: ${res.meals}`);
    } else if (!meal) {
      throw new Error("No meal found")
    } else return meal;
  }, [id]);
};
