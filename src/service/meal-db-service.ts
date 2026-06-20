import type {
  AreaResponse,
  CategoryResponse,
  IngredientFilterResponse,
  MealSearchResponse,
} from "@/types/meal-db";

const BASE_URL = "/api/meals";

async function request<T>(endpoint: string): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      if (!res.ok) {
        throw new Error(
          `TheMealDB request failed: ${res.status} ${res.statusText}`,
        );
      }
      resolve(res.json());
    } catch (e) {
      reject(e);
    }
  });
}

export function searchMealsByName(query: string) {
  return request<MealSearchResponse>(
    `search.php?s=${encodeURIComponent(query)}`,
  );
}

export function getMealById(id: string) {
  return request<MealSearchResponse>(`lookup.php?i=${id}`);
}

export function getRandomMeal() {
  return request<MealSearchResponse>("random.php");
}

export function getCategories() {
  return request<CategoryResponse>("categories.php");
}

export function filterByCategory(category: string) {
  return request<MealSearchResponse>(
    `filter.php?c=${encodeURIComponent(category)}`,
  );
}

export function filterByArea(area: string) {
  return request<MealSearchResponse>(
    `filter.php?a=${encodeURIComponent(area)}`,
  );
}

export function filterByIngredient(ingredient: string) {
  return request<IngredientFilterResponse>(
    `filter.php?i=${encodeURIComponent(ingredient)}`,
  );
}

export function listAreas() {
  return request<AreaResponse>("list.php?a=list");
}
