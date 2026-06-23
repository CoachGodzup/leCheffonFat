import type { Area } from "@/types/meal-db";
import { listAreas } from "@/service/meal-db-service";
import { useApi } from "./use-api";

export const useAreas = () => {
  return useApi<Area[]>(() => listAreas().then((res) => res.meals ?? []), []);
};
