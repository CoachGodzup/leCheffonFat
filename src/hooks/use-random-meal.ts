import type { Meal } from "@/types/meal-db";
import { getRandomMealByFilter } from "@/service/meal-db-service";
import { useApi } from "./use-api";

export const useRandomMeal = (category: string, area: string) => {
  return useApi<Meal>(async () => {
    const meal = await getRandomMealByFilter(category, area);
    if (!meal) throw new Error("No meal found");
    return meal;
  }, [category, area]);
};
