import type {
  AreaResponse,
  CategoryResponse,
  IngredientFilterResponse,
  MealSearchResponse,
} from "@/types/meal-db";

const API_BASE = "https://www.themealdb.com/api/json/v1";
const FULL_BASE = `${API_BASE}/${process.env.MEALDB_API_KEY ?? "1"}`;

async function request<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${FULL_BASE}/${endpoint}`);
  if (!res.ok) {
    throw new Error(
      `TheMealDB request failed: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
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
